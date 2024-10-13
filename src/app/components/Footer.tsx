import React from "react";

function Footer() {
  return (
    <footer className="w-full py-6 bg-white bg-opacity-70 shadow-md mt-12">
      <div className="container mx-auto text-center text-gray-700">
        <p>&copy; {new Date().getFullYear()} Wedding Memories. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
