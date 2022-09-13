import { GithubIcon, IconButton, JameelaLogo, LetsBeSafeLogo } from "./misc";
import { Form, Link } from "@remix-run/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun1 } from "iconsax-react";
import { ReactNode } from "react";
import { Theme, useTheme } from "~/utils/theme-provider";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Layout({ children, className }: Props) {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };
  return (
    <div className="w-full bg-normal transition-colors duration-300">
      <header className="pt-16 pb-4 w-full flex flex-col items-center">
        <Link
          to="/"
          className="w-max group text-normal hover:opacity-75 focus:opacity-75 focus:outline-none transition-all duration-300 ease-in-out"
        >
          <JameelaLogo className="w-auto h-9" />
          <div className="mt-2 max-w-0 group-focus:max-w-full h-[2px] rounded-full transition-all duration-500 bg-inverse" />
        </Link>
        <p className="max-w mt-2 sm:text-base font-light text-center text-light">
          [jah-mee-laa] – ‘beautiful’ <br /> swahili
        </p>
        <div className="flex space-x-3 mt-4 text-gray-900">
          <IconButton type="submit" name="themeSwitcher" aria-label="Change theme" onClick={toggleTheme}>
            <div className="w-4 h-4 relative overflow-hidden">
              <span
                className={clsx(
                  "absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform duration-300",
                  theme == Theme.LIGHT && "translate-y-6"
                )}
              >
                <Moon size={16} />
              </span>
              <span
                className={clsx(
                  "absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform duration-300",
                  theme == Theme.DARK && "-translate-y-6"
                )}
              >
                <Sun1 size={16} />
              </span>
            </div>
          </IconButton>
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
        <footer className="w-full max-w-xs sm:max-w-2xl md:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto pb-10 mt-40 md:pb-16 md:mt-48 flex flex-col space-y-32">
          <div className="w-full grid space-y-8 grid-cols-6 justify-center">
            <div className="w-[19rem] col-span-full sm:col-span-4 xl:col-span-3 flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <span className="text-light font-light text-sm">a project by</span>
                <a
                  href="https://letsbesafe.dev"
                  className="w-max group text-normal hover:opacity-75 focus:opacity-75 focus:outline-none transition-all duration-300 ease-in-out"
                >
                  <LetsBeSafeLogo className="w-auto h-5 mb-1" />
                  <div className="max-w-0 group-focus:max-w-full h-[2px] rounded-full transition-all duration-500 bg-inverse" />
                </a>
              </div>
              <p className="text-light text-lg">Because it doesn’t hurt to be safe in today’s day and age.</p>
              <div className="flex space-x-4 text-normal">
                <IconButton aria-label="Github link" variant="transparent">
                  <GithubIcon className="w-auto h-5" />
                </IconButton>
              </div>
            </div>
            <nav className="flex flex-col col-span-full sm:col-span-1 w-48">
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
            </div>
          </div>
          <span className="text-light font-light text-sm">created for educational use :)</span>
        </footer>
      </div>
    </div>
  );
}
