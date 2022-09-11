import fs from "fs";
import ytdl from "ytdl-core";

export type VideoFormat = ytdl.videoFormat;
export type VideoFormats = ytdl.videoFormat[];

export async function getYTVideoFormats(id: string): Promise<VideoFormats> {
  if (!ytdl.validateID(id)) throw Error("Invalid video id");
  const url = `http://www.youtube.com/watch?v=${id}`;
  return (await ytdl.getInfo(url)).formats;
}

export async function downloadYTVideo(id: string) {
  if (!ytdl.validateID(id)) throw Error("Invalid video id");
  const url = `http://www.youtube.com/watch?v=${id}`;
  return ytdl;
}
