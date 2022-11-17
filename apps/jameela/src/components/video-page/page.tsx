import type { Formats } from "../../types";
import SearchForm from "../search-form";
import SearchResultCard from "../search-result";
import Format from "./formats";
import { Component, For, Show, createResource, splitProps } from "solid-js";
import { InfoCircle } from "ui/iconsax";
import { LoadingSpinner } from "ui/kit/loaders";
import type { Video } from "youtube-sr";

interface Props {
  data: Video;
}

const fetchFormats = async (id?: string) => {
  return (await fetch(`/api/formats?platform=yt&id=${id}`)).json() as Promise<Formats>;
};

const VideoPage: Component<Props> = (_props) => {
  const [{ data }, props] = splitProps(_props, ["data"]);
  const [formats] = createResource(data.id, fetchFormats);
  return (
    <div class="flex flex-col items-center w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-4xl mx-auto mb-16 space-y-8 lg:space-y-0 lg:items-start lg:justify-between lg:flex-row mt-10">
      <SearchResultCard
        class="mt-4"
        noLink={true}
        data={{ platform: "YT", thumbnail: data.thumbnail, title: data.title!, id: data.id!, url: data.url }}
      />
      <div class="w-full sm:max-w-[26rem]">
        <Show
          when={formats()}
          fallback={
            <Show when={formats.loading} fallback={<div class="mx-auto mt-40 font-semibold text-xl text-center">An error occurred</div>}>
              <LoadingSpinner class="h-8 mx-auto mt-40" />
            </Show>
          }
        >
          <div class="flex flex-col space-y-8 text-dark-300">
            <div class="flex flex-col space-y-2">
              <span class="pl-6 mb-2 text-xl font-semibold text-secondary">Audio</span>
              <For each={formats()?.audio}>
                {(format) => (
                  <Format
                    type="audio"
                    data={format}
                    id={data.id!}
                    title={data.title!}
                    thumbnail={data.thumbnail?.url!}
                  />
                )}
              </For>
            </div>
            <div class="flex flex-col space-y-2">
              <span class="pl-6 mb-2 text-xl font-semibold text-secondary">Video</span>
              <For each={formats()?.video}>
                {(format) => (
                  <Format
                    type="video"
                    data={format}
                    id={data.id!}
                    title={data.title!}
                    thumbnail={data.thumbnail?.url!}
                  />
                )}
              </For>
              <div class="flex items-center space-x-1 mt-4">
                <InfoCircle size={16} />
                <span class="text-sm">- no audio</span>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default VideoPage;
