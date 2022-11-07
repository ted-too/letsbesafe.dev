import clsx from "clsx";
import type { JSX } from "solid-js/jsx-runtime";

export const LoadingSpinner = ({ class: clazz, ...props }: JSX.IntrinsicElements["svg"]) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={clsx(`animate-spin text-gray-900`, clazz)}
    {...props}
  >
    <path
      opacity={0.5}
      d="M9 1.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM9 15A6 6 0 1 1 9 3a6 6 0 0 1 0 12Z"
      fill="currentColor"
    />
    <path d="M15 9h1.5A7.5 7.5 0 0 0 9 1.5V3a6 6 0 0 1 6 6Z" fill="currentColor" />
  </svg>
);

export const LoadingOverlay = () => {
  return (
    <div class="absolute w-full h-full flex items-center bg-[rgba(0,0,0,0.05)] backdrop-blur-[1px] top-0 left-0">
      <LoadingSpinner class="w-auto h-10 mx-auto" />
    </div>
  );
};
