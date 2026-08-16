import { FaAngleLeft, FaAngleRight, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAdminMovies } from "../hooks/useAdminMovies";

function ListMoviePage() {
  const { data: movies, isPending } = useAdminMovies();

  return (
    <section className="mx-10 mt-10 rounded-lg bg-white p-10">
      <div className="mb-12 flex flex-wrap justify-between">
        <h1 className="text-2xl font-bold">List Movie</h1>
        <div className="flex flex-wrap gap-5">
          <input
            className="rounded-lg bg-gray-200 px-5 focus:outline-none"
            type="date"
            name="filterDate"
            id="filterDate"
          />
          <Link
            to={"/admin/add-movie"}
            className="w-36 rounded-lg bg-orange-400 px-6 py-3 font-bold text-white transition-all active:scale-95"
          >
            Add Movies
          </Link>
        </div>
      </div>
      <section className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white pt-10">
          <thead>
            <tr>
              <th className="py-2 text-left whitespace-nowrap">No</th>
              <th className="py-2 text-center whitespace-nowrap">Thumbnail</th>
              <th className="py-2 text-left whitespace-nowrap">Movie Name</th>
              <th className="py-2 text-left whitespace-nowrap">Category</th>
              <th className="py-2 text-left whitespace-nowrap">Release Date</th>
              <th className="py-2 text-left whitespace-nowrap">Duration</th>
              <th className="py-2 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isPending ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : movies && movies.length > 0 ? (
              movies.map((movie, index) => (
                <DataRow
                  key={movie.id}
                  id={index + 1}
                  name={movie.title}
                  category={movie.category}
                  releaseDate={movie.release_date}
                  duration={`${movie.duration_hour}h ${movie.duration_minute}m`}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No movies yet. Add your first movie.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <PaginationTable />
    </section>
  );
}

interface DataRowProps {
  id: number;
  thumbnail?: string;
  name: string;
  category: string;
  releaseDate: string;
  duration: string;
}

function DataRow({ id, thumbnail, name, category, releaseDate, duration }: DataRowProps) {
  return (
    <tr>
      <td className="py-2 text-left whitespace-nowrap">{id}</td>
      <td className="py-2 whitespace-nowrap">
        <img
          className="mx-auto h-12 w-12 rounded-lg"
          src={thumbnail || "https://picsum.photos/200/200"}
          alt="thumbnail"
        />
      </td>
      <td className="py-2 text-left whitespace-nowrap text-gray-800">{name}</td>
      <td className="py-2 text-left whitespace-nowrap text-gray-700">{category}</td>
      <td className="py-2 text-left whitespace-nowrap text-gray-700">{releaseDate}</td>
      <td className="py-2 text-left whitespace-nowrap text-gray-700">{duration}</td>
      <td className="flex gap-1">
        <button
          className="my-2 rounded p-1 text-gray-400 active:scale-95"
          type="button"
        >
          <FaEye />
        </button>
        <button
          className="my-2 rounded p-1 text-blue-500 active:scale-95"
          type="button"
        >
          <FaEdit />
        </button>
        <button
          className="my-2 rounded p-1 text-red-500 active:scale-95"
          type="button"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

function PaginationTable() {
  return (
    <ul className="mt-20 flex justify-center gap-1 text-gray-900">
      <li>
        <a
          href="#"
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
          aria-label="Previous page"
        >
          <FaAngleLeft />
        </a>
      </li>
      {[1, 2, 3, 4].map((page) => (
        <ButtonPagination key={"button" + page} page={page} />
      ))}
      <li>
        <a
          href="#"
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
          aria-label="Next page"
        >
          <FaAngleRight />
        </a>
      </li>
    </ul>
  );
}

function ButtonPagination(props: { page: number }) {
  return (
    <button
      className={`block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors focus:bg-orange focus:text-white hover:bg-gray-50`}
    >
      {props.page}
    </button>
  );
}

export default ListMoviePage;
