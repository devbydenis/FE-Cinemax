export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black-primary">
      <div className="flex gap-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-orange"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-orange [animation-delay:-.3s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-orange [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}
