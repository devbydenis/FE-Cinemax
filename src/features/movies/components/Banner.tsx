import { Chip } from "@/shared/components/Chip";
import { GradientText } from "./GradientText";

export function Banner() {
  return (
    <section className="my-7 flex flex-col items-center justify-center gap-4 md:mx-16">
      <Chip value="MOVIE TICKET PURCHASES #1 IN INDONESIA" />
      <div className="px-7">
        <div className="text-center">
          <GradientText animationSpeed={5}>
            Experience the Magic of Cinema
          </GradientText>
          <p className="animate-pulse pt-2 text-2xl font-bold text-gray-200 md:text-4xl">
            Book Your Tickets Today
          </p>
        </div>
      </div>
      <div>
        <p className="text-center text-sm font-light tracking-wider text-gray-300 md:text-lg">
          Sign up and get the ticket with a lot of discount
        </p>
      </div>
    </section>
  );
}
