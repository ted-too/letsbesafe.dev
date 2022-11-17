import type { Platform, SearchResult } from "../types";
import clsx from "clsx";
import type { Component } from "solid-js";

interface Props {
  data: SearchResult;
  class?: string;
  noLink?: boolean;
}

interface YTImageProps {
  class?: string;
  src: string;
  title: string;
  noHover?: boolean;
}

const YTImage: Component<YTImageProps> = (props) => (
  <div
    class={clsx(
      "aspect-video w-full rounded-md overflow-hidden transition-opacity",
      !props.noHover && "hover:opacity-90",
      props.class
    )}
  >
    <img src={props.src} alt={props.title} class="object-contain w-full h-full bg-black no-drag" />
  </div>
);

const SearchResultCard: Component<Props> = (props) => {
  const containerClass = clsx(
    "flex flex-col space-y-4 transition-all rounded-md max-w-[20rem] sm:max-w-[16rem] xl:max-w-[20rem] w-full h-full focus-ring select-none",
    props.class
  );
  const children = (
    <>
      <YTImage src={props.data.thumbnail?.url || "/no-image.png"} noHover={props.noLink} title={props.data.title} />
      <span class="text-lg font-semibold line-clamp-3">{props.data.title}</span>
    </>
  );
  if (props.noLink) return <div class={containerClass}>{children}</div>;
  return (
    <a href={`/video/${encodeURIComponent(props.data.id)}`} class={containerClass}>
      {children}
    </a>
  );
};

export default SearchResultCard;
