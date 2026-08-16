import { HiArrowLeft, HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl text-center">
        <div className="relative mb-8">
          <h1 className="bg-gradient-to-r from-orange-500 to-orange bg-clip-text text-8xl font-bold text-transparent sm:text-9xl md:text-[12rem] lg:text-[16rem]">
            404
          </h1>
          <div className="text-orange-300 absolute inset-0 animate-pulse text-8xl font-bold opacity-20 sm:text-9xl md:text-[12rem] lg:text-[16rem]">
            404
          </div>
        </div>
        <div className="mb-12 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl lg:text-5xl">
              Oops! Page Not Found
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
              The page you're looking for seems to have vanished into the digital void.
              Don't worry, even the best explorers sometimes take a wrong turn.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to={"/"}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-600 to-orange px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto w-full"
          >
            <span className="relative flex items-center justify-center gap-2">
              <HiHome className="h-5 w-5" />
              <span className="text-base sm:text-lg">Go Home</span>
            </span>
          </Link>
          <Link
            to={"/"}
            className="group rounded-full border-2 border-gray-300 px-8 py-3 font-medium text-gray-600 transition-all duration-300 hover:scale-105 hover:border-orange-300 hover:text-orange-600 focus:outline-none focus:ring-4 focus:ring-gray-200 sm:w-auto w-full"
          >
            <span className="flex items-center justify-center gap-2">
              <HiArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-base sm:text-lg">Go Back</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
