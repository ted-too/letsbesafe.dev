import { Moon, Sun1 } from "../iconsax";
import type { Theme } from "../utils/getTheme";
import { IconButton } from "./buttons";
import clsx from "clsx";
import { JSX, ParentComponent, createSignal, mergeProps, splitProps } from "solid-js";
import Cookies from "universal-cookie";

interface Props {
  theme: Theme;
  class?: string;
}

const ThemeSwitcher: ParentComponent<Props> = (props) => {
  const [theme, setTheme] = createSignal(props.theme);
  const cookies = new Cookies();
  const switchTheme = () => {
    if (!document) return;
    const newTheme = theme() === "light" ? "dark" : "light";
    document.documentElement.classList.replace(theme(), newTheme);
    setTheme(newTheme);
    cookies.set("theme", newTheme);
  };
  return (
    <IconButton class={props.class} aria-label="Change theme" variant="transparent" onClick={switchTheme}>
      <div class="relative w-4 h-4 overflow-hidden">
        <span
          class={clsx(
            "absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform duration-300",
            theme() === "light" && "translate-y-6"
          )}
        >
          <Moon size={16} />
        </span>
        <span
          class={clsx(
            "absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform duration-300",
            theme() === "dark" && "-translate-y-6"
          )}
        >
          <Sun1 size={16} />
        </span>
      </div>
    </IconButton>
  );
};

export default ThemeSwitcher;
