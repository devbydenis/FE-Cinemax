import { Chip } from "@/shared/components/Chip";
import { GradientText } from "./GradientText";

export function Banner() {
  return (
    <section className="my-7 flex flex-col items-center justify-center gap-4 md:mx-16">
      <Chip value="MOVIE TICKET PURCHASES #1 IN INDONESIA" />
      <div className="px-7">
        <div className="text-center text-5xl font-medium xl:text-6xl xl:leading-23 2xl:text-7xl/14 2xl:leading-25">
          <GradientText>Experience the Magic of Cinema: </GradientText>
          <p className="block animate-pulse font-bold text-gray-200">
            Book Your Tickets Today
          </p>
        </div>
      </div>
      <div>
        <p className="text-center text-lg font-light tracking-wider text-red-100">
          Sign up and get the ticket with a lot of discount
        </p>
      </div>
    </section>
  );
}
