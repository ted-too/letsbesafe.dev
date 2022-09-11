import {
  ActionFunction,
  json,
  LoaderFunction,
  Response,
} from "@remix-run/node";
import invariant from "tiny-invariant";
import ytdl from "ytdl-core";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import { VideoFormat } from "~/utils/download.server";
import { availableFormats } from "../video";
import { PassThrough } from "stream";
import cp from "child_process";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath);

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const { audio, video } = availableFormats;
  const { title, id, type, format, quality } = Object.fromEntries(
    url.searchParams
  );
  invariant(title, "Expected Title");
  invariant(id, "Expected Id");
  invariant(type, "Expected Type");
  invariant(format, "Expected Format");
  invariant(quality, "Expected Quality");
  if (type !== "audio" && type !== "video")
    throw new Error("Type must be video or audio");
  if (
    [...audio, ...video].filter(({ format: aformat }) => aformat == format)
      .length == 0
  )
    throw new Error("Invalid format");
  if (
    [...audio, ...video].filter(
      ({ quality: aquality }) => aquality.replace("p", "") == quality
    ).length == 0
  )
    throw new Error("Invalid quality");

  if (type == "audio") {
    const stream = ytdl(id, { quality: "highestaudio" });
    const passThrough = new PassThrough();
    ffmpeg(stream)
      .format(format)
      .audioBitrate(parseInt(quality))
      .pipe(passThrough, { end: true });
    return new Response(passThrough, {
      headers: {
        "Content-Disposition": `attachment; filename=${decodeURIComponent(
          title
        )}.${format}`,
      },
    });
  }
  if (type == "video") {
    if (format == "mp4" && quality == "360")
      return new Response(ytdl(id), {
        headers: {
          "Content-Disposition": `attachment; filename=${decodeURIComponent(
            title
          )}.${format}`,
        },
      });
    const vidInfo = await ytdl.getInfo(id);
    const vidFormat = ytdl
      .filterFormats(vidInfo.formats, "videoonly")
      .filter(
        (format) =>
          format.container == "webm" && format.qualityLabel.includes(quality)
      )[0];
    const vidStream = ytdl(id, { quality: vidFormat.itag });
    const audioStream = ytdl(id, { quality: "highestaudio" });
    const ffmpegProcess = cp.spawn(
      ffmpegPath,
      [
        // Remove ffmpeg's console spamming
        "-loglevel",
        "0",
        "-hide_banner",
        // Set inputs
        "-i",
        "pipe:3",
        "-i",
        "pipe:4",
        // Map audio & video from streams
        "-map",
        "0:a",
        "-map",
        "1:v",
        // Keep encoding
        '-c:v', 'copy',
        // Define output container
        "-f",
        "matroska",
        "pipe:5",
      ],
      {
        windowsHide: true,
        stdio: [
          /* Standard: stdin, stdout, stderr */
          "inherit",
          "inherit",
          "inherit",
          /* Custom: pipe:3, pipe:4, pipe:5 */
          "pipe",
          "pipe",
          "pipe",
        ],
      }
    );
    const output = new PassThrough();
    audioStream.pipe(ffmpegProcess.stdio[3] as any);
    vidStream.pipe(ffmpegProcess.stdio[4] as any);
    (ffmpegProcess as any).stdio[5].pipe(output, { end: true });

    return new Response(output, {
      headers: {
        "Content-Disposition": `attachment; filename=${decodeURIComponent(
          title
        )}.${format}`,
      },
    });
  }
  return json({ id, type, format, quality });
};
