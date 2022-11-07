import type { Theme } from "./utils/getTheme";
import { Moon, Sun1 } from "./kit/iconsax";
import { IconButton } from "./kit/buttons";
import clsx from "clsx";
import { createSignal } from "solid-js";
import Cookies from "universal-cookie";

export default function ThemeSwitcher({ theme: initialTheme, class: clazz }: { theme: Theme; class: string }) {
  const cookies = new Cookies();
  const [theme, setTheme] = createSignal(initialTheme);
  const switchTheme = () => {
    const newTheme = theme() === "light" ? "dark" : "light";
    document.documentElement.classList.replace(theme(), newTheme);
    setTheme(newTheme);
    cookies.set("theme", newTheme);
  };
  return (
    <div class={clsx(clazz)}>
      <IconButton type="submit" name="themeSwitcher" aria-label="Change theme" onClick={switchTheme}>
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
