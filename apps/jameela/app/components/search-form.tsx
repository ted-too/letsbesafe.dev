import { ErrorBoundaryComponent } from "@remix-run/node";
import { useFetcher, useTransition } from "@remix-run/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { TextInput, Button, LoadingSpinner } from "./misc";

type Props = {
  firstSearch?: boolean;
  children?: ReactNode;
};

export default function SearchForm({ firstSearch = false, children = null }: Props) {
  const [showError, setShowError] = useState(true);
  const fetcher = useFetcher();
  return (
    <>
      {firstSearch ? (
        <p className="text-center sm:text-lg mb-6 mt-[15vh] text-light">
          Download and save your youtube videos in a <br /> format of your choice
        </p>
      ) : (
        <span className="text-center sm:text-lg mb-6 mt-[5vh] text-light">Search for another video</span>
      )}
      <fetcher.Form method="post" action="/action/search" className="relative w-full">
        <fieldset
          className="flex justify-center items-center w-full flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          disabled={fetcher.state == "submitting"}
        >
          <TextInput
            onFocus={() => setShowError(false)}
            className="w-full sm:w-[40%]"
            placeholder="Search or paste link"
            aria-label="search"
            name="search"
          />
          <Button
            type="submit"
            onClick={() => setShowError(true)}
            loading={fetcher.state == "submitting"}
            className="rounded-lg text-sm sm:text-base"
          >
            Search
          </Button>
        </fieldset>
      </fetcher.Form>
      <div className="min-h-[1.5rem] mt-4 text-pink-500">
        <AnimatePresence>
          {fetcher.data && showError && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            >
              {fetcher.data.error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="relative w-full max-w-7xl transition-opacity">{children}</div>
    </>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div className="mt-[10vh] mx-6 w-full sm:max-w-xl max-w-3xl bg-pink-50 border border-pink-400 text-normal rounded-lg p-10 pb-14 sm:pb-28 flex flex-col items-center">
      <svg className="w-auto h-12 sm:h-24 mb-6" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.9797 6.22656C11.033 6.27842 11.0649 6.34851 11.0688 6.42282C11.0727 6.49712 11.0484 6.57017 11.0008 6.62734C10.8155 6.83351 10.5889 6.99839 10.3357 7.11125C10.0825 7.22412 9.80845 7.28245 9.53125 7.28245C9.25405 7.28245 8.97996 7.22412 8.72678 7.11125C8.4736 6.99839 8.24701 6.83351 8.06172 6.62734C8.0141 6.57017 7.98981 6.49712 7.99372 6.42282C7.99763 6.34851 8.02945 6.27842 8.08281 6.22656C8.13926 6.17731 8.21267 6.15198 8.28748 6.15591C8.36229 6.15985 8.43262 6.19275 8.48359 6.24765C8.61489 6.39596 8.77616 6.51469 8.95677 6.59602C9.13737 6.67734 9.33318 6.71939 9.53125 6.71939C9.72932 6.71939 9.92513 6.67734 10.1057 6.59602C10.2863 6.51469 10.4476 6.39596 10.5789 6.24765C10.6299 6.19275 10.7002 6.15985 10.775 6.15591C10.8498 6.15198 10.9232 6.17731 10.9797 6.22656ZM5.93828 6.62734C5.9859 6.57017 6.01019 6.49712 6.00628 6.42282C6.00237 6.34851 5.97055 6.27842 5.91719 6.22656C5.86074 6.17731 5.78733 6.15198 5.71252 6.15591C5.63771 6.15985 5.56738 6.19275 5.51641 6.24765C5.38512 6.39596 5.22383 6.51469 5.04323 6.59602C4.86263 6.67734 4.66682 6.71939 4.46875 6.71939C4.27068 6.71939 4.07487 6.67734 3.89427 6.59602C3.71367 6.51469 3.55238 6.39596 3.42109 6.24765C3.37012 6.19275 3.29979 6.15985 3.22498 6.15591C3.15017 6.15198 3.07676 6.17731 3.02031 6.22656C2.96695 6.27842 2.93513 6.34851 2.93122 6.42282C2.92731 6.49712 2.9516 6.57017 2.99922 6.62734C3.18451 6.83351 3.4111 6.99839 3.66428 7.11125C3.91746 7.22412 4.19155 7.28245 4.46875 7.28245C4.74595 7.28245 5.02004 7.22412 5.27322 7.11125C5.5264 6.99839 5.75299 6.83351 5.93828 6.62734V6.62734ZM9.025 10.7055C8.42505 10.3064 7.72056 10.0935 7 10.0935C6.27944 10.0935 5.57495 10.3064 4.975 10.7055C4.91397 10.7469 4.87166 10.8107 4.85719 10.883C4.84272 10.9553 4.85726 11.0305 4.89766 11.0922C4.91753 11.1242 4.94377 11.1517 4.97474 11.1731C5.00572 11.1945 5.04077 11.2093 5.07771 11.2165C5.11464 11.2238 5.15268 11.2233 5.18945 11.2153C5.22621 11.2072 5.26092 11.1916 5.29141 11.1695C5.79837 10.8348 6.39249 10.6563 7 10.6563C7.60751 10.6563 8.20163 10.8348 8.70859 11.1695C8.7538 11.2016 8.80786 11.2188 8.86328 11.2187C8.91044 11.2188 8.9569 11.2073 8.99858 11.1852C9.04026 11.1632 9.07589 11.1312 9.10234 11.0922C9.14274 11.0305 9.15728 10.9553 9.14281 10.883C9.12834 10.8107 9.08603 10.7469 9.025 10.7055V10.7055ZM13.4688 1.39609V5.3125C13.4688 7.77344 12.8078 10.0867 11.6055 11.8375C10.4031 13.5883 8.75078 14.5937 7 14.5937C5.24922 14.5937 3.61797 13.6164 2.39453 11.8375C1.17109 10.0586 0.53125 7.77344 0.53125 5.3125V1.39609C0.532856 1.25943 0.566828 1.12509 0.630383 1.00409C0.693937 0.883094 0.785264 0.778882 0.896875 0.699998C1.01027 0.623683 1.14027 0.575571 1.27603 0.559672C1.41179 0.543772 1.54938 0.560544 1.67734 0.608592C2.68984 1.00234 4.71484 1.65625 7 1.65625C9.28516 1.65625 11.3102 1.00234 12.3227 0.608592C12.4506 0.560544 12.5882 0.543772 12.724 0.559672C12.8597 0.575571 12.9897 0.623683 13.1031 0.699998C13.2147 0.778882 13.3061 0.883094 13.3696 1.00409C13.4332 1.12509 13.4671 1.25943 13.4688 1.39609V1.39609ZM12.9062 1.39609C12.9074 1.35036 12.8971 1.30505 12.8763 1.26431C12.8555 1.22356 12.8249 1.18867 12.7871 1.16281C12.7494 1.13695 12.7058 1.12095 12.6603 1.11625C12.6147 1.11156 12.5688 1.11832 12.5266 1.13594C11.4789 1.53672 9.37656 2.21875 7 2.21875C4.62344 2.21875 2.52109 1.53672 1.47344 1.13594C1.44264 1.12156 1.40898 1.11435 1.375 1.11484C1.31779 1.11726 1.26214 1.1342 1.21328 1.16406C1.17609 1.1902 1.14579 1.22496 1.12497 1.26537C1.10415 1.30578 1.09344 1.35064 1.09375 1.39609V5.3125C1.09375 10.1219 3.74453 14.0312 7 14.0312C10.2555 14.0312 12.9062 10.1219 12.9062 5.3125V1.39609Z"
          fill="currentColor"
        />
      </svg>
      <span className="text-2xl sm:text-3xl text-center font-semibold">Oh no!</span>
      <span className="text-lg sm:text-xl text-center font-light">Something went wrong</span>
      <p className="mt-4 bg-white p-4 text-center">{error.message}</p>
    </div>
  );
};
