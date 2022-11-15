import type { Formats } from "../../types";
import type { APIContext } from "astro";
import { format } from "path";
import invariant from "tiny-invariant";
import ytdl from "ytdl-core";

export async function get({ url }: APIContext) {
  const id = url.searchParams.get("id");
  const platform = url.searchParams.get("platform");

  try {
    invariant(id);
    invariant(platform);
  } catch {
    return new Response(JSON.stringify({ status: 400, message: "id and platform required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const info = await ytdl.getInfo(`http://www.youtube.com/watch?v=${id}`);
  const audioFormats = ytdl
    .filterFormats(info.formats, "audioonly")
    .filter(({ audioBitrate }) => audioBitrate && audioBitrate <= 128);
  const videoFormats = ytdl
    .filterFormats(info.formats, "videoonly")
    .filter(({ height }) => height && height <= 1080 && height !== 360 && height !== 240);
  const usefulFormats = {
    audio: audioFormats.map(({ itag, audioBitrate, container, approxDurationMs, contentLength }) => ({
      itag,
      bitrate: audioBitrate!,
      duration: parseInt(approxDurationMs || "0") / 1000,
      container,
      size: Math.round(parseInt(contentLength)),
    })),
    video: videoFormats.map(({ itag, height, container, hasAudio, approxDurationMs, contentLength }) => ({
      itag,
      quality: height!,
      duration: parseInt(approxDurationMs || "0") / 1000,
      container,
      noAudio: !hasAudio,
      size: Math.round(parseInt(contentLength)),
    })),
  };
  const uniqueFormats = {
    audio: Array.from(new Set(usefulFormats.audio.map((a) => a.bitrate))).map((bitrate) => {
      return usefulFormats.audio.find((a) => a.bitrate === bitrate)!;
    }),
    video: Array.from(new Set(usefulFormats.video.map((a) => a.quality))).map((quality) => {
      return usefulFormats.video.find((a) => a.quality === quality)!;
    }),
  };

  const formats: Formats = {
    audio: uniqueFormats.audio,
    video: uniqueFormats.video.map(({ size, ...rest }) => ({
      ...rest,
      audioItag: uniqueFormats.audio.at(rest.quality <= 480 ? -1 : 0)?.itag!,
      size: size + uniqueFormats.audio.at(rest.quality <= 480 ? -1 : 0)?.size!,
    })),
  };

  return new Response(JSON.stringify(formats), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
