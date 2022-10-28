import type { Formats } from "../../types";
import SearchForm from "../search-form";
import SearchResultCard from "../search-result";
import { LoadingSpinner } from "../ui-kit/loaders";
import Format from "./formats";
import { createResource } from "solid-js";
import type { Video } from "youtube-sr";
import { InfoCircle } from "../ui-kit/iconsax";

type Props = {
  data: Video;
};

const fetchFormats = async (id?: string) => {
  return (await fetch(`/api/formats?platform=yt&id=${id}`)).json() as Promise<Formats>;
};

export default function VideoPage({ data }: Props) {
  const [formats] = createResource(data.id, fetchFormats);
  return (
    <>
      <SearchForm />
      <div class="flex flex-col items-center w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-4xl mx-auto mb-16 space-y-8 lg:space-y-0 lg:items-start lg:justify-between lg:flex-row mt-10">
        <SearchResultCard
          class="mt-4"
          type="YT"
          noLink={true}
          data={{ platform: "YT", thumbnail: data.thumbnail, title: data.title!, id: data.id!, url: data.url }}
        />
        <div class="w-full sm:max-w-[26rem]">
          {formats.loading ? (
            <LoadingSpinner class="h-8 mx-auto mt-40" />
          ) : (
            <>
              <div class="flex flex-col space-y-2">
                <span class="pl-6 mb-2 text-xl font-semibold text-normal">Audio</span>
                {formats()?.audio.map((format) => (
                  <Format
                    type="audio"
                    data={format}
                    id={data.id!}
                    title={data.title!}
                    thumbnail={data.thumbnail?.url!}
                  />
                ))}
              </div>
              <div class="flex flex-col mt-8 space-y-2">
                <span class="pl-6 mb-2 text-xl font-semibold text-normal">Video</span>
                {formats()?.video.map((format) => (
                  <Format
                    type="video"
                    data={format}
                    id={data.id!}
                    title={data.title!}
                    thumbnail={data.thumbnail?.url!}
                  />
                ))}
                <div class="flex items-center space-x-1 mt-4">
                  <InfoCircle size={16} />
                  <span class="text-sm">- no audio</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
