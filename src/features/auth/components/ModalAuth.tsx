import type { ModalAuthProps } from "../types/auth.types";

export function ModalAuth(props: ModalAuthProps) {
  return (
    <>
      <div className="absolute top-0 right-0 bottom-0 left-0 z-10 bg-black/50"></div>
      <div className="absolute top-50 z-20 w-fit mx-6 my-10 flex flex-col items-center gap-3 rounded-xl bg-[#0d0b0b] px-5 py-10 shadow-xl shadow-orange-500 outline-4 -outline-offset-8 outline-white md:mx-20 lg:mx-50 lg:px-20">
        <h1 className="bg-orange- rounded px-5 text-3xl font-extrabold text-orange-500 uppercase">
          Info
        </h1>
        <p className="font-medium text-white text-center max-w-60">{props.message}</p>
        <button
          type="button"
          onClick={() => props.setShowModalAuth(false)}
          className="bg-orange w-full cursor-pointer rounded-xl mt-5 px-6 py-2 font-bold text-white uppercase outline-2 -outline-offset-4 outline-white active:scale-99"
        >
          ok
        </button>
      </div>
    </>
  );
}
