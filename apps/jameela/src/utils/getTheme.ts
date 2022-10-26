import type { AstroGlobal } from "astro";

export type Theme = "light" | "dark";

export default function getTheme(Astro: Readonly<AstroGlobal>): Theme {
  if (!Astro.cookies.has("theme")) {
    Astro.cookies.set("theme", "light");
    return "light";
  }
  if (Astro.cookies.get("theme").value === "dark") return "dark";
  return "light";
}
