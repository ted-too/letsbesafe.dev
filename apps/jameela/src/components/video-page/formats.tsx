import type { AudioFormat, VideoFormat } from "../../types";
import clsx from "clsx";
import type { Component } from "solid-js";
import { InfoCircle } from "ui/iconsax";
import ToolTip from "ui/kit/tooltip";
import humanFileSize from "ui/utils/human-file-size";

type Props =
  | {
      id: string;
      title: string;
      thumbnail: string;
      type: "audio";
      data: AudioFormat;
    }
  | {
      id: string;
      title: string;
      thumbnail: string;
      type: "video";
      data: VideoFormat;
    };

const Format: Component<Props> = (props) => {
  const quality = props.type === "audio" ? `${props.data.bitrate}kbps` : `${props.data.quality}p`;

  const handleDownload = () => {
    const params = [];
    params.push(`id=${props.id}`);
    params.push("platform=yt");
    params.push(`quality=${props.type === "audio" ? props.data.bitrate : props.data.quality}`);
    params.push(`title=${encodeURIComponent(props.title)}`);
    params.push(`thumbnail=${encodeURIComponent(props.thumbnail)}`);
    params.push(`container=${props.data.container}`);
    params.push(`format=${props.type}`);
    params.push(`itag=${props.data.itag}`);
    params.push(`size=${props.data.size}`);
    if (props.type === "video") params.push(`audioItag=${props.data.audioItag}`);
    window.open(`/api/download?${params.join("&")}`, "_blank");
  };
  return (
    <button
      onClick={handleDownload}
      onMouseDown={(e) => e.preventDefault()}
      class={clsx(
        "w-full flex flex-col focus-ring hover-ring rounded-lg space-y-1 py-4 px-6",
        props.type === "video" ? "bg-[#BEDDEF] dark:bg-[#8DC3E2]" : "bg-melon-200 dark:bg-melon-400"
      )}
    >
      <span class="sr-only">
        {props.data.container} {quality}
      </span>
      <div class="flex items-center space-x-3">
        <span class="text-lg font-semibold">{props.data.container}</span>
        {props.type === "video" && props.data.noAudio && (
          <ToolTip label="no audio">
            <InfoCircle size={16} />
          </ToolTip>
        )}
      </div>
      <div class="flex items-center space-x-2 text-sm font-light">
        <span>{humanFileSize(props.data.size)}</span>
        <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2.5" r="2" fill="currentColor" />
        </svg>
        <span>{quality}</span>
      </div>
    </button>
  );
};

export default Format;
