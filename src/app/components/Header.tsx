import React from "react";

interface HeaderProps {
  scrollToGallery: () => void;
}

function Header({ scrollToGallery }: HeaderProps) {
  return (
    <header className="w-full py-6 bg-white bg-opacity-70 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-pink-600">Wedding Memories</h1>
        <nav className="space-x-4">
          <a
            href="#gallery"
            onClick={scrollToGallery}
            className="text-gray-700 hover:text-pink-600"
          >
            Gallery
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
