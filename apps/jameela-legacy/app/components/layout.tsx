import { GithubIcon, IconButton, JameelaLogo, LetsBeSafeLogo } from "./misc";
import { Form, Link, useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun1 } from "iconsax-react";
import { ReactNode } from "react";
import { Theme } from "~/utils/theme.server";

type Props = {
  theme: Theme | null;
  children: ReactNode;
  className?: string;
};

export default function Layout({ theme, children, className }: Props) {
  const fetcher = useFetcher();

  return (
    <div className="w-full transition-colors duration-300 bg-normal">
      <header className="flex flex-col items-center w-full pt-16 pb-4">
        <Link
          to="/"
          className="transition-all duration-300 ease-in-out w-max group text-normal hover:opacity-75 focus:opacity-75 focus:outline-none"
        >
          <JameelaLogo className="w-auto h-9" />
          <div className="mt-2 max-w-0 group-focus:max-w-full h-[2px] rounded-full transition-all duration-500 bg-inverse" />
        </Link>
        <p className="mt-2 font-light text-center max-w sm:text-base text-light">
          [jah-mee-laa] – ‘beautiful’ <br /> swahili
        </p>
        <div className="flex mt-4 space-x-3 text-gray-900">
          <fetcher.Form action="/action/change-theme" method="post">
            <IconButton
              type="submit"
              name="themeSwitcher"
              aria-label="Change theme"
            >
              <div className="relative w-4 h-4 overflow-hidden">
                <span
                  className={clsx(
                    "absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform duration-300",
                    theme == 'light' && "translate-y-6"
                  )}
                >
                  <Moon size={16} />
                </span>
                <span
                  className={clsx(
                    "absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform duration-300",
                    theme == 'dark' && "-translate-y-6"
                  )}
                >
                  <Sun1 size={16} />
                </span>
              </div>
            </IconButton>
          </fetcher.Form>
        </div>
      </header>
      <main
        className={clsx(
          "min-h-screen w-full max-w-[1536px] mx-auto px-5 sm:px-0 flex flex-col items-center",
          className
        )}
      >
        {children}
      </main>
      <div className="px-4 md:px-8 1.5xl:px-0 w-full border-t border-dark-50 dark:border-w-overlay-100">
        <footer className="flex flex-col w-full max-w-xs pb-10 mx-auto mt-40 space-y-32 sm:max-w-2xl md:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl md:pb-16 md:mt-48">
          <div className="grid justify-center w-full grid-cols-6 space-y-8">
            <div className="w-[19rem] col-span-full sm:col-span-4 xl:col-span-3 flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-light text-light">a project by</span>
                <a
                  href="https://letsbesafe.dev"
                  className="transition-all duration-300 ease-in-out w-max group text-normal hover:opacity-75 focus:opacity-75 focus:outline-none"
                >
                  <LetsBeSafeLogo className="w-auto h-5 mb-1" />
                  <div className="max-w-0 group-focus:max-w-full h-[2px] rounded-full transition-all duration-500 bg-inverse" />
                </a>
              </div>
              <p className="text-lg text-light">Because it doesn’t hurt to be safe in today’s day and age.</p>
              <div className="flex space-x-4 text-normal">
                <a href="https://github.com/ted-too/letsbesafe.dev" target='_blank'>
                  <IconButton aria-label="Github link" variant="transparent">
                    <GithubIcon className="w-auto h-5" />
                  </IconButton>
                </a>
              </div>
            </div>
            <nav className="flex flex-col w-48 col-span-full sm:col-span-1">
              <span className="mb-5 text-lg font-semibold text-normal">General</span>
              <Link to="/" className="footer-link">
                Home
              </Link>
              <Link to="/use-terms" className="my-2 footer-link">
                Terms of use
              </Link>
              <a href="https://letsbesafe.dev/contact" className="footer-link">
                Contact
              </a>
            </nav>
            <div className="flex flex-col col-span-full sm:col-span-2 w-full max-w-[25.75rem]">
              <span className="text-lg font-semibold text-normal">Disclaimer</span>
              <p className="mt-5 text-lg text-light">
                By using this service you assume all liabilities in the event of a dispute by the content owner(s).
              </p>
              <a href="https://github.com/ted-too/letsbesafe.dev/issues" target='_blank' className="mt-4 font-light text-pink-500 hover:underline w-max">Found a bug?</a>
            </div>
          </div>
          <span className="text-sm font-light text-light">created for educational use :)</span>
        </footer>
      </div>
    </div>
  );
}
