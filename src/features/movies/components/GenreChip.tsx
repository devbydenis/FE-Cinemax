import { Link } from "react-router-dom";

interface GenreChipProps {
  label: string;
  active?: boolean;
  onSelect?: () => void;
  to?: string;
}

export function GenreChip({ label, active = false, onSelect, to }: GenreChipProps) {
  const className = `border-orange text-orange min-w-fit cursor-pointer rounded-3xl border px-4 py-2 font-medium uppercase transition-colors duration-300 ${
    active ? "bg-orange border-orange text-white" : ""
  }`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onSelect} className={className}>
      {label}
    </button>
  );
}
