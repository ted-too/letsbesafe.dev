import { useFetcher } from "@remix-run/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, createElement, useContext, useEffect, useRef, useState } from "react";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}
const themes: Array<Theme> = Object.values(Theme);
type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children, specifiedTheme }: { children: ReactNode; specifiedTheme: Theme | null }) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme;
      } else {
        return null;
      }
    }

    return Theme.LIGHT;
  });

  const persistTheme = useFetcher();
  // TODO: remove this when persistTheme is memoized properly
  const persistThemeRef = useRef(persistTheme);
  useEffect(() => {
    persistThemeRef.current = persistTheme;
  }, [persistTheme]);

  const mountRun = useRef(false);

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) {
      return;
    }

    persistThemeRef.current.submit({ theme }, { action: "action/set-theme", method: "post" });
  }, [theme]);

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * This allows you to render something that depends on the theme without
 * worrying about whether it'll SSR properly when we don't actually know
 * the user's preferred theme.
 */
function Themed({
  dark,
  light,
  initialOnly = false,
}: {
  dark: ReactNode | string;
  light: ReactNode | string;
  initialOnly?: boolean;
}) {
  const [theme] = useTheme();
  const [initialTheme] = useState(theme);
  const themeToReference = initialOnly ? initialTheme : theme;
  const serverRenderWithUnknownTheme = !theme && typeof document === "undefined";

  if (serverRenderWithUnknownTheme) {
    // stick them both in and our little script will update the DOM to match
    // what we'll render in the client during hydration.
    return (
      <>
        {createElement("dark-mode", null, dark)}
        {createElement("light-mode", null, light)}
      </>
    );
  }

  return <>{themeToReference === "light" ? light : dark}</>;
}

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export { isTheme, Theme, Themed, ThemeProvider, useTheme };
