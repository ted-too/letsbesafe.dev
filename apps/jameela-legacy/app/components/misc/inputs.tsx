import clsx from "clsx";
import { ComponentProps } from "react";

type TextInputProps = {} & ComponentProps<"input">;

export const TextInput = ({ className, type, ...props }: TextInputProps) => {
  return (
    <input
      className={clsx(
        `pl-5 h-12 text-sm rounded-lg text-light bg-white dark:bg-w-overlay focus-ring focus-border`,
        className
      )}
      type="text"
      {...props}
    />
  );
};

type RadioInputProps = {} & ComponentProps<"input">;

export const RadioInput = ({ className, type, ...props }: RadioInputProps) => {
  return <input className={clsx("", className)} type="radio" {...props} />;
};
