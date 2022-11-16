import { Motion, Presence } from "@motionone/solid";
import { Component, Show, createSignal, onCleanup } from "solid-js";
import { Send2 } from "ui/iconsax";
import { Button, IconButton, LinkButton } from "ui/kit-new/buttons";
import Tooltip from "ui/kit-new/tooltip";

const ShareButton: Component = () => {
  const [showShare, setShowShare] = createSignal(false);
  const toggleSideBar = () => setShowShare(!showShare());
  const closeSidebar = () => setShowShare(false);
  return (
    <>
      <Tooltip label="share">
        <button
          class="text-secondary p-0 focus:outline-none focus:text-melon-400 active:text-melon-400 transition-colors"
          aria-label="share website"
          onMouseDown={(e) => e.preventDefault()}
          onClick={async () => {
            const shareData = {
              url: "https://letsbesafe.dev",
              title: "letsbesafe.dev",
              text: "a collection of safer more private alternatives to your everyday apps",
            };
            if (navigator.canShare(shareData)) return await navigator.share(shareData);
            await navigator.clipboard.writeText(shareData.url);
            await new Promise((resolve) => {
              setShowShare(true);
              setTimeout(resolve, 1000);
            });
            setShowShare(false);
          }}
        >
          <Send2 class="w-auto h-5" />
        </button>
      </Tooltip>
      <Presence exitBeforeEnter>
        <Show when={showShare()}>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ easing: "ease-in", duration: 0.3 }}
            class="absolute right-0 left-0 mx-auto text-center top-16 py-2 w-32 dark:bg-[rgba(255,255,255,0.75)] bg-[rgba(0,0,0,0.75)] text-primary-inverse z-20"
          >
            Link Copied
          </Motion.div>
        </Show>
      </Presence>
    </>
  );
};

export default ShareButton;
