import { Motion, Presence } from "@motionone/solid";
import { Component, Show } from "solid-js";
import { Button } from "ui/kit-new/buttons";

type Data = {
  id: string;
  title: string;
  excerpt: string;
};

interface Props {
  data: Data;
  selected: boolean;
  setSelected: () => void;
}

const IdeaCard: Component<Props> = (props) => {
  return (
    <div class="relative flex items-center flex-col h-[14rem] md:h-[17.75rem] w-full min-w-[18rem] max-w-[26.25rem] pt-[1.375rem]">
      <Presence>
        <Show when={props.selected}>
          <Motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ easing: "ease-in", duration: 0.15 }}
            class="absolute h-11 -top-0 text-lg sm:text-xl text-center px-8 py-2 bg-isabelline z-10"
          >
            Selected
          </Motion.div>
        </Show>
      </Presence>
      <div class="p-8 flex flex-col items-center h-full w-full justify-between border border-primary">
        <div class="flex flex-col space-y-2 items-center text-center">
          <h3 class="text-2xl md:text-3xl font-semibold">{props.data.title}</h3>
          <p class="text-lg md:text-xl font-light">{props.data.excerpt}</p>
        </div>
        <Button variant="outline" class="w-max" onClick={props.setSelected}>
          Show Details
        </Button>
      </div>
    </div>
  );
};

export default IdeaCard;
