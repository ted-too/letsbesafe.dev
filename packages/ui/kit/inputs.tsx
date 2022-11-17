import clsx from "clsx";
import { Component, JSX, mergeProps, splitProps } from "solid-js";

// TODO: Setup loading indicators

interface BaseProps {
  size?: "sm" | "base" | "lg";
  loading?: boolean;
}

interface TextInputProps extends BaseProps, Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size"> {}
interface CheckboxProps extends TextInputProps {}
interface TextAreaInputProps extends Omit<JSX.InputHTMLAttributes<HTMLTextAreaElement>, "size"> {}

export const TextInput: Component<TextInputProps> = (_props) => {
  const [props, rest] = splitProps(mergeProps({ loading: false, size: "base" }, _props), [
    "loading",
    "size",
    "class",
    "children",
  ]);
  return (
    <input
      class={clsx(
        "border border-primary px-4 bg-base shadow-md placeholder:font-light placeholder:text-tertiary dark:shadow-none focus-ring hover-ring",
        "disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:ring-0",
        props.size === "base" && "h-12 placeholder:text-sm",
        props.class
      )}
      {...rest}
    >
      {props.children}
    </input>
  );
};

export const TextAreaInput: Component<TextAreaInputProps> = (_props) => {
  const [props, rest] = splitProps(mergeProps({ loading: false, size: "base" }, _props), [
    "loading",
    "size",
    "class",
    "children",
  ]);
  return (
    <textarea
      class={clsx(
        "border border-primary p-4 bg-base shadow-md placeholder:font-light placeholder:text-tertiary dark:shadow-none focus-ring hover-ring",
        "disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:ring-0",
        props.size === "base" && "min-h-[7.5rem] placeholder:text-sm",
        props.class
      )}
      {...rest}
    >
      {props.children}
    </textarea>
  );
};

export const Checkbox: Component<CheckboxProps> = (_props) => {
  const [props, rest] = splitProps(mergeProps({ loading: false, size: "base" }, _props), [
    "loading",
    "size",
    "class",
    "children",
  ]);
  return (
    <div class={clsx("flex flex-wrap items-center space-x-3 w-full justify-center text-center", props.class)}>
      <input
        type="checkbox"
        class={clsx(
          "aspect-square w-full border border-tertiary accent-melon-400",
          props.size === "base" && "w-[1.125rem]"
        )}
        {...rest}
      />
      <span class=" font-light text-secondary">{props.children}</span>
    </div>
  );
};
