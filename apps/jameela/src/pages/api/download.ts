import type { APIContext } from "astro";
import invariant from "tiny-invariant";
import ytdl from "ytdl-core";

export async function get({ url }: APIContext) {
  const id = url.searchParams.get("id")?.toString();
  const title = url.searchParams.get("title")?.toString();
  const container = url.searchParams.get("container")?.toString();
  const platform = url.searchParams.get("platform")?.toString();
  const format = url.searchParams.get("format")?.toString();
  const quality = url.searchParams.get("quality")?.toString();
  const itag = url.searchParams.get("itag")?.toString();
  const audioItag = url.searchParams.get("audioItag")?.toString();
  const size = url.searchParams.get("size")?.toString();
  try {
    invariant(id, "id required");
    invariant(title, "platform required");
    invariant(container, "container required");
    invariant(size, "size required");
    invariant(itag, "itag required");
    invariant(platform, "platform required");
    invariant(format, "format required");
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
    "Content-Disposition": `attachment; filename=${decodeURIComponent(title)}.${container}`,
    "Content-Length": size!,
    // "Content-type": format === "audio" ? "audio/mpeg" : "video/mp4",
  };
  // FIXME: Proper transcoding implementation required
  return new Response(ytdl(id, { quality: itag }) as any, {
    status: 200,
    headers,
  });
}
