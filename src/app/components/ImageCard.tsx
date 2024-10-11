import { motion } from "framer-motion";
import Image from "next/image";

interface ImageCardProps {
  imgUrl: string;
  index: number;
  downloadImage: (imageUrl: string, fileName: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imgUrl, index, downloadImage }) => (
  <motion.div
    className="rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Image
      src={imgUrl}
      alt={`Shared memory ${index + 1}`}
      width={300}
      height={300}
      className="object-cover w-full h-full rounded-lg"
    />
    <button
      onClick={() => downloadImage(imgUrl, `image-${index + 1}.jpg`)}
      className="w-full bg-blue-500 text-white py-2 rounded-b-lg hover:bg-blue-600 transition duration-300"
      aria-label={`Download image ${index + 1}`}
    >
      Download
    </button>
  </motion.div>
);

export default ImageCard;
