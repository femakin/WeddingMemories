import React from 'react';

interface PaginationProps {
  images: string[];
  imagesPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

function Pagination({ images, imagesPerPage, currentPage, paginate }: PaginationProps) {
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Limit the number of pagination buttons to a maximum (e.g., 10)
  const maxVisibleButtons = 10;
  const startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
  const endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

  return (
    <div className="mt-8 flex justify-center gap-4 py-8">
      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => (
        <button
          key={startPage + idx}
          onClick={() => paginate(startPage + idx)}
          className={`px-4 py-2 rounded-full ${
            currentPage === startPage + idx
              ? "bg-pink-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-pink-400 hover:text-white"
          } transition duration-300`}
          aria-label={`Go to page ${startPage + idx}`}
        >
          {startPage + idx}
        </button>
      ))}
    </div>
  );
}

export default Pagination;