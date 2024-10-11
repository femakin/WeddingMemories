"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { pinata } from "../../utils/config";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Gallery from "./components/Gallery";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const imagesPerPage = 4;

  const galleryRef = useRef<HTMLDivElement>(null);

  const fetchImages = async () => {
    setLoadingImages(true);
    try {
      const filesRequest = await fetch("/api/listfiles");
      const files = await filesRequest.json();
      const urls = await Promise.all(
        files?.files?.map(async (file: { cid: string }) => {
          const urlRequest = await fetch("/api/sign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cid: file.cid }),
          });
          const signedUrl = await urlRequest.json();
          return signedUrl;
        }),
      );
      setImages(urls);
    } catch (e) {
      console.error("Error fetching images:", e);
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      setUploading(true);
      const keyRequest = await fetch("/api/key");
      const keyData = await keyRequest.json();
      const upload = await pinata.upload.file(file).key(keyData.JWT);
      const urlRequest = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cid: upload.cid }),
      });
      const url = await urlRequest.json();
      setUrl(url);
      fetchImages();
    } catch (e) {
      console.error("Upload error:", e);
      alert("There was an issue with the upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0] || null);
  };

  const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(imageUrl)}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
      <Header scrollToGallery={scrollToGallery} />

    {/*   <section className="w-full h-96 bg-white bg-opacity-70 flex flex-col justify-center items-center text-center p-6 mb-12 rounded-lg shadow-lg relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-300 to-blue-200 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.h1
          className="text-5xl font-bold text-pink-600 mb-4 relative z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Capture the Magic
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Share every laugh, dance, and unforgettable moment at the wedding!
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
      </section> */}

      <Gallery scrollToGallery={scrollToGallery} />

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
          onClick={uploadFile}
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

      <motion.div
        ref={galleryRef}
        className="p-6 w-full max-w-screen-xl bg-white bg-opacity-70 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shared Memories</h2>
        {loadingImages ? (
          <p className="text-center text-lg" role="status">
            Loading images...
          </p>
        ) : (
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
                  onClick={() => downloadImage(imgUrl, `image-${idx + 1}.jpg`
                  )}
                  className="w-full bg-blue-500 text-white py-2 rounded-b-lg hover:bg-blue-600 transition duration-300"
                  aria-label={`Download image ${idx + 1}`}
                >
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        )}

       <Pagination images={images} paginate={paginate} imagesPerPage={imagesPerPage} currentPage={currentPage} />
      </motion.div>

      <Footer />
    </main>
  );
}
