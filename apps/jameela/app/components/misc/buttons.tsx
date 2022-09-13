import { LoadingSpinner } from "./loaders";
import clsx from "clsx";
import { ComponentProps } from "react";

type IconButtonProps = {
  variant?: "default" | "transparent";
} & ComponentProps<"button">;

export const IconButton = ({ children, className, variant = "default", ...props }: IconButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-md p-2 bg-normal text-normal",
        variant == "default" && "focus-ring focus-border",
        variant == "transparent" && "transition-opacity hover:opacity-75 focus:opacity-75",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

type ButtonProps = {
  loading?: boolean;
} & ComponentProps<"button">;

export const Button = ({ className, loading, children, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx("relative py-3 px-8 w-max rounded-md min-h-[3rem] bg-inverse text-inverse focus-ring", className)}
      {...props}
    >
      <LoadingSpinner
        className={clsx(
          "transition-opacity",
          !loading ? "opacity-0" : "opacity-100",
          "absolute w-auto h-5 top-0 bottom-0 left-0 right-0 m-auto"
        )}
      />
      <div className={clsx("transition-opacity", loading ? "opacity-0" : "opacity-100")}>{children}</div>
    </button>
  );
};
