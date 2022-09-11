import clsx from "clsx";
import Layout from "./components/layout";
import styles from "./styles/app.css";
import { getThemeSession } from "./utils/theme.server";
import { Theme, ThemeProvider, useTheme } from "./utils/theme-provider";
import { HeadersFunction, LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { useState, useEffect } from "react";
import { useSpinDelay } from "spin-delay";
import { LoadingSpinner } from "./components/misc";
import Toast from "./components/toast";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Jameela - A Safe Youtube Video Downloader",
  viewport: "width=device-width,initial-scale=1",
  "msapplication-TileColor": "#ffffff",
  "theme-color": "#ffffff",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#000000" },
  { rel: "manifest", href: "/site.webmanifest" },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
];

export type LoaderData = {
  theme: Theme | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return data;
};

let firstRender = true;

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, s-maxage=60",
  };
};

function PageLoadingMessage() {
  const transition = useTransition();
  const [pendingPath, setPendingPath] = useState("");
  const showLoader = useSpinDelay(Boolean(transition.state !== "idle"), {
    delay: 400,
    minDuration: 1000,
  });

  useEffect(() => {
    if (firstRender) return;
    if (transition.state === "idle") return;
    setPendingPath(transition.location.pathname);
  }, [transition]);

  useEffect(() => {
    firstRender = false;
  }, []);

  return (
    <Toast position="bottom-right" visible={showLoader}>
      <div className="flex space-x-8 w-64">
        <LoadingSpinner className="w-12 h-auto" />
        <div className="flex flex-col">
          <span className="text-xl font-semibold">loading</span>
          <span className="font-light text-light-inverse">path: {pendingPath}</span>
        </div>
      </div>
    </Toast>
  );
}

function App() {
  const [theme] = useTheme();

  return (
    <html className={clsx(theme)} lang="en">
      <head>
        <meta name="color-scheme" content={theme === "light" ? "light dark" : "dark light"} />
        <Meta />
        <Links />
      </head>
      <body>
        <Toast queryStringKey="message" delay={0.3} />
        <PageLoadingMessage />
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
