import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useNavigate, useSubmit, useTransition } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import ytdl from "ytdl-core";
import FormatSelector from "~/components/format-selector";
import YTImage from "~/components/image";
import { RadioInput } from "~/components/misc";
import SearchForm, { ErrorBoundary } from "~/components/search-form";
import { DetailedResult, Result, getVideoById } from "~/utils/search.server";

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
        <span className="font-semibold text-xl mx-auto">404: Video not found</span>
      ) : (
        <div className="flex justify-between w-full max-w-4xl mx-auto mb-16">
          <div className="flex flex-col space-y-4 w-80 rounded-md">
            <YTImage src={result.thumbnail.url || "/no-image.png"} />
            <span className="text-lg text-normal font-semibold line-clamp-3">{result.title}</span>
          </div>
          <FormatSelector duration={result.duration} selected={format} setSelected={setFormat} />
        </div>
      )}
    </>
  );
}

export { ErrorBoundary };
