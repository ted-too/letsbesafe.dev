import moment from "moment";
import ytsr from "ytsr";
import ytdl from "ytdl-core";
import { db, JsonObject } from "~/db.server";

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Result = {
  id: string;
  title: string;
  thumbnail: Thumbnail;
  thumbnails: Thumbnail[];
};

export type DetailedResult = {
  duration: number;
} & Result;

export async function getVideos(query: string): Promise<Result[]> {
  const isInDb = await db.yTGetVideos.findFirst({ where: { query } });
  if (isInDb) return isInDb.items as Result[];
  const filter = (await ytsr.getFilters(query)).get("Type")?.get("Video");
  const apiResult = (
    await ytsr(filter?.url || query, { limit: 12 }).catch(() => {
      throw new Error("Youtube fetch failed.");
    })
  ).items;
  const dbResult = await db.yTGetVideos.create({
    data: {
      query: query,
      items: apiResult
        .filter(({ type }) => type == "video")
        .map((item) =>
          item.type == "video"
            ? {
                id: item.id,
                title: item.title,
                thumbnail: item.bestThumbnail,
                thumbnails: item.thumbnails,
              }
            : undefined
        ) as any,
    },
  });
  return dbResult.items as any;
}

export async function getVideoById(queryId: string): Promise<DetailedResult | undefined> {
  if (!ytdl.validateID(queryId)) throw new Error("Invalid video id");
  const isInDb = await db.yTGetById.findFirst({ where: { id: queryId } });
  if (isInDb)
    return {
      ...isInDb,
      thumbnail: isInDb.thumbnail as JsonObject as any,
      thumbnails: isInDb.thumbnails as JsonObject as any,
    };
  const apiResult = (
    await ytsr(queryId, { limit: 1 }).catch(() => {
      throw new Error("Youtube fetch failed.");
    })
  ).items[0];
  if (apiResult.type !== "video") throw new Error("Result is not a convertible video");
  let duration = apiResult.duration || "00:00:00";
  if (duration.split(":").length < 3)
    duration = [["00", "00"].slice(0, 3 - duration.split(":").length), ...duration.split(":")].join(":");
  const { createdAt, ...dbResult } = await db.yTGetById.create({
    data: {
      id: queryId,
      title: apiResult.title,
      duration: moment.duration(duration).asSeconds(),
      thumbnail: apiResult.bestThumbnail as any,
      thumbnails: apiResult.thumbnails as any,
    },
  });
  return {
    ...dbResult,
    thumbnail: dbResult.thumbnail as JsonObject as any,
    thumbnails: dbResult.thumbnails as JsonObject as any,
  };
}
