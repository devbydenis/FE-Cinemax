import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="my-20 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="border-orange bg-orange w-fit cursor-pointer rounded-full border-2 px-4 py-4 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FaArrowLeft />
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`border-orange w-fit cursor-pointer rounded-full border-2 px-5 py-3 text-lg font-bold ${
            pageNumber === page ? "bg-orange text-white" : "text-orange"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className="border-orange bg-orange w-fit cursor-pointer rounded-full border-2 px-4 py-4 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
