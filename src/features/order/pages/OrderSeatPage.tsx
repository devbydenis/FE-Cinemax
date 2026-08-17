import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import logo from "@/assets/cineone21-logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { addOrderAction, addSeatsAction } from "../store/orderSlice";
import { useMovieDetail } from "@/features/movies/hooks/useMovieDetail";
import { env } from "@/shared/config/env";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

type SeatId = string;

function OrderSeatPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <OrderInfo />
      <OrderSeatsSelector setShowModal={setShowModal} />
      <OrderModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

function OrderInfo() {
  const { id } = useParams();
  const { data: movie } = useMovieDetail(id);
  const order = useAppSelector((state) => state.order.order);

  return (
    <section className="bg-black-primary m-4 gap-5 rounded-lg border border-gray-900 p-4 md:flex lg:justify-center">
      <div
        className="h-54 rounded-lg bg-cover md:h-56 md:flex-1/2 lg:h-72 lg:flex-5"
        style={{
          backgroundImage: `url(${env.tmdbImageUrl}${movie?.backdropPath})`,
        }}
      ></div>
      <div className="lg:flex-5">
        <h1 className="text-white-primary mt-4 text-4xl font-bold md:mt-1 md:text-2xl">
          {movie?.title}
        </h1>
        <ul className="mt-4 flex flex-wrap gap-3">
          {movie?.genres.map((genre) => (
            <li
              key={`genre-id: ${genre.id}`}
              className="min-w-fit rounded-3xl border-2 border-gray-400 px-3 py-1.5 font-medium text-gray-400 uppercase"
            >
              {genre.name}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col items-start gap-5">
          <p className="text-lg font-medium text-gray-500 md:mt-1">
            Regular - {order.time_booking}
          </p>
          <button
            type="button"
            className="bg-orange text-primary hover:outline-primary cursor-pointer rounded-2xl px-5 py-1.5 font-semibold text-white transition-all hover:opacity-90 hover:outline active:scale-95"
          >
            Change
          </button>
        </div>
      </div>
    </section>
  );
}

interface OrderSeatsSelectorProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function OrderSeatsSelector({ setShowModal }: OrderSeatsSelectorProps) {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const [selectedSeats, setSelectedSeats] = useState<SeatId[]>([]);

  const rows = 10;
  const cols = 10;
  const colLabels: number[] = Array.from({ length: cols }, (_, i) => i + 1);
  const rowLabels: string[] = Array.from({ length: rows }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  const handleSeatClick = (seatId: SeatId): void => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((id) => id !== seatId);
      }
      return [...prevSelectedSeats, seatId];
    });
  };

  const isSeatSelected = (seatId: SeatId): boolean => {
    return selectedSeats.includes(seatId);
  };

  const handleSeatsChoosed = (data: FieldValues) => {
    Object.values(data).forEach((value) => {
      if (value) {
        setSelectedSeats(value);
      }
    });

    dispatch(addSeatsAction(selectedSeats));
    setShowModal(true);
  };

  const seatLabelClass = (seatId: SeatId): string =>
    `mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded text-xs font-medium transition-colors duration-200 lg:h-12 lg:w-12 ${
      isSeatSelected(seatId)
        ? "bg-orange-500 text-white"
        : "bg-black-primary border-orange hover:bg-orange border"
    }`;

  return (
    <form
      onSubmit={handleSubmit((data) => handleSeatsChoosed(data))}
      className="m-6 flex flex-col items-center rounded-lg"
    >
      <div className="mb-8 overflow-hidden">
        <div className="mb-8 flex h-20 items-center justify-center rounded-t-2xl rounded-b-4xl bg-white/30 p-2 text-3xl font-semibold tracking-wider text-white shadow-md shadow-white">
          SCREEN
        </div>
        <div className="mb-2 flex gap-2 lg:gap-4">
          <div className="w-9"></div>
          {colLabels.map((col) => {
            if (col === 6) {
              return (
                <div key={`col-${col}`} className="ml-3 flex gap-2 lg:ml-10 lg:gap-4">
                  <div className="w-5 lg:w-6"></div>
                  <div className="text-white-primary w-8 text-center font-medium lg:h-12 lg:w-12">
                    {col}
                  </div>
                </div>
              );
            }
            return (
              <div
                key={`col-${col}`}
                className="text-white-primary w-8 text-center font-medium lg:h-12 lg:w-12"
              >
                {col}
              </div>
            );
          })}
        </div>

        {rowLabels.map((row) => (
          <div
            key={`row-${row}`}
            className="text-white-primary lg mb-2 flex items-center lg:gap-2"
          >
            <div className="mr-2 w-8 text-center font-medium">{row}</div>
            {colLabels.map((col) => {
              const seatId: SeatId = `${row}${col}`;
              if (col === 6) {
                return (
                  <div className="ml-10 lg:ml-20" key={seatId}>
                    <div className="w-8"></div>
                    <label className={seatLabelClass(seatId)}>
                      {seatId}
                      <input
                        onClick={() => handleSeatClick(seatId)}
                        type="checkbox"
                        {...register(`${seatId}`)}
                        className="hidden"
                        value={seatId}
                      />
                    </label>
                  </div>
                );
              }
              return (
                <label key={seatId} className={seatLabelClass(seatId)}>
                  {seatId}
                  <input
                    onClick={() => handleSeatClick(seatId)}
                    type="checkbox"
                    className="hidden"
                    {...register(`${seatId}`)}
                    value={seatId}
                  />
                </label>
              );
            })}
          </div>
        ))}
        <button
          type="submit"
          className="bg-orange mt-5 w-full cursor-pointer rounded-full px-3 py-5 font-semibold text-white uppercase"
        >
          Submit ({selectedSeats.length} Seats)
        </button>
      </div>
    </form>
  );
}

interface OrderModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function OrderModal({ showModal, setShowModal }: OrderModalProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = useAppSelector((state) => state.order.order);
  const dispatch = useAppDispatch();

  const handleConfirmButton = () => {
    dispatch(addOrderAction({ totalPrice: order.seats.length * 10 }));
    setShowModal(false);
    navigate(`/order/payment/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div className="absolute inset-0 h-screen w-full bg-black opacity-50"></div>
      )}
      {showModal && (
        <section className="outline-orange bg-white-primary/80 absolute top-20 right-0 left-0 mx-6 my-10 flex flex-col items-center rounded-xl px-5 py-10 shadow-2xl outline-4 -outline-offset-8 md:mx-20 lg:mx-50 lg:px-20">
          <div className="bg-orange outline-orange mb-8 flex h-30 w-80 flex-col items-center rounded-full outline-8 outline-offset-8">
            <img
              className="h-full w-full px-10 py-5"
              src={logo}
              alt="cinema"
              width={114}
              height={24}
            />
          </div>
          <h1 className="my-10 text-3xl font-extrabold tracking-wider md:text-4xl lg:text-5xl">
            Confirmation Order
          </h1>
          <div className="mb-10 flex w-full flex-col gap-4">
            <span className="flex justify-between">
              <p className="text-title-info-first tracking-wider">Movie selected</p>
              <p>{order.title}</p>
            </span>
            <span className="flex justify-between">
              <p className="text-title-info-first tracking-wider">One ticket price</p>
              <p>$10</p>
            </span>
            <span className="flex justify-between">
              <p className="text-title-info-first tracking-wider">Seat Choosed</p>
              <p>{order.seats.join(", ")}</p>
            </span>
            <span className="flex justify-between">
              <p className="text-title-info-first tracking-wider">Date and Time</p>
              <span>
                <p className="text-title-info-first tracking-wider">
                  {order.date_booking}
                </p>
                <p>{order.time_booking}</p>
              </span>
            </span>
            <span className="flex justify-between">
              <p className="text-title-info-first text-xl font-bold tracking-wider">
                Total Payment
              </p>
              <p className="text-xl font-bold">{`$${order.seats.length * 10}`}</p>
            </span>
          </div>
          <button
            className="bg-primary bg-orange active:text-orange w-full cursor-pointer rounded border py-3 font-bold text-white transition-all hover:transform active:scale-99 active:bg-transparent"
            type="button"
            onClick={() => handleConfirmButton()}
          >
            Confirm Button
          </button>
        </section>
      )}
    </>
  );
}

export default OrderSeatPage;
