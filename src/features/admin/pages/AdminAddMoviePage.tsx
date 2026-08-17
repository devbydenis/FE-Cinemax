import { useForm } from "react-hook-form";
import type { FormAddMovie } from "../types/admin.types";
import InputField from "../components/InputField";
import { useCreateMovie } from "../hooks/useAdminMovies";
import { queryClient } from "@/shared/lib/queryClient";
import { adminKeys } from "../hooks/useAdminMovies";

function AddMoviePage() {
  const { register, handleSubmit, reset } = useForm<FormAddMovie>();
  const createMovieMutation = useCreateMovie();

  const onSubmit = (data: FormAddMovie) => {
    createMovieMutation.mutate(
      {
        title: data.title,
        category: data.category,
        release_date: data.releaseDate,
        duration_hour: Number(data.durationHour),
        duration_minute: Number(data.durationMinute),
        director_name: data.directorName,
        genres: data.genres,
        cast: data.cast,
        synopsis: data.synopsis,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: adminKeys.movies });
          reset();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-10 flex max-w-3/4 flex-col gap-5 rounded-lg bg-white py-12 px-9 shadow-md"
    >
      <h1 className="text-2xl font-bold">Add New Movie</h1>
      <div className="flex flex-col gap-2">
        <p className="text-title-info-first font-normal text-base">Upload Image</p>
        <label
          className="bg-orange w-24 rounded py-2 text-center text-xs font-semibold text-white"
          htmlFor="upload"
        >
          Upload
        </label>
        <input
          className="hidden"
          type="file"
          name="upload"
          id="upload"
        />
      </div>
      <InputField
        label="Title"
        name="title"
        register={register("title")}
        type="text"
        id="title"
      />
      <InputField
        label="Category"
        name="category"
        register={register("category")}
        type="text"
        id="category"
      />
      <InputField
        label="Release Date"
        name="releaseDate"
        register={register("releaseDate")}
        type="date"
        id="releaseDate"
      />
      <div className="flex flex-wrap gap-3">
        <InputField
          label="Duration Hour"
          name="durationHour"
          register={register("durationHour")}
          type="number"
          id="durationHour"
        />
        <InputField
          label="Duration Minute"
          name="durationMinute"
          register={register("durationMinute")}
          type="number"
          id="durationMinute"
        />
      </div>
      <InputField
        label="Director Name"
        name="directorName"
        register={register("directorName")}
        type="text"
        id="directorName"
      />
      <InputField
        label="Cast"
        name="cast"
        register={register("cast")}
        type="text"
        id="cast"
      />
      <InputField
        label="Genre"
        name="genres"
        register={register("genres")}
        type="text"
        id="genre"
      />
      <InputField
        label="Synopsis"
        name="synopsis"
        register={register("synopsis")}
        type="text"
        id="synopsis"
      />
      <div>
        <label className="text-title-info-first font-normal text-base">Time</label>
        <div className="flex gap-3">
          <InputField
            label=""
            name="time"
            register={register("time_start")}
            type="time"
            id="time"
            customStyle="cursor-pointer"
          />
          <div className="flex w-2 items-center font-bold">_</div>
          <InputField
            label=""
            name="time"
            register={register("time_end")}
            type="time"
            id="time"
            customStyle="cursor-pointer"
          />
        </div>
      </div>
      <button
        className="bg-orange rounded py-2 font-bold text-white transition-all active:scale-95"
        type="submit"
        disabled={createMovieMutation.isPending}
      >
        {createMovieMutation.isPending ? "Adding..." : "Add Movie"}
      </button>
    </form>
  );
}

export default AddMoviePage;
