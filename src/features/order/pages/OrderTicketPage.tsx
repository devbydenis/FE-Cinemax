import { useNavigate, useParams } from "react-router-dom";
import qrcode from "@/assets/qrcode.svg";
import tickitzLogo from "@/assets/cinemax-logo-transparent.png";
import { BiDownload } from "react-icons/bi";
import { useEffect } from "react";
import { resetOrder } from "../store/orderSlice";
import { useMovieDetail } from "@/features/movies/hooks/useMovieDetail";
import { env } from "@/shared/config/env";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

function OrderTicketPage() {
  return (
    <section className="md:grid sm:grid-cols-2">
      <TicketBanner />
      <TicketResult />
      <TicketButton />
    </section>
  );
}

function TicketBanner() {
  const { id } = useParams();
  const { data: movie } = useMovieDetail(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="relative row-span-2 h-[600px] bg-cover bg-center md:h-full"
      style={{ backgroundImage: `url(${env.tmdbImageUrl}${movie?.backdropPath})` }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative z-10 mx-6 flex h-full flex-col items-center justify-center gap-5 px-10">
        <img src={tickitzLogo} alt="logo" className="w-100" />
        <h1 className="text-center text-4xl font-bold text-white">
          Thankyou For Purchasing
        </h1>
        <p className="text-lg font-bold text-white capitalize">
          download your ticket here
        </p>
        <a className="active:scale-105" href="#">
          <BiDownload className="text-4xl text-white hover:text-orange" />
        </a>
      </div>
    </section>
  );
}

function TicketResult() {
  const order = useAppSelector((state) => state.order.order);
  const { title, seats, date_booking, time_booking } = order;

  const subStrTitle = (str: string) => {
    return str.substring(0, 12) + "...";
  };

  return (
    <section className="mx-auto my-14 flex max-w-[22rem] flex-col items-center rounded-lg border-1 border-orange/20 bg-white py-8 shadow-2xl shadow-orange md:mx-auto md:px-8">
      <img src={qrcode} alt="qrcode" />
      <div className="mt-10 grid grid-cols-2">
        <div className="col-span-2">
          <p className="text-xs text-[#AAAAAA]">Movie</p>
          <p className="text-sm font-semibold text-[#14142B]">
            {title.length >= 22 ? subStrTitle(title) : title}
          </p>
        </div>
        <div className="col-span-2 mb-5">
          <p className="text-xs text-[#AAAAAA]">Seats</p>
          <p className="mt-1 text-sm font-semibold text-[#14142B]">
            {seats.join(", ")}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#AAAAAA]">Category</p>
          <p className="mt-1 text-sm font-semibold text-[#14142B]">PG-13</p>
        </div>
        <div>
          <p className="text-xs text-[#AAAAAA]">Date</p>
          <p className="mt-1 text-sm font-semibold text-[#14142B]">{date_booking}</p>
        </div>
        <div>
          <p className="text-xs text-[#AAAAAA]">Time</p>
          <p className="mt-1 text-sm font-semibold text-[#14142B]">{time_booking}</p>
        </div>
        <div>
          <p className="text-xs text-[#AAAAAA]">Count</p>
          <p className="mt-1 text-sm font-semibold text-[#14142B]">{seats.length} pcs</p>
        </div>
        <div className="col-span-2 mt-5 flex items-center justify-center border-t-4 border-orange py-5">
          <p className="mr-20 text-xl font-bold text-black">Total Payment</p>
          <p className="mt-1 text-lg font-semibold text-[#14142B]">
            ${seats.length * 10}
          </p>
        </div>
      </div>
    </section>
  );
}

function TicketButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <section className="mx-6 flex flex-col gap-3 pb-5 md:mx-16">
      <button
        className="bg-primary bg-orange rounded py-3 font-bold text-white transition-all active:scale-99"
        type="button"
      >
        Download
      </button>
      <button
        className="outline-orange text-orange rounded py-3 font-bold outline-2 transition-all active:scale-99"
        type="button"
        onClick={() => {
          dispatch(resetOrder());
          navigate("/profile/history");
        }}
      >
        Done
      </button>
    </section>
  );
}

export default OrderTicketPage;
