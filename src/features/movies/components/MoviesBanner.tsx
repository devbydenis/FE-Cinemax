import background_img from "@/assets/background_img.png";
import { Chip } from "@/shared/components/Chip";

export function MoviesBanner() {
  return (
    <section
      className="relative m-5 h-[32.5rem] rounded-[3rem] bg-cover bg-center bg-no-repeat md:mx-20 md:my-10 md:h-[28.125rem]"
      style={{ backgroundImage: `url(${background_img})` }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 z-10 rounded-4xl bg-linear-to-t from-[#000000] to-[#ffffff0c]"></div>
      <div className="absolute z-40 flex h-full flex-col items-center justify-end gap-4 px-6 py-4 text-center text-white md:items-start md:text-start">
        <Chip value="list movie of the week" />
        <h1 className="text-3xl font-semibold md:text-4xl">
          Experience the Magic of Cinema:{" "}
          <span className="text-orange">Book Your Tickets Today</span>
        </h1>
        <p>Sign up and get the ticket with a lot of discount</p>
      </div>
    </section>
  );
}
