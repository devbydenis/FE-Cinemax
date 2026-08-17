import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { FiSearch } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ebvid from "@/assets/ebvid-logo.svg";
import hiflix from "@/assets/hiflix-logo.svg";
import cineone21 from "@/assets/cineone21-logo.svg";
import { env } from "@/shared/config/env";
import { Modal } from "@/shared/components/Modal";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { addOrderAction } from "@/features/order/store/orderSlice";
import { useMovieDetail } from "../hooks/useMovieDetail";
import type { MovieDetail } from "../types/tmdb";

function MovieDetailPage() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { data: movie, isPending, isError } = useMovieDetail(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative grid grid-cols-1 grid-rows-2">
      <Modal
        open={showModal}
        message="You are not logged in, please login first"
        color="orange"
        onClose={() => setShowModal(false)}
      />
      <Banner movie={movie} isPending={isPending} isError={isError} />
      <SetOrder movie={movie} onRequireLogin={() => setShowModal(true)} />
    </section>
  );
}

interface BannerProps {
  movie: MovieDetail | undefined;
  isPending: boolean;
  isError: boolean;
}

function Banner({ movie, isPending, isError }: BannerProps) {
  if (isPending) {
    return <div className="flex h-160 items-center justify-center bg-black-primary">
      <p className="text-white">Loading...</p>
    </div>;
  }

  if (isError || !movie) {
    return <div className="flex h-160 items-center justify-center bg-black-primary">
      <p className="text-2xl text-red-500">Error</p>
    </div>;
  }

  return (
    <>
      <section
        className="bg-orange relative h-160 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${env.tmdbImageUrl}${movie.backdropPath})` }}
      >
        <div className="absolute inset-0 z-10 bg-black opacity-80"></div>
      </section>
      <section className="text-white-primary absolute z-20 grid place-items-center gap-10 gap-y-3 px-5 md:grid-cols-[350px_1fr] md:grid-rows-[50px_230px_100px_1fr]">
        <h1 className="mt-10 min-w-50 text-4xl font-semibold break-all text-white md:order-1 md:col-span-2 md:mt-20 md:text-4xl md:text-[4rem]">
          {movie.title}
        </h1>
        <p className="text-medium mt-4 leading-6 font-normal text-white md:order-3 md:col-span-1 md:h-full md:place-content-end md:text-lg">
          {movie.overview}
        </p>
        <ul className="mt-5 flex h-full w-full flex-wrap justify-center gap-3 md:order-4 md:justify-start">
          {movie.genres.map((genre) => (
            <li
              key={"genre" + genre.id}
              className="h-fit min-w-fit cursor-pointer rounded-3xl border border-white px-4 py-2 font-medium tracking-wider text-white uppercase"
            >
              {genre.name}
            </li>
          ))}
        </ul>
        <div className="flex w-full justify-center md:order-2 md:row-span-3 md:mt-10">
          <img
            src={`${env.tmdbImageUrl}${movie.posterPath}`}
            alt="movie-poster"
            className="w-80 rounded-2xl shadow-md"
          />
        </div>
        <div className="h-60 w-full place-content-start md:order-5">
          <ul className="grid-col-6 flex grid-flow-col grid-rows-[80px_1fr] flex-col items-start justify-start gap-x-10 gap-y-7 md:grid md:gap-y-0">
            <li className="col-span-2 md:text-white">
              <h2 className="text-lg font-light">Release Date</h2>
              <p className="text-xl leading-7 font-semibold">{movie.releaseDate}</p>
            </li>
            <li className="col-span-2 md:text-white">
              <h2 className="text-lg font-light">Directed By</h2>
              <p className="text-xl leading-7 font-semibold">
                {movie.directors[0] ?? "Unknown"}
              </p>
            </li>
            <li className="col-span-4 md:text-white">
              <h2 className="text-lg font-light">Duration</h2>
              <p className="text-xl leading-7 font-semibold">
                {movie.runtime} minutes
              </p>
            </li>
            <li className="col-span-4 md:text-white">
              <h2 className="text-lg font-light">Cast</h2>
              <p className="text-xl leading-7 font-semibold">
                {movie.casts.join(", ")}
              </p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

interface SetOrderProps {
  movie: MovieDetail | undefined;
  onRequireLogin: () => void;
}

function SetOrder({ movie, onRequireLogin }: SetOrderProps) {
  const { register, handleSubmit, control } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const user = useAppSelector((state) => state.user.user);

  const onSubmit = (data: FieldValues) => {
    if (!user.isLogin) {
      onRequireLogin();
      return;
    }

    dispatch(
      addOrderAction({
        userId: user.id,
        orderId: nanoid(),
        title: movie?.title ?? "",
        cinema: data.cinema,
        date_booking: data.date.toISOString().split("T")[0],
        time_booking: data.time.toLocaleString().split(",")[1],
        location: data.location,
      }),
    );
    navigate(`/order/seat/${param.id}`);
  };

  return (
    <section className="my-[5rem] px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
      >
        <h2 className="text-white-primary col-span-3 text-4xl leading-7 font-bold">
          Book Tickets
        </h2>
        <div className="choose-date col-span-2 flex flex-col md:col-span-1">
          <label
            className="text-white-primary mb-3 text-lg font-semibold"
            htmlFor="date"
          >
            Choose Date
          </label>
          <div className="border-white-primary flex items-center gap-4 rounded-full border-2 px-5 py-3 text-white">
            <FiSearch />
            <label htmlFor="date"></label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  className="datepicker-input mr-5 w-full cursor-pointer text-white outline-none"
                  onChange={(date) => field.onChange(date)}
                  dateFormat={"dd/MM/yyyy"}
                  placeholderText="Pilih Tanggal"
                />
              )}
            />
          </div>
        </div>
        <div className="choose-time col-span-2 md:col-span-1">
          <h2 className="text-white-primary mb-3 text-lg font-semibold">
            Choose Time
          </h2>
          <div className="border-white-primary flex items-center gap-4 rounded-full border-2 px-5 py-3 text-white">
            <FiSearch />
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="datepicker-input mx-5 w-full cursor-pointer text-white outline-none"
                  selected={field.value}
                  dateFormat={"HH:mm"}
                  onChange={(time) => field.onChange(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  placeholderText="Pilih Waktu"
                />
              )}
            />
          </div>
        </div>
        <div className="choose-location col-span-2 md:col-span-1">
          <h2 className="text-white-primary mb-3 text-lg font-semibold">
            Choose Location
          </h2>
          <div className="border-white-primary flex items-center gap-4 rounded-full border-2 px-5 py-3 text-white">
            <FiSearch />
            <select
              className="w-full cursor-pointer outline-none"
              {...register("location")}
              id="location"
            >
              <option className="text-black" value="Jakarta">Jakarta</option>
              <option className="text-black" value="Bogor">Bogor</option>
              <option className="text-black" value="Depok">Depok</option>
              <option className="text-black" value="Tangerang">Tangerang</option>
              <option className="text-black" value="Bekasi">Bekasi</option>
            </select>
          </div>
        </div>
        <div className="choose-cinema col-span-2 md:col-span-3">
          <h2 className="text-white-primary mb-3 text-lg font-semibold">
            Choose Cinema
          </h2>
          <div className="flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-10">
            <label
              className="group has-checked:bg-orange flex h-35 w-3/4 cursor-pointer items-center justify-center rounded bg-gray-300 p-3 opacity-50 transition-all has-checked:opacity-100 md:w-60"
              htmlFor="ebvid"
            >
              <img className="aspect-auto" src={ebvid} alt="ebvid" />
              <input
                className="hidden"
                type="radio"
                id="ebvid"
                value="ebvid"
                {...register("cinema")}
              />
            </label>
            <label
              className="group has-checked:bg-orange flex h-35 w-3/4 cursor-pointer items-center justify-center rounded bg-gray-300 p-3 opacity-50 transition-all has-checked:opacity-100 md:w-60"
              htmlFor="hiflix"
            >
              <img className="aspect-auto" src={hiflix} alt="hiflix" />
              <input
                className="hidden"
                type="radio"
                id="hiflix"
                value="hiflix"
                {...register("cinema")}
              />
            </label>
            <label
              className="group has-checked:bg-orange flex h-35 w-3/4 cursor-pointer items-center justify-center rounded bg-gray-300 p-3 opacity-50 transition-all has-checked:opacity-100 md:w-60"
              htmlFor="cineone21"
            >
              <img className="aspect-auto" src={cineone21} alt="cineone21" />
              <input
                className="hidden"
                type="radio"
                id="cineone21"
                value="cineone21"
                {...register("cinema")}
              />
            </label>
          </div>
        </div>
        <button
          className="bg-orange col-span-2 mx-auto mt-10 w-40 rounded-xl py-3 text-white uppercase transition-all active:scale-95 md:col-span-3"
          type="submit"
        >
          book now
        </button>
      </form>
    </section>
  );
}

export default MovieDetailPage;
