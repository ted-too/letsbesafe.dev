import { IconButton } from "./kit/buttons";
import { Moon, Sun1 } from "./iconsax";
import type { Theme } from "./utils/getTheme";
import clsx from "clsx";
import { createSignal } from "solid-js";
import Cookies from "universal-cookie";

type Props = { theme: Theme; class: string; noBorder?: boolean };

export default function ThemeSwitcher(props: Props) {
  const cookies = new Cookies();
  const [theme, setTheme] = createSignal(props.theme);
  const switchTheme = () => {
    const newTheme = theme() === "light" ? "dark" : "light";
    document.documentElement.classList.replace(theme(), newTheme);
    setTheme(newTheme);
    cookies.set("theme", newTheme);
  };
  return (
    <div class={clsx(props.class)}>
      <IconButton
        type="submit"
        name="themeSwitcher"
        aria-label="Change theme"
        variant={props.noBorder ? "transparent" : "default"}
        onClick={switchTheme}
      >
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
    </div>
  );
}
