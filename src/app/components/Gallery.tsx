import React from "react";
import { motion } from "framer-motion";

interface GalleryProps {
  scrollToGallery: () => void;
}

function Gallery({ scrollToGallery }: GalleryProps) {
  return (
    <section className="w-full h-96 bg-white bg-opacity-70 flex flex-col justify-center items-center text-center p-6 mb-6 rounded-lg shadow-lg relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-300 to-blue-200 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <motion.h1
        className="text-5xl font-bold text-pink-600 mb-4 relative z-10"
        aria-label="Gallery Hero Title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Capture the Magic
      </motion.h1>
      <motion.p
        className="text-xl text-gray-700 relative z-10"
        aria-label="Gallery Hero Description"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Share every laugh, dance, and unforgettable moment at the wedding! <br />
      </motion.p>
      <motion.div
        className="relative z-10 mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <button
          onClick={scrollToGallery}
          className="bg-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-pink-600 transition duration-300"
        >
          View the Gallery
        </button>
      </motion.div>
    </section>
  );
}

export default Gallery;
