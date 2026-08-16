import { useState } from "react";
import cineone from "@/assets/cineone21-logo.svg";
import hiflix from "@/assets/hiflix-logo.svg";
import ebvid from "@/assets/ebvid-logo.svg";
import qrcode from "@/assets/qrcode.svg";
import { MdArrowDropDown } from "react-icons/md";
import { useUserHistory } from "../hooks/useUserHistory";
import type { History } from "@/shared/types/history";

function ProfileHistoryPage() {
  const { data: userHistories, isPending, isError } = useUserHistory();

  if (isPending) {
    return <p className="col-span-2 text-center text-white">Loading...</p>;
  }

  if (isError || !userHistories) {
    return <p className="col-span-2 text-center text-2xl text-red-500">Error</p>;
  }

  return (
    <section className="col-span-2 md:block">
      {userHistories.length === 0 && (
        <p className="text-center text-lg text-white">No transaction history</p>
      )}
      {userHistories.map((history: History, index: number) => (
        <CardHistory
          key={index}
          cinema={history.cinema}
          date={history.date_booking}
          time={history.time_booking}
          seat={history.seats}
          totalPrice={history.total_price}
          title={history.movie_name}
          isTicketPaid={history.status}
        />
      ))}
    </section>
  );
}

interface CardHistoryProps {
  cinema: string;
  date: string;
  title: string;
  isTicketPaid: string;
  time: string;
  seat: string[];
  totalPrice: number;
}

function CardHistory({
  cinema,
  date,
  title,
  isTicketPaid,
  time,
  seat,
  totalPrice,
}: CardHistoryProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const isPaid = isTicketPaid === "success";

  return (
    <section className="mx-6 my-8 rounded-lg bg-black-primary shadow-sm shadow-orange-800 md:my-6 md:ml-0">
      <div className="p-6 md:flex md:flex-row-reverse md:justify-between">
        <img
          className="bg-orange mb-5 rounded px-2 py-2"
          src={cinema === "cineone" ? cineone : cinema === "hiflix" ? hiflix : ebvid}
          alt={`${cinema}-logo`}
        />
        <div>
          <p className="text-white-primary text-[13px] tracking-widest">{date}</p>
          <p className="text-white-primary mt-2 text-lg font-semibold tracking-wider">
            {title}
          </p>
        </div>
      </div>
      <div className="border-b-2 border-gray-300"></div>
      <div className="status flex flex-col gap-4 p-6 md:flex-row">
        <div className="flex flex-col gap-5 md:grow md:flex-row">
          <span
            className={`${
              isPaid
                ? "bg-[#00BA8833] text-[#00BA88]"
                : "bg-gray/30 text-gray/50"
            } w-full rounded-lg py-3 text-center font-bold tracking-wider`}
          >
            {isPaid ? "Ticket active" : "Ticket inactive"}
          </span>
          <span
            className={`${
              isTicketPaid === "failed"
                ? "bg-gray/30 text-gray/50"
                : "bg-[#E82C2C33] text-[#E82C2C]"
            } w-full rounded-lg py-3 text-center font-bold tracking-wider`}
          >
            {isPaid ? "Paid" : "Not Paid"}
          </span>
        </div>
        <span
          className="text-white-primary mt-6 flex cursor-pointer justify-center gap-3 text-center text-lg font-normal md:w-40"
          onClick={() => setShowModal(!showModal)}
        >
          <p>Show Detail</p>
          <MdArrowDropDown />
        </span>
      </div>
      {showModal && (
        <div className={`detail-card p-6 transition-all`}>
          <h2 className="mt-3 mb-8 text-2xl font-semibold text-white">
            Ticket Information
          </h2>
          {isPaid ? (
            <TicketPaid
              date={date}
              time={time}
              title={title}
              seat={seat}
              totalPrice={totalPrice}
            />
          ) : (
            <TicketNotPaid totalPrice={totalPrice} />
          )}
        </div>
      )}
    </section>
  );
}

interface TicketPaidProps {
  date: string;
  time: string;
  title: string;
  seat: string[];
  totalPrice: number;
}

function TicketPaid({ date, time, title, seat, totalPrice }: TicketPaidProps) {
  const subStrTitle = (str: string): string => {
    return str.substring(0, 12) + "...";
  };

  return (
    <section className="bg-white p-2">
      <img src={qrcode} alt="qrcode" />
      <div className="mt-5 grid w-full grid-cols-3 gap-y-3">
        <div>
          <p className="text-xs text-[#AAAAAA]">Category</p>
          <p className="mt-1 text-sm font-semibold tracking-wider text-[#14142B]">
            PG-13
          </p>
        </div>
        <div>
          <p className="text-xs text-[#AAAAAA]">Time</p>
          <p className="mt-1 text-sm font-semibold tracking-wider text-[#14142B]">
            {time}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#AAAAAA]">Seats</p>
          <p className="mt-1 text-sm font-semibold tracking-wider text-[#14142B]">
            {seat && seat.join(", ")}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#AAAAAA]">Movie</p>
          <p className="text-sm font-semibold tracking-wider text-[#14142B]">
            {title.length >= 12 ? subStrTitle(title) : title}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#AAAAAA]">Date</p>
          <p className="mt-1 text-sm font-semibold tracking-wider text-[#14142B]">
            {date}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#AAAAAA]">Count</p>
          <p className="mt-1 text-sm font-semibold tracking-wider text-[#14142B]">
            {seat && seat.length + "pcs"}
          </p>
        </div>
        <div className="mt-5 flex flex-col justify-between rounded-lg">
          <p className="text-title-info-first text-lg font-semibold">Total</p>
          <p className="mt-3 text-2xl font-bold tracking-widest text-[#14142B]">
            {"$" + totalPrice}
          </p>
        </div>
      </div>
    </section>
  );
}

function TicketNotPaid({ totalPrice }: { totalPrice: number }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-secondary text-sm font-normal">No. Rekening Virtual :</p>
        <span className="flex items-center justify-between">
          <p className="text-lg font-bold">12321328913829724</p>
          <button type="button" className="outline-primary rounded px-4 py-2 outline active:scale-95">
            Copy
          </button>
        </span>
      </div>
      <div>
        <p className="text-secondary text-sm font-normal">Total Payment</p>
        <p className="text-primary mt-2 font-bold">{"$" + totalPrice}</p>
      </div>
      <p className="text-secondary text-sm leading-8 font-normal tracking-[.75px]">
        Pay this payment bill before it is due, on{" "}
        <span className="text-red-500">June 23, 2023</span>. If the bill has not
        been paid by the specified time, it will be forfeited
      </p>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="bg-primary rounded py-4 font-bold text-white"
        >
          Check Payment
        </button>
      </div>
    </div>
  );
}

export default ProfileHistoryPage;
