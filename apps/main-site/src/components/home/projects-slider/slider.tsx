import { Jameela, Kawan, MoreComingSoon } from "./cards";
import { Motion, Presence } from "@motionone/solid";
import clsx from "clsx";
import { For, Show, createSignal, onCleanup, onMount } from "solid-js";

interface Props {
  class?: string;
}

export default function ProjectsSlider(props: Props) {
  // FIXME: Jumps when switching from touch to mouse
  let slider: HTMLDivElement | undefined;
  const [mouseDown, setMouseDown] = createSignal(false);
  const [scrolling, setScrolling] = createSignal(false);
  const [startX, setStartX] = createSignal(0);
  const [scrollLeft, setScrollLeft] = createSignal(0);
  const [scrollPercent, setScrollPercent] = createSignal(0);
  const [prevScrollPercent, setPrevScrollPercent] = createSignal(0);
  const [hideScrollBar, setHideScrollBar] = createSignal(false);
  const [touchStart, setTouchStart] = createSignal(0);
  const shouldHideScrollBar = () => setHideScrollBar(slider!.scrollWidth - slider!.clientWidth <= 0);
  const cardClass = '[@media(min-width:400px)]:min-w-[18rem] w-[60vw] [@media(min-width:546px)]:w-[23rem] sm:w-[26rem] h-auto'
  onMount(() => {
    window.addEventListener("resize", shouldHideScrollBar);
    shouldHideScrollBar();
  });
  onCleanup(() => {
    window.removeEventListener("resize", shouldHideScrollBar);
  });
  const handleScroll = (e: any) => {
    if (!mouseDown()) return setScrolling(false);
    setScrolling(true);
    const x = e.pageX - slider!.offsetLeft;
    const walk = (x - startX()) * 1.5; //scroll-speed multiplier
    slider!.scrollLeft = scrollLeft() - walk;
    const newScrollPercent = slider!.scrollLeft / (slider!.scrollWidth - slider!.clientWidth);
    setScrollPercent(newScrollPercent);
  };
  return (
    <div
      class={clsx(
        "flex flex-col relative space-y-12 bg-isabelline-200 dark:bg-middle-gray p-5 pb-12 sm:p-10 sm:pb-14 xl:p-16 xl:pb-16 w-full",
        props.class
      )}
    >
      <div
        class="overflow-x-auto flex items-center space-x-[3.25rem] select-none scrollbar-hide cursor-pointer"
        onMouseDown={(e) => {
          setMouseDown(true);
          setStartX(e.pageX - slider!.offsetLeft);
          setScrollLeft(slider!.scrollLeft);
        }}
        onMouseLeave={(e) => setMouseDown(false)}
        onMouseUp={(e) => setMouseDown(false)}
        onTouchStart={(e) => {
          setTouchStart(e.targetTouches[0].pageX);
          setPrevScrollPercent(scrollPercent());
        }}
        onTouchEnd={(e) => {
          setTouchStart(0);
          setPrevScrollPercent(scrollPercent());
        }}
        onTouchCancel={(e) => setTouchStart(0)}
        onTouchMove={(e) => {
          // FIXME: Doesn't work correctly when flick swiping
          // FIXME: Mobile just totally broken
          const distance = (touchStart() - e.changedTouches[0].pageX) / (slider!.scrollWidth - slider!.clientWidth);
          const newPos = prevScrollPercent() + distance;
          if (newPos > 1 || newPos <= 0) return;
          setScrollPercent(newPos);
        }}
        onMouseMove={handleScroll}
        role='tablist'
        tabindex="-1"
        ref={slider}
      >
        <a
          href="/projects#jameela"
          onClick={(e) => scrolling() && e.preventDefault()}
          class="text-dark-400 no-drag hover:text-melon focus:outline-none focus:text-melon transition-colors duration-300"
        >
          <Jameela class="w-[77vw] max-w-[26.25rem] h-auto" />
        </a>
        <a
          href="/projects#kawan"
          onClick={(e) => scrolling() && e.preventDefault()}
          class="text-dark-400 no-drag hover:text-melon focus:outline-none focus:text-melon transition-colors duration-300"
        >
          <Kawan class="w-[77vw] max-w-[26.25rem] h-auto" />
        </a>
        <div>
          <MoreComingSoon class="w-[77vw] max-w-[26.25rem] h-auto" />
        </div>
      </div>
      <Presence exitBeforeEnter>
        <Show when={!hideScrollBar()}>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ easing: "ease-in", duration: 0.2 }}
            class="absolute bottom-5 left-0 right-0 mx-auto flex-col items-center flex"
          >
            <div class={clsx("relative bg-black-200 dark:bg-w-overlay-300 h-4 sm:h-5 w-32 mx-auto rounded-full overflow-hidden")}>
              <div
                class="absolute left-0 top-0 bottom-0 h-full w-full rounded-full dark:bg-w-overlay-900 bg-black-900"
                style={{ "max-width": `${Math.round(scrollPercent() * 10000) / 100}%` }}
              />
            </div>
          </Motion.div>
        </Show>
      </Presence>
    </div>
  );
}
