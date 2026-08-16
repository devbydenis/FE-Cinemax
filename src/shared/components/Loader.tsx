interface LoaderProps {
  overlay: boolean;
}

export function Loader({ overlay }: LoaderProps) {
  return (
    <>
      {overlay && (
        <div className="absolute top-0 right-0 bottom-0 left-0 z-10 bg-black/50"></div>
      )}
      <div className="absolute z-20 flex items-center justify-center gap-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-orange"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-orange [animation-delay:-.3s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-orange [animation-delay:-.5s]"></div>
      </div>
    </>
  );
}
