import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageCardProps {
  downloadImage: (url: string, filename: string) => void;
  currentImages: string[];
}

function ImageCard({ downloadImage, currentImages }: ImageCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-16">
      {currentImages.map((imgUrl, idx) => (
        <motion.div
          key={idx}
          className="rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={imgUrl}
            alt={`Shared memory ${idx + 1}`}
            width={300}
            height={300}
            className="object-cover w-full h-full rounded-lg"
          />
          <button
            onClick={() => downloadImage(imgUrl, `image-${idx + 1}.jpg`)}
            className="w-full bg-blue-500 text-white py-2 rounded-b-lg hover:bg-blue-600 transition duration-300"
            aria-label={`Download image ${idx + 1}`}
          >
            Download
          </button>
        </motion.div>
      ))}
    </div>
  );
}

export default ImageCard;