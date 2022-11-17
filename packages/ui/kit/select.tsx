import { ArrowDown2 } from "../iconsax";
import { Button } from "./buttons";
import { Motion, Presence } from "@motionone/solid";
import clsx from "clsx";
import { Accessor, Component, For, JSX, Setter, Show, createSignal, onCleanup, onMount, splitProps } from "solid-js";

export type Option = {
  label: string;
  [key: string]: any;
};

interface Props {
  class?: string;
  placeholder?: string;
  option?: Accessor<Option>;
  setOption?: Setter<Option>;
  options: Option[];
  disabled?:boolean
}

const Select: Component<Props> = (props) => {
  // FIXME: Make fully aria compliant
  const [open, setOpen] = createSignal(false);
  const [localCurrent, setLocalCurrent] = createSignal<Option>(
    props.placeholder ? { label: props.placeholder } : props.options[0]
  );
  const current = props.option || localCurrent;
  const setCurrent = props.setOption || setLocalCurrent;
  props.placeholder && props.setOption && props.setOption({ label: props.placeholder });
  const [selected, setSelected] = createSignal<Option | undefined>();
  let btn: HTMLButtonElement | undefined;
  let menu: HTMLUListElement | undefined;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(undefined);
  };
  const toggle = () => (open() ? handleClose() : handleOpen());
  const changeOption = (opt: Option) => {
    setCurrent(opt);
    handleClose();
    btn?.focus();
  };
  const handleKeyPress = (e: KeyboardEvent) => {
    if (!open()) return;
    switch (e.key) {
      case "Enter":
        if (document.activeElement == btn) {
          e.preventDefault()
          toggle()
        }
        break
      case "Escape":
        handleClose();
        break;
      case " ":
        e.preventDefault();
        if (!selected()) break;
        changeOption(selected()!);
        break;
      case "ArrowDown":
        e.preventDefault();
        const nextIndex = props.options.indexOf(selected() || current()) + 1;
        setSelected(props.options[nextIndex >= props.options.length ? 0 : nextIndex]);
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIndex = props.options.indexOf(selected() || current()) - 1;
        setSelected(props.options[prevIndex < 0 ? props.options.length - 1 : prevIndex]);
        break;
      default:
        break;
    }
  };
  const handleOutsideClick = (e: MouseEvent) => {
    if (menu?.contains((e as any).target) || btn?.contains((e as any).target)) return;
    handleClose();
  };
  onMount(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleOutsideClick);
  });
  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyPress);
    document.removeEventListener("click", handleOutsideClick);
  });
  return (
    <div class="relative">
      <Button
        aria-haspopup="listbox"
        aria-expanded={open()}
        size="lg"
        variant="outline"
        class={clsx("w-full px-4 dark:shadow-none shadow-md bg-base", !current().value ? 'text-tertiary font-light text-sm' : '')}
        rightIcon={<ArrowDown2 />}
        type='button'
        onClick={toggle}
        disabled={props.disabled}
        ref={btn}
      >
        {current().label}
      </Button>
      <ul
        role="listbox"
        aria-activedescendant={current().label}
        class={clsx("absolute top-14 left-0 min-w-[10rem] w-full bg-white shadow-md border p-3 z-20", !open() && "hidden")}
        ref={menu}
      >
        <For each={props.options}>
          {(option) => (
            <li
              class={clsx(
                "p-4 hover:bg-isabelline cursor-pointer",
                current() === option && "bg-isabelline",
                selected() === option && "bg-melon-200"
              )}
              onClick={() => changeOption(option)}
              role='listitem'
            >
              {option.label}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default Select;
