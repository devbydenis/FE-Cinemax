
import { FaAngleLeft, FaAngleRight, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import {Link} from "react-router-dom";
// import { BASE_URL_IMG } from "../services/service";
// import { useSelector } from "react-redux";


function ListMoviePage() {
  // const { movies } = useSelector((state: { admin: { movies: movies[] } }) => state.admin.movies)
  return (
    <>
      <section className="mt-10 bg-white rounded-lg mx-10 p-10">
        <div className="flex flex-wrap justify-between mb-12">
          <h1 className="text-2xl font-bold">List Movie</h1>
          <div className="flex flex-wrap gap-5">
            <input
              className="bg-gray-200 focus:outline-none px-5 rounded-lg"
              type="date"
              name="filterDate"
              id="filterDate"
            />
            <Link
              to={"/admin/add-movie"}
              className="w-36 bg-orange-400 text-white font-bold px-6 py-3 rounded-lg active:scale-95 transition-all"
            >
              Add Movies
            </Link>
          </div>
        </div>
        <section className="">
          <table className="bg-white pt-10 min-w-full divide-y-2 divide-gray-200">
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
              {/* {
               movies && movies.map((movie) => (
                  <DataRow 
                    key={movie.id} 
                    id={movie.id} 
                    thumbnail={movie.poster_path} 
                    name={movie.title} 
                    category={movie.genre_ids} 
                    releaseDate={movie.release_date} 
                    duration={Math.floor(Math.random() * 100) > 60 ? '2h ' + Math.floor(Math.random() * 100)%60 + 'min' : '1h ' + Math.floor(Math.random() * 100)%60 + 'min'} 
                  />
                ))
              } */}
              {
                <DataRow />
              }
            </tbody>
          </table>
        </section>
        <PaginationTable />
      </section>
    </>
  );
}

type DataRowType = {
  id?: number;
  thumbnail?: string;
  name?: string;
  category?: string;
  releaseDate?: string;
  duration?: string;
}
function DataRow({ id, thumbnail, name, category, releaseDate, duration }: DataRowType) {
  return (
    <tr>
      <td className="text-left py-2 whitespace-nowrap">{id || '1'}</td>
      <td className="py-2 whitespace-nowrap">
        <img className="mx-auto w-12 h-12 rounded-lg" src={thumbnail || 'https://picsum.photos/200/200'} alt="thumbnail" />
      </td>
      <td className="text-left py-2 whitespace-nowrap text-gray-800">
        {name || 'John Wick'}
      </td>
      <td className="text-left py-2 whitespace-nowrap text-gray-700">
        {category || 'adult'}
      </td>
      <td className="text-left py-2 whitespace-nowrap text-gray-700">
        {releaseDate || '09/09/2024'}
      </td>
      <td className="text-left py-2 whitespace-nowrap text-gray-700">
        {duration || '2H 20m'}
      </td>
      <td className=" flex gap-1">
        <button
          className="text-gray-400 rounded p-1 my-2 active:scale-95"
          type="button"
        >
          <FaEye />
        </button>
        <button
          className="text-blue-500 rounded p-1 my-2 active:scale-95"
          type="button"
        >
          <FaEdit />
        </button>
        <button
          className="text-red-500 rounded p-1 my-2 active:scale-95"
          type="button"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

function PaginationTable() {
  return (
    <ul className="flex justify-center gap-1 text-gray-900 mt-20">
      <li>
        <a
          href="#"
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
          aria-label="Previous page"
        >
          <FaAngleLeft />
        </a>
      </li>
    
      {
        [1, 2, 3, 4].map((page) => {
          return (
            <ButtonPagination
              key={"button" + page}
              page={page}
            />
          )
        })
      }
    
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
    <button className={`block size-8 rounded border border-gray-200 focus:bg-orange focus:text-white text-center text-sm/8 font-medium transition-colors hover:bg-gray-50`}>
      {props.page}
    </button>
  );
}

export default ListMoviePage;
