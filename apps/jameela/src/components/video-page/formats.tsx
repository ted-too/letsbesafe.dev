import type { AudioFormat, VideoFormat } from "../../types";
import humanFileSize from "../../utils/human-file-size";
import { InfoCircle } from "../ui-kit/iconsax";
import ToolTip from "../ui-kit/tooltip";
import clsx from "clsx";

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

export default function Format({ type, id, thumbnail, title, data }: Props) {
  const quality = type === "audio" ? `${data.bitrate}kbps` : `${data.quality}p`;

  const handleDownload = () => {
    const params = [];
    params.push(`id=${id}`);
    params.push("platform=yt");
    params.push(`quality=${type === "audio" ? data.bitrate : data.quality}`);
    params.push(`title=${encodeURIComponent(title)}`);
    params.push(`thumbnail=${encodeURIComponent(thumbnail)}`);
    params.push(`format=${type}`);
    params.push(`itag=${data.itag}`);
    params.push(`size=${data.size}`);
    if (type === "video") params.push(`audioItag=${data.audioItag}`);
    window.open(`/api/download?${params.join("&")}`, "_blank");
  };
  console.log(type === "video" && data.noAudio);
  return (
    <button
      onClick={handleDownload}
      onMouseDown={(e) => e.preventDefault()}
      class={clsx(
        "w-full flex flex-col focus-ring rounded-lg space-y-1 py-4 px-6",
        type === "video" ? "bg-blue-50 dark:bg-blue-200" : "bg-pink-50 dark:bg-pink-200"
      )}
    >
      <span class="sr-only">
        {data.container} {quality}
      </span>
      <div class="flex items-center space-x-3">
        <span class="text-lg font-semibold">{data.container}</span>
        {type === "video" && data.noAudio && (
          <ToolTip label="no audio">
            <InfoCircle size={16} />
          </ToolTip>
        )}
      </div>
      <div class="flex items-center space-x-2 text-sm font-light">
        <span>{humanFileSize(data.size)}</span>
        <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2.5" r="2" fill="currentColor" />
        </svg>
        <span>{quality}</span>
      </div>
    </button>
  );
}
