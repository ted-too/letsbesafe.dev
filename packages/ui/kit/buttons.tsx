import { LoadingSpinner } from "./loaders";
import clsx from "clsx";
import type { JSX } from "solid-js/jsx-runtime";

type IconButtonProps = {
  variant?: "default" | "transparent";
} & JSX.IntrinsicElements["button"];

export const IconButton = ({ children, class: clazz, variant = "default", ...props }: IconButtonProps) => {
  return (
    <button
      class={clsx(
        "rounded-md p-2 bg-normal text-normal disabled:cursor-not-allowed",
        variant == "default" && "focus-ring focus-border",
        variant == "transparent" && "transition-opacity hover:opacity-75 focus:opacity-75 focus-ring",
        clazz
      )}
      onMouseDown={(e) => e.preventDefault()}
      {...props}
    >
      {children}
    </button>
  );
};

type ButtonProps = {
  loading?: boolean;
} & JSX.IntrinsicElements["button"];

export const Button = ({ class: clazz, loading, children, ...props }: ButtonProps) => {
  return (
    <button
      class={clsx(
        "relative py-3 px-8 w-max rounded-md min-h-[3rem] bg-inverse text-normal-inverse focus-ring disabled:cursor-not-allowed",
        clazz
      )}
      onMouseDown={(e) => e.preventDefault()}
      {...props}
    >
      <LoadingSpinner
        class={clsx(
          "transition-opacity",
          !loading ? "opacity-0" : "opacity-100",
          "absolute w-auto h-5 top-0 bottom-0 left-0 right-0 m-auto"
        )}
      />
      <div class={clsx("transition-opacity", loading ? "opacity-0" : "opacity-100")}>{children}</div>
    </button>
  );
};
