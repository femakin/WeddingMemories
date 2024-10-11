import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface UploadSectionProps {
  onUpload: (file: File) => void;
  uploading: boolean;
  url: string;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onUpload, uploading, url }) => {
  const [file, setFile] = useState<File | null>(null);

  // Handles file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  // Calls the upload function when the upload button is clicked
  const handleUpload = () => {
    if (file) {
      onUpload(file);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <motion.div
      className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md mb-12 w-full max-w-md"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor="file-upload" className="block mb-2 font-semibold">
        Select a file to upload:
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleChange}
        className="block mb-4 w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <button
        disabled={uploading}
        onClick={handleUpload}
        className={`w-full py-2 px-4 rounded-lg text-white font-bold transition duration-300 ${
          uploading ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
        }`}
        aria-busy={uploading}
        aria-label="Upload file"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {url && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={url} alt="Latest uploaded image" fill className="rounded-lg shadow-lg" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default UploadSection;
