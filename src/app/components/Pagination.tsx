interface PaginationProps {
  totalImages: number;
  imagesPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalImages,
  imagesPerPage,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(totalImages / imagesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <div className="mt-8 flex justify-center gap-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 rounded-full ${
            currentPage === number
              ? "bg-pink-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-pink-400 hover:text-white"
          } transition duration-300`}
          aria-label={`Go to page ${number}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
