import affordable from "@/assets/affordable.svg";
import customerService from "@/assets/customerService.svg";
import guaranted from "@/assets/guaranted.svg";
import { Chip } from "@/shared/components/Chip";

export function WhyChooseUs() {
  return (
    <section className="bg-black-primary/30 mt-10 rounded-[2.5rem] py-10">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-7">
        <Chip value="WHY CHOOSE US" />
        <h3 className="px-10 text-center text-5xl font-extrabold text-white">
          Unleashing the Ultimate Movie Experience
        </h3>
      </div>
      <div className="custom-scrollbar mt-10 flex flex-col flex-wrap items-center justify-center gap-5 sm:flex-row sm:items-start sm:justify-center md:flex-row lg:overflow-hidden">
        <CardWhyChooseUs
          img={guaranted}
          title="Guaranteed"
          desc="Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a."
        />
        <CardWhyChooseUs
          img={affordable}
          title="Affordable"
          desc="Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a."
        />
        <CardWhyChooseUs
          img={customerService}
          title="24/7 Customer Support"
          desc="Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a."
        />
      </div>
    </section>
  );
}

interface CardWhyChooseUsProps {
  img: string;
  title: string;
  desc: string;
}

function CardWhyChooseUs({ img, title, desc }: CardWhyChooseUsProps) {
  return (
    <div className="bg-white-secondary mx-5 max-w-102 rounded-xl p-6">
      <img src={img} alt="logo-why-choose-us" />
      <h4 className="mt-8.5 mb-16 text-[1.75rem] leading-9 font-semibold">
        {title}
      </h4>
      <p className="text-black-secondary w-3/4 text-base font-light">
        {desc}
      </p>
    </div>
  );
}
