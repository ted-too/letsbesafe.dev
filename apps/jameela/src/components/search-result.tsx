import type { Platform, SearchResult } from "../types";
import clsx from "clsx";

type Props = {
  data: SearchResult;
  type: Platform;
  class?: string;
  noLink?: boolean;
};

const YTImage = ({ class: clazz = "", src = "", title = "", noHover = false }) => (
  <div
    class={clsx(
      "aspect-w-16 aspect-h-9 w-full rounded-md overflow-hidden transition-opacity",
      !noHover ? "hover:opacity-90" : "pointer-events-none select-none",
      clazz
    )}
  >
    <img src={src} alt={title} class="object-contain w-full h-full bg-dark-900" />
  </div>
);

const Children = ({ type, data, noHover }: { type: Platform; data: Props["data"]; noHover?: boolean }) => (
  <>
    {type === "YT" && <YTImage src={data.thumbnail?.url || "/no-image.png"} title={data.title} noHover={noHover} />}
    <span class="text-lg font-semibold text-normal line-clamp-3">{data.title}</span>
  </>
);

export default function SearchResultCard({ data, type, class: clazz, noLink = false }: Props) {
  const containerClass = clsx(
    "flex flex-col space-y-4 transition-all rounded-md w-80 sm:w-64 xl:w-80 h-full",
    !noLink && "focus-ring",
    clazz
  );
  return noLink ? (
    <div class={containerClass}>
      <Children type="YT" data={data} noHover />
    </div>
  ) : (
    <a href={`/video?platform=${type.toLowerCase()}&id=${encodeURIComponent(data.id)}`} class={containerClass}>
      <Children type="YT" data={data} />
    </a>
  );
}
