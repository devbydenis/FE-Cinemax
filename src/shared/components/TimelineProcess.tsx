export function TimelineProcess() {
  return (
    <section className="flex items-center justify-center gap-8 px-5">
      <div className="flex flex-col items-center">
        <span className="border-orange bg-orange rounded-full border-2 border-dashed px-3 py-1 text-white">1</span>
        <p className="text-orange">dates &amp; time</p>
      </div>
      <div className="w-10 border-b-2 border-dashed border-orange"></div>
      <div className="flex flex-col items-center">
        <span className="border-orange bg-orange rounded-full border-2 border-dashed px-3 py-1 text-white">2</span>
        <p className="text-orange">Seat</p>
      </div>
      <div className="w-10 border-b-2 border-dashed"></div>
      <div className="flex flex-col items-center">
        <span className="border-orange bg-orange rounded-full border-2 border-dashed px-3 py-1 text-white">3</span>
        <p className="text-orange">Payment</p>
      </div>
    </section>
  );
}
