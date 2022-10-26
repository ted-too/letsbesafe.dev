import clsx from "clsx";
import type { JSX } from "solid-js/jsx-runtime";

type TextInputProps = {} & JSX.IntrinsicElements["input"];

export const TextInput = ({ class: clazz, type, ...props }: TextInputProps) => {
  return (
    <input
      class={clsx(
        `pl-5 h-12 text-sm rounded-lg text-light bg-white dark:bg-w-overlay focus-ring focus-border disabled:cursor-not-allowed`,
        clazz
      )}
      type="text"
      {...props}
    />
  );
};

type RadioInputProps = {} & JSX.IntrinsicElements["input"];

export const RadioInput = ({ class: clazz, type, ...props }: RadioInputProps) => {
  return <input class={clsx("", clazz)} type="radio" {...props} />;
};
