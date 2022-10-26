import clsx from "clsx";

type Props = {
  src: string;
  className?: string;
};

export default function YTImage({ src, className }: Props) {
  return (
    <div className={clsx("aspect-w-16 aspect-h-9 w-full rounded-md overflow-hidden", className)}>
      <img src={src} className="object-contain w-full h-full bg-dark-900" />
    </div>
  );
}
