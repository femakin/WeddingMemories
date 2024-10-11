import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiUpload } from 'react-icons/fi'; // Upload icon for the button

interface UploadSectionProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadFile: () => void;
  uploading: boolean;
  url: string | null;
}

function UploadSection({ handleChange, uploadFile, uploading, url }: UploadSectionProps) {
  return (
    <motion.div
      className="bg-white bg-opacity-70 p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto mb-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.label
        htmlFor="file-upload"
        className="block text-xl font-semibold text-gray-700 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        🌟 Upload a memorable moment: 🌟
      </motion.label>

      <motion.input
        id="file-upload"
        type="file"
        onChange={handleChange}
        className="block w-full py-3 px-4 mb-5 border-2 border-dashed border-pink-400 rounded-lg text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
      />

      <motion.button
        disabled={uploading}
        onClick={uploadFile}
        className={`w-full py-3 px-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
          uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
        }`}
        aria-busy={uploading}
        aria-label="Upload file"
        whileHover={uploading ? {} : { scale: 1.05 }}
      >
        <FiUpload className="text-2xl" />
        <span>{uploading ? "Uploading..." : "Upload"}</span>
      </motion.button>

      {url && (
        <motion.div
          className="mt-8 relative w-full h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src={url}
            alt="Latest uploaded image"
            layout="fill"
            className="rounded-xl shadow-lg object-cover"
          />
        </motion.div>
      )}
    </motion.div>
  );
}

export default UploadSection;
