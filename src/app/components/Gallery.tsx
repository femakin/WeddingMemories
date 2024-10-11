import { motion } from "framer-motion";
import ImageCard from "./ImageCard";
import Pagination from "./Pagination";

interface GalleryProps {
  images: string[];
  loading: boolean;
  currentPage: number;
  imagesPerPage: number;
  paginate: (pageNumber: number) => void;
  downloadImage: (imageUrl: string, fileName: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  loading,
  currentPage,
  imagesPerPage,
  paginate,
  downloadImage,
}) => {
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <motion.div
      className="p-6 w-full max-w-screen-xl bg-white bg-opacity-70 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shared Memories</h2>
      {loading ? (
        <p className="text-center text-lg" role="status">
          Loading images...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-16">
          {currentImages.map((imgUrl, idx) => (
            <ImageCard
              key={idx}
              imgUrl={imgUrl}
              index={idx}
              downloadImage={downloadImage}
            />
          ))}
        </div>
      )}
      <Pagination
        totalImages={images.length}
        imagesPerPage={imagesPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </motion.div>
  );
};

export default Gallery;
