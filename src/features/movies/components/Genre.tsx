import { useState } from "react";

type GenreProps = {
  title: string;
};
export default function Genre(props: GenreProps) {

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <li
      className={`${isActive ? "bg-orange border-orange text-white" : ""} border-orange text-orange min-w-fit cursor-pointer rounded-3xl border px-4 py-2 font-medium uppercase`}
      onClick={() => setIsActive(!isActive)}
    >
      {props.title}
    </li>
  );
}