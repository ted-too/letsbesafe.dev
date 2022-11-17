import { Motion, Presence } from "@motionone/solid";
import clsx from "clsx";
import { createFocusTrap } from "focus-trap";
import { Component, Show, createSignal, onCleanup, onMount } from "solid-js";
import { CloseX, HamburgerMenu, Send2 } from "ui/iconsax";
import { Button, IconButton, LinkButton } from "ui/kit/buttons";
import Link from "ui/kit/link";
import ThemeSwitcher from "ui/kit/theme-switcher";
import type { Theme } from "ui/utils/getTheme";

interface Props {
  class?: string;
  theme: Theme;
  links: { title: string; to: string; button: boolean }[];
}

const HamburgerSideMenu: Component<Props> = (props) => {
  const [open, setOpen] = createSignal(false);
  let btn: HTMLButtonElement | undefined;
  let menu: HTMLDivElement | undefined;
  let trap: any;
  const handleOpen = () => {
    document.body.classList.add("no-scroll");
    trap.activate();
    setOpen(true);
  };
  const handleClose = () => {
    document.body.classList.remove("no-scroll");
    trap.deactivate();
    setOpen(false);
  };
  const handleEscape = (e: KeyboardEvent) => {
    if (!open() || e.key !== "Escape") return;
    handleClose();
  };
  const handleOutsideClick = (e: MouseEvent) => {
    if (menu?.contains((e as any).target) || btn?.contains((e as any).target)) return;
    handleClose();
  };
  onMount(() => {
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleOutsideClick);
    trap = createFocusTrap(menu as any, { initialFocus: false, clickOutsideDeactivates: true });
  });
  onCleanup(() => {
    document.removeEventListener("keydown", handleEscape);
    document.removeEventListener("click", handleOutsideClick);
  });
  return (
    <div class={props.class}>
      <IconButton variant="transparent" aria-label="Open side menu" onClick={handleOpen} ref={btn}>
        <HamburgerMenu size={24} />
      </IconButton>
      <aside
        class={clsx(
          "fixed right-0 top-0 h-full z-50 w-72 bg-base transition-transform duration-300 ease-in",
          open() ? "translate-x-0" : "translate-x-72"
        )}
        ref={menu}
      >
        <div class="flex flex-col items-center my-4 mx-6 space-y-4">
          <div class="flex items-center w-full justify-between">
            <ThemeSwitcher theme={props.theme} />
            <IconButton variant="transparent" aria-label="Close side menu" size="sm" onClick={handleClose}>
              <CloseX size={24} />
            </IconButton>
          </div>
          {props.links.map((link) => (
            <div class="pt-4 border-t dark:border-black-600 border-black-200 flex justify-center w-[75%]">
              {link.button ? (
                <LinkButton to={link.to} variant="outline">
                  {link.title}
                </LinkButton>
              ) : (
                <Link to={link.to}>
                  {link.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </aside>
      <Presence exitBeforeEnter>
        <Show when={open()}>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ easing: "ease-in", duration: 0.3 }}
            class="absolute right-0 top-0 h-full z-40 w-full bg-[rgba(0,0,0,0.4)]"
          />
        </Show>
      </Presence>
    </div>
  );
};

export default HamburgerSideMenu;
