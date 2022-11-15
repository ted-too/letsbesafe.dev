import clsx from "clsx";
import { JSX, ParentComponent, mergeProps, splitProps } from "solid-js";

interface LinkProps extends Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  underlineHover?: boolean;
}

const Link: ParentComponent<LinkProps> = (_props) => {
  const [props, rest] = splitProps(mergeProps({ underlineHover: false }, _props), [
    "class",
    "to",
    "children",
    "underlineHover",
  ]);
  return (
    <a
      href={props.to}
      class={clsx(
        "group relative transition duration-300 focus:outline-none hover:opacity-80 focus:opacity-80 w-max",
        props.class
      )}
      {...rest}
    >
      {props.children}
      <span
        class={clsx(
          "block max-w-0 rounded group-focus:max-w-full transition-all duration-300 h-0.5 bg-base-inverse",
          props.underlineHover && "group-hover:max-w-full"
        )}
      />
    </a>
  );
};

export default Link;
