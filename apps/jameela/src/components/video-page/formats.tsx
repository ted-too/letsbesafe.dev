import type { AudioFormat, VideoFormat } from "../../types";
import humanFileSize from "../../utils/human-file-size";
import clsx from "clsx";

type Props =
  | {
      id: string;
      title: string;
      type: "audio";
      data: AudioFormat;
    }
  | {
      id: string;
      title: string;
      type: "video";
      data: VideoFormat;
    };

export default function Format({ type, id, title, data }: Props) {
  const format = type === "audio" ? "mp3" : "mp4";
  const quality = type === "audio" ? `${data.bitrate}kbps` : `${data.quality}p`;

  const handleDownload = () => {
    const params = [];
    params.push(`id=${id}`);
    params.push("platform=yt");
    params.push(`quality=${type === "audio" ? data.bitrate : data.quality}`);
    params.push(`title=${encodeURIComponent(title)}`);
    params.push(`format=${type}`);
    params.push(`itag=${data.itag}`);
    params.push(`size=${data.size}`);
    if (type === "video") params.push(`audioItag=${data.audioItag}`);
    window.open(`/api/download?${params.join("&")}`, "_blank");
  };
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
        {format} {quality}
      </span>
      <span class="text-lg font-semibold">{format}</span>
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
