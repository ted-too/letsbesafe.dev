import type { JSX } from "solid-js/jsx-runtime";

type Props = {
  children: JSX.Element;
  label: string;
};

export default function ToolTip({ children, label }: Props) {
  return (
    <div class="relative flex flex-col items-center group">
      {children}
      <div class="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
        <span class="relative z-10 p-2 text-xs leading-none text-normal-inverse whitespace-nowrap bg-inverse shadow-lg">
          {label}
        </span>
      </div>
    </div>
  );
}
