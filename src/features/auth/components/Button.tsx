import type { ButtonProps } from "../types/auth.types";

export function Button(props: ButtonProps) {
  return (
    <button
      className="bg-primary uppercase tracking-wider text-background bg-orange active:text-orange active:border-orange h-12 cursor-pointer rounded-full font-bold active:scale-99 active:border-2 active:bg-transparent active:duration-100 hover:bg-orange/90"
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
