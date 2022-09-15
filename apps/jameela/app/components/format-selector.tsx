import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { AudioFormat, VideoFormat, availableFormats } from "~/routes/video";
import humanFileSize from "~/utils/format-file-size";

type Props = {
  duration: number;
  selected: (VideoFormat | AudioFormat) | null;
  setSelected: (format: VideoFormat | AudioFormat) => void;
};

const Card = ({
  video = false,
  format,
  quality,
  size,
}: {
  video?: boolean;
  format: string;
  quality: string;
  size: number;
}) => (
  <div className={clsx("w-full flex flex-col space-y-1 py-4 px-6", video ? "bg-blue-50 dark:bg-blue-200" : "bg-pink-50 dark:bg-pink-200")}>
    <RadioGroup.Label className="sr-only">
      {format} {quality}
    </RadioGroup.Label>
    <span className="text-lg font-semibold">{format}</span>
    <RadioGroup.Description as="div" className="flex items-center space-x-2 text-sm font-light">
      <span>{humanFileSize(size)}</span>
      <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2.5" r="2" fill="currentColor" />
      </svg>
      <span className="">{quality}</span>
    </RadioGroup.Description>
  </div>
);

export default function FormatSelector({ duration, selected: format, setSelected: setFormat }: Props) {
  const { audio, video } = availableFormats;
  return (
    <RadioGroup value={format} onChange={setFormat}>
      <RadioGroup.Label className="sr-only">Choose a format</RadioGroup.Label>
      <div className="flex flex-col space-y-2">
        <span className="pl-6 mb-2 text-xl font-semibold">Audio</span>
        {audio.map((format, i) => (
          <RadioGroup.Option
            key={`audio-format-${i}`}
            value={format}
            className="overflow-hidden rounded-lg cursor-pointer focus-ring"
          >
            {({ checked }) => (
              <Card
                format={format.format}
                quality={`${format.quality}kbs`}
                size={duration * (parseInt(format.quality) + 20) * 100}
              />
            )}
          </RadioGroup.Option>
        ))}
      </div>
      <div className="flex flex-col mt-8 space-y-2">
        <span className="pl-6 mb-2 text-xl font-semibold">Video</span>
        {video.map((format, i) => (
          <RadioGroup.Option
            key={`video-format-${i}`}
            value={format}
            className="overflow-hidden rounded-lg cursor-pointer focus-ring"
          >
            {({ checked }) => (
              <Card
                format={format.format}
                quality={format.quality}
                size={duration * (format.quality == "360p" ? 80 : 120.0) * 1000}
                video
              />
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
