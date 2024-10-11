"use client";

import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { pinata } from "../../utils/config";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Gallery from "./components/Gallery";
import UploadSection from "./components/UploadSection";
import ImageCard from "./components/ImageCard";

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


      <Gallery scrollToGallery={scrollToGallery} />



      <UploadSection handleChange={handleChange} uploadFile={uploadFile} url={url} uploading={uploading}/>

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

          <ImageCard currentImages={currentImages} downloadImage={downloadImage} />
        )}

       <Pagination images={images} paginate={paginate} imagesPerPage={imagesPerPage} currentPage={currentPage} />
      </motion.div>

      <Footer />
    </main>
  );
}