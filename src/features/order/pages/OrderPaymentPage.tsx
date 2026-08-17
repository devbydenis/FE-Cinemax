import { useState } from "react";
import gpay from "@/assets/gpay.svg";
import visa from "@/assets/visa.svg";
import dana from "@/assets/dana.svg";
import bca from "@/assets/bca.svg";
import bri from "@/assets/bri.svg";
import ovo from "@/assets/ovo.svg";
import paypal from "@/assets/paypal.svg";
import gopay from "@/assets/gopay.svg";
import { useNavigate, useParams } from "react-router-dom";
import { TimelineProcess } from "@/shared/components/TimelineProcess";
import { useForm, type FieldValues } from "react-hook-form";
import { addOrderAction } from "../store/orderSlice";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import { queryClient } from "@/shared/lib/queryClient";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { profileKeys } from "@/features/profile/api/keys";
import type { CreateTransactionPayload } from "../api/transactions";
import type { HistoryStatus } from "@/shared/types/history";

function OrderPaymentPage() {
  const [isModalShow, setIsModalShow] = useState(false);

  return (
    <section className="relative flex flex-col items-center bg-black-primary py-10">
      {isModalShow && <div className="absolute inset-0 bg-black opacity-50"></div>}
      <TimelineProcess />
      <PaymentInfo />
      <PaymentMethod setIsModalShow={setIsModalShow} />
      {isModalShow && <PaymentModal />}
    </section>
  );
}

function PaymentInfo() {
  const order = useAppSelector((state) => state.order.order);
  return (
    <div className="payment-info my-7 w-6/7">
      <h1 className="mb-5 text-2xl font-bold text-white-primary">Payment Info</h1>
      <div className="flex flex-col gap-6">
        <div className="border-orange/70 border-b-2 tracking-[.75px]">
          <p className="text-secondary font-semibold uppercase text-white-primary">
            date &amp; time
          </p>
          <p className="my-2 text-gray-300">
            {order.date_booking} & {order.time_booking}
          </p>
        </div>
        <div className="border-orange/70 border-b-2 tracking-[.75px]">
          <p className="text-secondary font-semibold uppercase text-white-primary">
            movie title
          </p>
          <p className="my-2 text-gray-300">{order.title}</p>
        </div>
        <div className="border-orange/70 border-b-2 tracking-[.75px]">
          <p className="text-secondary font-semibold uppercase text-white-primary">
            cinema name
          </p>
          <p className="my-2 text-gray-300">{order.cinema}</p>
        </div>
        <div className="border-orange/70 border-b-2 tracking-[.75px]">
          <p className="text-secondary font-semibold uppercase text-white-primary">
            number of tickets
          </p>
          <p className="my-2 text-gray-300">
            {order.seats.length} pieces {`(${order.seats.join(", ")})`}
          </p>
        </div>
        <div className="border-orange/70 border-b-2 tracking-[.75px]">
          <p className="text-secondary font-semibold uppercase text-white-primary">
            total payment
          </p>
          <p className="my-2 text-gray-300">${order.seats.length * 10}</p>
        </div>
      </div>
    </div>
  );
}

interface PaymentMethodProps {
  setIsModalShow: (value: boolean) => void;
}

function PaymentMethod({ setIsModalShow }: PaymentMethodProps) {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldValues) => {
    dispatch(addOrderAction(data));
    setIsModalShow(true);
  };

  const paymentMethods = [
    { id: "gpay", src: gpay, alt: "gpay" },
    { id: "visa", src: visa, alt: "visa" },
    { id: "gopay", src: gopay, alt: "gopay" },
    { id: "paypal", src: paypal, alt: "paypal" },
    { id: "dana", src: dana, alt: "dana" },
    { id: "bca", src: bca, alt: "bca" },
    { id: "bri", src: bri, alt: "bri" },
    { id: "ovo", src: ovo, alt: "ovo" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-10 mt-10 w-6/7 rounded-lg"
    >
      <div className="payment-method">
        <h1 className="mb-5 text-2xl font-bold text-white-primary">
          Payment Method
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className="has-checked:outline-orange flex w-28 cursor-pointer flex-col items-center justify-center rounded bg-white/80 px-3 py-3 outline outline-gray-400 has-checked:outline-4"
              htmlFor={method.id}
            >
              <img className="mx-auto" src={method.src} alt={method.alt} />
              <input
                className="hidden"
                type="radio"
                {...register("payment")}
                id={method.id}
                defaultValue={method.id}
              />
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="bg-orange active:border-orange active:text-orange mt-10 block w-full cursor-pointer rounded border-2 border-orange py-3 text-center font-bold text-white transition-all active:scale-99 active:bg-black-primary"
      >
        Pay Your Order
      </button>
    </form>
  );
}

function PaymentModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = useAppSelector((state) => state.order.order);
  const dispatch = useAppDispatch();
  const createTransactionMutation = useCreateTransaction();

  const buildPayload = (status: HistoryStatus): CreateTransactionPayload => ({
    user_id: order.userId,
    cinema: order.cinema,
    movie_name: order.title,
    payment_method: order.payment,
    date_booking: order.date_booking,
    time_booking: order.time_booking,
    total_price: order.totalPrice,
    location: order.location,
    seats: order.seats,
    status,
  });

  const handleCheckPayment = () => {
    dispatch(addOrderAction({ ...order, statusPayment: true }));
    createTransactionMutation.mutate(buildPayload("success"), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: profileKeys.history });
        navigate(`/order/ticket/${id}`);
      },
    });
  };

  const handlePayLater = () => {
    dispatch(addOrderAction({ ...order, statusPayment: false }));
    createTransactionMutation.mutate(buildPayload("pending"), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: profileKeys.history });
        navigate(`/profile/history`);
      },
    });
  };

  return (
    <section className="payment-modal absolute top-[25%] right-0 left-0 m-6 rounded-lg bg-white-primary px-6 py-6 sm:mx-auto sm:w-4/5 md:w-2/3">
      <h2 className="mt-3 mb-8 text-center text-3xl font-bold text-white-primary">
        Payment Info
      </h2>
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-secondary text-sm font-normal">
            No. Rekening Virtual :
          </p>
          <span className="flex items-center justify-between">
            <p className="text-lg font-bold">12321328913829724</p>
            <button type="button" className="outline-primary rounded px-3 py-1 outline active:scale-95">
              Copy
            </button>
          </span>
        </div>
        <div>
          <p className="text-secondary text-sm font-normal">Total Payment</p>
          <p className="text-primary mt-2 font-bold">${order.totalPrice}</p>
        </div>
        <p className="text-secondary text-sm leading-8 font-normal tracking-[.75px]">
          Pay this payment bill before it is due, on{" "}
          <span className="text-red-500">July 28, 2025</span>. If the bill has
          not been paid by the specified time, it will be forfeited
        </p>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="bg-primary text-orange active:bg-orange rounded py-2 text-center font-bold outline-2 transition-all active:scale-99 active:text-white"
            disabled={createTransactionMutation.isPending}
            onClick={handleCheckPayment}
          >
            {createTransactionMutation.isPending ? "Processing..." : "Check Payment"}
          </button>
          <button
            type="button"
            className="outline-primary bg-orange outline-orange active:outline-orange active:text-orange rounded py-2 text-center font-bold text-white outline-2 transition-all active:scale-99 active:bg-white"
            onClick={handlePayLater}
          >
            Pay Later
          </button>
        </div>
      </div>
    </section>
  );
}

export default OrderPaymentPage;
