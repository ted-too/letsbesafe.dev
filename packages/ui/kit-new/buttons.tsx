import { LoadingSpinner } from "./loaders";
import { Motion, Presence } from "@motionone/solid";
import clsx from "clsx";
import { Component, ParentComponent, Show, mergeProps, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

// type ButtonProps = {
//   loading?: boolean;
// } & JSX.IntrinsicElements["button"];

interface BaseProps {
  size?: "sm" | "base" | "lg";
  disabled?: boolean;
  invert?: boolean;
}

interface ButtonProps extends BaseProps, JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  rightIcon?: JSX.Element;
  variant?: "outline" | "solid";
  loading?: boolean;
}
interface IconButtonProps extends BaseProps, JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid" | "transparent";
}
interface LinkButtonProps extends BaseProps, Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: "outline" | "solid" | "transparent";
  to: string;
}

export const Button: ParentComponent<ButtonProps> = (_props) => {
  const [props, rest] = splitProps(
    mergeProps({ size: "base", variant: "solid", invert: false, disabled: false, loading: false }, _props),
    ["invert", "size", "class", "variant", "children", "loading", "rightIcon"]
  );
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      class={clsx(
        "relative disabled:ring-0 disabled:cursor-not-allowed disabled:opacity-80",
        props.size === "sm" && "h-8 px-6",
        props.size === "base" && "h-10 px-8",
        props.size === "lg" && "h-12 px-10",
        props.variant === "solid" &&
          clsx(
            "hover:opacity-90",
            props.invert
              ? "bg-base text-primary focus-ring-inverse hover-ring-inverse"
              : "bg-base-inverse text-primary-inverse focus-ring hover-ring"
          ),
        props.variant === "outline" && "border border-primary focus-ring hover-ring",
        props.class
      )}
      {...rest}
    >
      <Show when={props.loading}>
        <LoadingSpinner class="absolute w-auto h-5 top-0 bottom-0 left-0 right-0 m-auto" />
      </Show>
      <div class={clsx("flex items-center w-full justify-between", props.loading && "opacity-0")}>
        {props.children}
        {props.rightIcon}
      </div>
    </button>
  );
};

export const IconButton: ParentComponent<IconButtonProps> = (_props) => {
  const [props, rest] = splitProps(
    mergeProps({ size: "base", variant: "solid", invert: false, disabled: false }, _props),
    ["invert", "size", "class", "variant"]
  );
  return (
    <button
      class={clsx(
        "aspect-square active:bg-black-50 dark:active:bg-w-overlay-50 w-max disabled:pointer-events-none disabled:opacity-75",
        props.size === "sm" && "p-2",
        props.size === "base" && "p-3",
        props.size === "lg" && "p-4",
        props.variant === "transparent" ? "hover:opacity-80 focus:outline-none focus:text-melon-500" : "focus-ring",
        props.variant === "solid" &&
          clsx("hover:opacity-90", props.invert ? "bg-base text-primary" : "bg-base-inverse text-primary-inverse"),
        props.variant === "outline" && "border-[1.5px] border-primary hover:bg-black-100 dark:hover:bg-w-overlay-300",
        props.class
      )}
      onMouseDown={(e) => e.preventDefault()}
      {...rest}
    />
  );
};

export const LinkButton: ParentComponent<LinkButtonProps> = (_props) => {
  const [props, rest] = splitProps(
    mergeProps({ size: "base", variant: "solid", invert: false, disabled: false }, _props),
    ["disabled", "invert", "size", "class", "variant", "to"]
  );
  return (
    <a
      href={props.to}
      class={clsx(
        "flex items-center w-max",
        props.variant === "transparent"
          ? "hover:opacity-80 focus:outline-none focus:text-melon-500 transition"
          : clsx(
              "transition-all",
              props.size === "sm" && "h-8 px-6",
              props.size === "base" && "h-10 px-8",
              props.size === "lg" && "h-12 px-10"
            ),
        props.variant === "solid" &&
          clsx(
            "hover:opacity-90",
            props.invert
              ? "bg-base text-primary focus-ring-inverse hover-ring-inverse"
              : "bg-base-inverse text-primary-inverse focus-ring hover-ring"
          ),
        props.variant === "outline" &&
          "border border-primary hover:bg-black-50 dark:hover:bg-w-overlay-200 focus-ring hover-ring",
        props.disabled && "opacity-75 pointer-events-none",
        props.class
      )}
      onMouseDown={(e) => e.preventDefault()}
      {...rest}
    />
  );
};
