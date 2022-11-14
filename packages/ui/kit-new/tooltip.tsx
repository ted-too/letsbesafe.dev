import { Motion, Presence } from "@motionone/solid";
import { Show, createSignal } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

type Props = {
  children: JSX.Element;
  label: string;
};

export default function ToolTip({ children, label }: Props) {
  const [hovered, setHovered] = createSignal(false);
  return (
    <div
      class="relative flex flex-col items-center"
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <Presence exitBeforeEnter>
        <Show when={hovered()}>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ easing: "ease-in", duration: 0.3 }}
            class="absolute bottom-0 flex-col items-center flex mb-6"
          >
            <span class="relative z-10 p-2 text-xs leading-none text-primary-inverse whitespace-nowrap bg-base-inverse shadow-lg">
              {label}
            </span>
          </Motion.div>
        </Show>
      </Presence>
    </div>
  );
}
