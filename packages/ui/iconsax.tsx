import type { JSX } from "solid-js/jsx-runtime";

export type IconsaxProps = JSX.IntrinsicElements["svg"] & {
  size?: number;
};

export const Moon = ({ size = 20, ...props }: IconsaxProps) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2.03 12.42c.36 5.15 4.73 9.34 9.96 9.57 3.69.16 6.99-1.56 8.97-4.27.82-1.11.38-1.85-.99-1.6-.67.12-1.36.17-2.08.14C13 16.06 9 11.97 8.98 7.14c-.01-1.3.26-2.53.75-3.65.54-1.24-.11-1.83-1.36-1.3C4.41 3.86 1.7 7.85 2.03 12.42Z"
      stroke="currentColor"
      stroke-width={1.5}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Sun1 = ({ size = 20, ...props }: IconsaxProps) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
      stroke="currentColor"
      stroke-width={1.5}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="m19.14 19.14-.13-.13m0-14.02.13-.13-.13.13ZM4.86 19.14l.13-.13-.13.13ZM12 2.08V2v.08ZM12 22v-.08.08ZM2.08 12H2h.08ZM22 12h-.08.08ZM4.99 4.99l-.13-.13.13.13Z"
      stroke="currentColor"
      stroke-width={2}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const InfoCircle = ({ size = 20, ...props }: IconsaxProps) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM12 8v5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M11.995 16h.009" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export const Tick = ({ size = 20, ...props }: IconsaxProps) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M6 12L9.99529 16L18 8"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const CloseX = ({ size = 20, style, ...props }: IconsaxProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    style={{ rotate: "45deg" }}
    {...props}
  >
    <path
      d="M6 12h12M12 18V6"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);

export const DirectSend = ({ size = 20, ...props }: IconsaxProps) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 9V2l-2 2M12 2l2 2M1.98 13h4.41c.38 0 .72.21.89.55l1.17 2.34A2 2 0 0 0 10.24 17h3.53a2 2 0 0 0 1.79-1.11l1.17-2.34a1 1 0 0 1 .89-.55h4.36"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M7 5.13c-3.54.52-5 2.6-5 6.87v3c0 5 2 7 7 7h6c5 0 7-2 7-7v-3c0-4.27-1.46-6.35-5-6.87"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);

export const Send2 = ({ size = 20, ...props }: IconsaxProps) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m7.4 6.32 8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92ZM10.11 13.65l3.58-3.59"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);

export const HamburgerMenu = ({ size = 20, ...props }: IconsaxProps) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
  </svg>
);

export const ArrowDown2 = ({ size = 20, ...props }: IconsaxProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="10"
      stroke-width="1.5"
      d="M19.92 8.95l-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
    ></path>
  </svg>
);

export const PayPal = ({ size = 20, ...props }: IconsaxProps) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M19 7v.5c-.1 1.5-.8 2.8-1.7 3.7-1.1 1.1-2.6 1.8-4.3 1.8H9.9c-.5 0-.9.4-1 .9l-.8 5.3c-.1.4-.3.7-.7.8H5.2c-.6 0-1.1-.5-1-1.2L6.6 4.5C6.8 3.1 8.1 2 9.5 2H14c2.8 0 5 2.2 5 5Z"
      stroke="currentColor"
      stroke-width={1.5}
      stroke-miterlimit={10}
    />
    <path
      d="M21 11c0 1.4-.6 2.6-1.5 3.5-.9.9-2.1 1.5-3.5 1.5h-2.1c-.5 0-.9.3-1 .8l-.7 4.3c-.1.5-.5.8-1 .8h-3c-.6 0-1.1-.6-1-1.2l.2-.7c.4-.1.7-.4.7-.8l.8-5.3c.1-.5.5-.9 1-.9H13c1.7 0 3.2-.7 4.2-1.8 1-1 1.6-2.3 1.7-3.7 1.3.7 2.1 2 2.1 3.5Z"
      stroke="currentColor"
      stroke-width={1.5}
      stroke-miterlimit={10}
    />
  </svg>
);
