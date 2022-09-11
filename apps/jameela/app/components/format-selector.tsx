import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { AudioFormat, availableFormats, VideoFormat } from "~/routes/video";
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
  <div className={clsx("w-[26rem] flex flex-col space-y-1 py-4 px-6", video ? "bg-blue-50" : "bg-pink-50")}>
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
        <span className="text-xl font-semibold mb-2 pl-6">Audio</span>
        {audio.map((format, i) => (
          <RadioGroup.Option
            key={`audio-format-${i}`}
            value={format}
            className="focus-ring rounded-lg overflow-hidden cursor-pointer"
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
      <div className="flex flex-col space-y-2 mt-8">
        <span className="text-xl font-semibold mb-2 pl-6">Video</span>
        {video.map((format, i) => (
          <RadioGroup.Option
            key={`video-format-${i}`}
            value={format}
            className="focus-ring rounded-lg overflow-hidden cursor-pointer"
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
