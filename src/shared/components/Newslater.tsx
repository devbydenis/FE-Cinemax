export function Newslater() {
  return (
    <section className="border-2 border-orange my-10 rounded-[3rem] py-10 sm:mx-10 md:mx-20 md:py-20">
      <form className="mx-auto flex w-fit flex-col items-center gap-5">
        <h4 className="w-full text-center text-3xl leading-9 font-semibold text-white md:text-6xl md:leading-[4.5rem]">
          Subscribe to Our Newsletter
        </h4>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <input
            type="text"
            placeholder="Enter your email"
            className="focus:outline-orange flex-1 rounded-full border bg-white px-6 py-4 text-black outline outline-black focus:outline-2"
          />
          <input
            type="text"
            placeholder="Enter your name"
            className="focus:outline-orange flex-1 rounded-full border bg-white px-6 py-4 text-black outline outline-black focus:outline-2"
          />
        </div>
        <button
          type="submit"
          className="bg-orange w-full rounded-full px-3 py-5 font-semibold text-white uppercase"
        >
          Subscribe Now
        </button>
      </form>
    </section>
  );
}
