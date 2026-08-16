type ChipProps = {
  value: string;
};

export function Chip(props: ChipProps) {
  return (
    <div className="bg-[#ffffff16] w-fit rounded-full px-8 py-4 font-extrabold text-orange backdrop-blur-sm">
      <p className="uppercase">{props.value}</p>
    </div>
  );
}
