import { handler as ssrHandler } from "./dist/server/entry.mjs";
import middiePlugin from "@fastify/middie";
import staticPlugin from "@fastify/static";
import Fastify from "fastify";
import path from "path";
import process from "process";
import * as url from "url";
import ytdl from "ytdl-core";

("use strict");

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const fastify = Fastify();

fastify.register(staticPlugin, {
  root: path.join(__dirname, "dist/client"),
});
await fastify.register(middiePlugin);
fastify.use(ssrHandler);

fastify.get(
  "/api/formats",
  {
    schema: {
      querystring: {
        type: "object",
        required: ["id", "platform"],
      },
    },
  },
  async (req, reply) => {
    const { id, platform } = req.query;
    if (platform !== "yt") return reply.send({ status: 400, message: "only platform: yt allowed" });
    const info = await ytdl.getInfo(`http://www.youtube.com/watch?v=${id}`);
    const audioFormats = ytdl
      .filterFormats(info.formats, "audioonly")
      .filter(({ audioBitrate }) => audioBitrate <= 128);
    const videoFormats = ytdl
      .filterFormats(info.formats, "video")
      .filter(({ height }) => [1080, 720, 360, 144].includes(height));
    const usefulFormats = {
      audio: audioFormats.map(({ itag, audioBitrate, container, approxDurationMs, contentLength }) => ({
        itag,
        bitrate: audioBitrate,
        duration: parseInt(approxDurationMs || "0") / 1000,
        container,
        size: Math.round(parseInt(contentLength)),
      })),
      video: videoFormats.map(({ itag, height, audioBitrate, container, approxDurationMs, contentLength }) => ({
        itag,
        quality: height,
        duration: parseInt(approxDurationMs || "0") / 1000,
        container,
        noAudio: audioBitrate == null,
        size: Math.round(parseInt(contentLength)),
      })),
    };
    const uniqueFormats = {
      audio: Array.from(new Set(usefulFormats.audio.map((a) => a.bitrate))).map((bitrate) => {
        return usefulFormats.audio.find((a) => a.bitrate === bitrate);
      }),
      video: Array.from(new Set(usefulFormats.video.map((a) => a.quality)))
        .map((quality) => {
          return usefulFormats.video.find((a) => a.quality === quality);
        })
        .sort((a, b) => b.quality - a.quality),
    };

    const formats = {
      audio: uniqueFormats.audio,
      video: uniqueFormats.video.map(({ size, ...rest }) => ({
        ...rest,
        audioItag: uniqueFormats.audio.at(rest.quality <= 480 ? -1 : 0)?.itag,
        size: size + uniqueFormats.audio.at(rest.quality <= 480 ? -1 : 0)?.size,
      })),
    };

    reply.send(formats);
  }
);

const deConsole = ["-loglevel", "0", "-hide_banner"]; // Remove ffmpeg's console spamming

fastify.get(
  "/api/download",
  {
    schema: {
      querystring: {
        type: "object",
        required: ["id", "title", "platform", "format", "quality", "itag", "size"],
      },
    },
  },
  async (req, reply) => {
    const { id, title, platform, format, quality, itag, audioItag, size, thumbnail } = req.query;
    if (platform !== "yt") return reply.send({ status: 400, message: "only platform: yt allowed" });
    if (format === "video" && !audioItag) return reply.send({ status: 400, message: "audioItag required" });
    const headers = {
      "Content-Disposition": `attachment; filename=${decodeURIComponent(title)}.${format === "audio" ? "mp3" : "mp4"}`,
      "Content-Length": size,
      "Content-type": format === "audio" ? "audio/mpeg" : "video/mp4",
    };
    // FIXME: Proper transcoding implementation required
    return reply.headers(headers).send(ytdl(id, { quality: itag }));
    reply.send("you should not be seeing this");
  }
);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    console.log(err);
    process.exit(1);
  }
  console.log(`🚀 Listening on ${address}`);
});
