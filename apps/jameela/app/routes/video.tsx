import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import FormatSelector from "~/components/format-selector";
import YTImage from "~/components/image";
import SearchForm, { ErrorBoundary } from "~/components/search-form";
import { DetailedResult, getVideoById } from "~/utils/search.server";

export type AudioFormat = {
  format: "mp3";
  quality: "128" | "96" | "72" | "64";
  size?: number;
};
export type VideoFormat = {
  format: "mp4";
  quality: "360p" | "720p";
  size?: number;
};

export const availableFormats: { audio: AudioFormat[]; video: VideoFormat[] } = {
  audio: [
    { format: "mp3", quality: "128" },
    { format: "mp3", quality: "96" },
    { format: "mp3", quality: "72" },
    { format: "mp3", quality: "64" },
  ],
  video: [
    { format: "mp4", quality: "360p" },
    { format: "mp4", quality: "720p" },
  ],
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  invariant(id, "Expected id string");
  const video = await getVideoById(id);

  return json(video);
};

export default function VideoPage() {
  const [format, setFormat] = useState<VideoFormat | AudioFormat | null>(null);
  const [downloaded, setDownloaded] = useState<(VideoFormat | AudioFormat)[]>([]);
  const result = useLoaderData<DetailedResult | null>();
  useEffect(() => {
    if (!format || !result) return;
    setDownloaded([...downloaded, format]);
    window.open(
      `/action/download?title=${encodeURIComponent(result.title)}&id=${result.id}&type=${
        format.format == "mp3" ? "audio" : "video"
      }&format=${format.format}&quality=${format.quality.replace("p", "")}`,
      "_blank"
    );
  }, [format]);
  return (
    <>
      <SearchForm />
      {!result ? (
        <span className="mx-auto text-xl font-semibold">404: Video not found</span>
      ) : (
        <div className="flex flex-col items-center w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-4xl mx-auto mb-16 space-y-8 lg:space-y-0 lg:items-start lg:justify-between lg:flex-row">
          <div className="flex flex-col w-full space-y-4 rounded-md lg:w-80">
            <YTImage src={result.thumbnail.url || "/no-image.png"} />
            <span className="text-lg font-semibold text-normal line-clamp-3">{result.title}</span>
          </div>
          <div className="w-full sm:max-w-[26rem]">
            <FormatSelector duration={result.duration} selected={format} setSelected={setFormat} />
          </div>
        </div>
      )}
    </>
  );
}

export { ErrorBoundary };
