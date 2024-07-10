"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../public/logo/Faculty Horizontal_Science and Technology.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-dark to-purple-light shadow-lg">
      <div className="max-w-full mx-auto px-4 ml-10">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <Link href="/">
              <div className="flex items-center py-4">
                <Image src={logo} alt="Logo" width={50} height={50} />
                <span className="font-bold text-white text-lg ml-2">
                  HCU-SciTech <br />
                  แบบแผนการเรียน สพว.
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-1 pr-10">
            <Link
              href="/Academic2"
              className="py-4 px-2 text-white font-semibold hover:text-orangered transition duration-300"
            >
              Academic2
            </Link>
            <Link
              href="/Academic3"
              className="py-4 px-2 text-white font-semibold hover:text-orangered transition duration-300"
            >
              Academic3
            </Link>
            <Link
              href="/how-to-use"
              className="py-4 px-2 text-white font-semibold hover:text-orangered transition duration-300"
            >
              How To Use
            </Link>
            <Link
              href="/history"
              className="py-4 px-2 text-white font-semibold hover:text-orangered transition duration-300"
            >
              History
            </Link>
            <Link
              href="/Login"
              className="py-4 px-2 text-white font-semibold transition duration-300"
            >
              <button className="bg-orangered p-2 rounded-md xl:w-24 hover:bg-red-600">Login</button>
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <ul className="">
          <li>
            <Link
              href="/Academic2"
              className="block text-sm px-2 py-4 transition duration-300 text-white text-center hover:text-orangered"
            >
              Academic2
            </Link>
          </li>
          <li>
            <Link
              href="/Academic3"
              className="block text-sm px-2 py-4 transition duration-300 text-white text-center hover:text-orangered"
            >
              Academic3
            </Link>
          </li>
          <li>
            <Link
              href="/how-to-use"
              className="block text-sm px-2 py-4 transition duration-300 text-white text-center hover:text-orangered"
            >
              How To Use
            </Link>
          </li>
          <li>
            <Link
              href="/history"
              className="block text-sm px-2 py-4 transition duration-300 text-white text-center hover:text-orangered"
            >
              History
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
