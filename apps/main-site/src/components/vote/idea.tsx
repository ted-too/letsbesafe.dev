import api from "../../utils/api";
import IdeaCard from "./card";
import clsx from "clsx";
import { Component, For, createResource, createSignal } from "solid-js";

const VoteIdeas: Component<{ class?: string; data: any[] }> = (props) => {
  // TODO: Implement custom scrollbar
  const [selected, setSelected] = createSignal(0);
  return (
    <div class={clsx("flex flex-col space-y-20 items-center w-full", props.class)}>
      <div class="flex space-x-16 overflow-x-auto overflow-y-visible w-full">
        <For each={props.data}>
          {(idea, index) => (
            <IdeaCard
              data={{ id: idea.id, title: idea.title, excerpt: idea.excerpt }}
              selected={selected() === index()}
              setSelected={() => setSelected(index())}
            />
          )}
        </For>
      </div>
      <div class="flex flex-col space-y-1 max-w-7xl w-full min-h-[20rem]">
        <h4 class="text-2xl font-semibold">Description</h4>
        <p class="text-xl font-light">{props.data[selected()].description}</p>
      </div>
    </div>
  );
};

export default VoteIdeas;
