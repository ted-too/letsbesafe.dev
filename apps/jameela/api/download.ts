import type { APIContext } from "astro";
import cp from "child_process";
import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import { PassThrough } from "stream";
import invariant from "tiny-invariant";
import ytdl from "ytdl-core";

export async function get({ url }: APIContext) {
  const id = url.searchParams.get("id")?.toString();
  const title = url.searchParams.get("title")?.toString();
  const platform = url.searchParams.get("platform")?.toString();
  const format = url.searchParams.get("format")?.toString();
  const quality = url.searchParams.get("format")?.toString();
  const itag = url.searchParams.get("itag")?.toString();
  const size = url.searchParams.get("size")?.toString();
  const audioItag = url.searchParams.get("audioItag")?.toString();
  try {
    invariant(id, "id required");
    invariant(title, "platform required");
    invariant(platform, "platform required");
    invariant(format, "format required");
    invariant(itag, "itag required");
    if (format === "audio") invariant(quality, "quality required");
    if (format === "video") invariant(audioItag, "audioItag required");
  } catch (error: any) {
    return new Response(JSON.stringify({ status: 400, message: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const headers = {
    "Content-Disposition": `attachment; filename=${decodeURIComponent(title)}.${format === "audio" ? "mp3" : "mp4"}`,
    // "Content-Length": size!,
    "Content-type": format === "audio" ? "audio/mpeg" : "video/mp4",
  };

  if (format === "audio") {
    const output = new PassThrough();
    const stream = ytdl(id, { quality: itag });
    // const transcoder = cp.spawn(
    //   ffmpegPath!,
    //   [
    //     // Remove ffmpeg's console spamming
    //     "-loglevel",
    //     "0",
    //     "-hide_banner",
    //     // Set input
    //     "-i",
    //     "pipe:3",
    //     // Set codec
    //     "-acodec",
    //     "libmp3lame",
    //     // Set audioBitrate
    //     "-b:a",
    //     `${quality}k`,
    //     // Define output container
    //     "-f",
    //     "mp3",
    //     "pipe:4",
    //   ],
    //   {
    //     stdio: [
    //       /* Standard: stdin, stdout, stderr */
    //       "inherit",
    //       "inherit",
    //       "inherit",
    //       /* Custom: pipe:3, pipe:4, pipe:5 */
    //       "pipe",
    //       "pipe",
    //     ],
    //   }
    // );
    // stream.pipe((transcoder as any).stdio[3]);
    // (transcoder as any).stdio[4].pipe(output, { end: true }).on("error", (error: any) => {
    //   console.log(error);
    // });
    ffmpeg(stream)
      .audioBitrate(parseInt(quality || "48"))
      .pipe(output);
    return new Response(output as any, { headers });
  }

  // return new Response(JSON.stringify(info), {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
}
