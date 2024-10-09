"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // For animations
import { pinata } from "../../utils/config";

export default function Home() {
	const [file, setFile] = useState<File | null>(null);
	const [url, setUrl] = useState<string>("");
	const [uploading, setUploading] = useState<boolean>(false);
	const [images, setImages] = useState<string[]>([]); // State to hold all image URLs
	const [loadingImages, setLoadingImages] = useState<boolean>(false);


  	const [currentPage, setCurrentPage] = useState<number>(1);
	const imagesPerPage = 4;

	// Fetch all uploaded images and render them
	const fetchImages = async () => {
		setLoadingImages(true);
		try {
			const filesRequest = await fetch("/api/listfiles"); // Fetch the list of files from your API
			const files = await filesRequest.json();
console.log(files, 'filesss'
)

			// Fetch signed URLs for each file
			const urls = await Promise.all(
				files?.files?.map(async (file: { cid: string; }) => {
					const urlRequest = await fetch("/api/sign", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ cid: file.cid }),
					});
					const signedUrl = await urlRequest.json();
					return signedUrl;
				})
			);

			// Set the image URLs to the state
			setImages(urls);
			setLoadingImages(false);
		} catch (e) {
			console.log("Error fetching images:", e);
			setLoadingImages(false);
		}
	};

	// Fetch images when the component mounts
	useEffect(() => {
		fetchImages();
	}, []);

	const uploadFile = async () => {
		if (!file) {
			alert("No file selected");
			return;
		}

		try {
			setUploading(true);
			const keyRequest = await fetch("/api/key");
			const keyData = await keyRequest.json();
			const upload = await pinata.upload.file(file).key(keyData.JWT);

			const urlRequest = await fetch("/api/sign", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ cid: upload.cid }),
			});
			const url = await urlRequest.json();
			setUrl(url);
			setUploading(false);
			fetchImages(); // Refresh images after upload
		} catch (e) {
			console.log(e);
			setUploading(false);
			alert("Trouble uploading file");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFile(e.target?.files?.[0] || null);
	};


  	// Function to download an image
const downloadImage = (url: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
};


	// Get current images for the current page
	const indexOfLastImage = currentPage * imagesPerPage;
	const indexOfFirstImage = indexOfLastImage - imagesPerPage;
	const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
			{/* Hero Section */}
			<section className="w-full h-72 bg-white bg-opacity-70 flex flex-col justify-center items-center text-center p-6 mb-12 rounded-lg shadow-lg">
				<h1 className="text-5xl font-bold text-pink-600 mb-4">Wedding Memories</h1>
				<p className="text-xl text-gray-700">Capture the moment and share your photos with everyone!</p>
			</section>

			{/* Upload Section */}
			<div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md mb-12 w-full max-w-md">
				<input
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
				>
					{uploading ? "Uploading..." : "Upload"}
				</button>

				{/* Display the latest uploaded image */}
				{url && (
					<motion.div
						className="mt-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<Image src={url} alt="Uploaded Image" width={300} height={300} className="rounded-lg shadow-lg" />
					</motion.div>
				)}
			</div>

			{/* Image Gallery Section */}
			<div className="p-6 w-full max-w-screen-xl bg-white bg-opacity-70 rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Uploaded Images</h2>
				{loadingImages ? (
					<p className="text-center text-lg">Loading images...</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-16">
						{currentImages?.map((imgUrl, idx) => (
							<motion.div
								key={idx}
								className=" rounded-lg shadow-lg"
								whileHover={{ scale: 1.05 }}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
							>
								<Image
									src={imgUrl}
									alt={`Image ${idx}`}
									width={300}
									height={300}
									className="object-cover w-full h-full"
								/>

              <button
									onClick={() => downloadImage(imgUrl, `image-${idx}.jpg`)}
									className="w-full py-2 mt-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
								>
									Download
								</button>
							</motion.div>
						))}
					</div>



				)}

        	{/* Pagination Controls */}
						<div className="flex justify-center mt-6 py-12 ">
							{Array.from({ length: Math.ceil(images.length / imagesPerPage) }, (_, index) => (
								<button
									key={index + 1}
									onClick={() => paginate(index + 1)}
									className={`mx-1 px-3 py-1 rounded ${
										currentPage === index + 1 ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-800"
									}`}
								>
									{index + 1}
								</button>
							))}
						</div>
			</div>
		</main>
	);
}
