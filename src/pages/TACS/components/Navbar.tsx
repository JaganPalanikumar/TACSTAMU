import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

import tacs_logo from "/public/tacs_logo.png";

interface Props {
  selectedPage?: string;
}

const Navbar: React.FC<Props> = ({ selectedPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm shadow-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={"/TACS"} className="flex-shrink-0 flex items-center">
            <Image
              src={tacs_logo}
              alt="Your Brand Logo"
              width={130}
              height={40}
            />{" "}
            {/* Adjust width and height as needed */}
          </Link>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/TACS/join"
              className={`text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium ${selectedPage === "Join" || selectedPage === "join" ? "text-primary border-b-2 border-primary font-bold font-xl" : ""}`}
            >
              Join
            </Link>
            <Link
              href="/TACS/about"
              className={`text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium ${selectedPage === "About" || selectedPage === "about" ? "text-primary border-b-2 border-primary font-bold font-xl" : ""}`}
            >
              About
            </Link>
            <Link
              href="/TACS/events"
              className={`text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium ${selectedPage === "Events" || selectedPage === "events" ? "text-primary border-b-2 border-primary font-bold font-xl" : ""}`}
            >
              Events
            </Link>
            <Link
              href="/TACS/b4g2025"
              className={`text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium ${selectedPage === "b4g" || selectedPage === "b4g" ? "text-primary border-b-2 border-primary font-bold font-xl" : ""}`}
            >
              Build4Good
            </Link>
            <a
              href="https://discord.gg/CBWn8mKFvx"
              target="_blank"
              className="flex items-center gap-x-2 bg-white border-2 border-b-4 border-r-4 border-primary text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-light hover:text-white"
            >
              <FaDiscord className="text-xl mt-0.5" />
              <p>Join our Discord</p>
            </a>
            <Link
              href="mailto:tacs-officers@lists.tamu.edu"
              className="bg-primary-light border-2 border-b-4 border-r-4 border-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-primary"
            >
              Contact
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/join"
              className={`block text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium ${selectedPage === "Join" || selectedPage === "join" ? "text-primary font-bold font-xl" : ""}`}
            >
              Join
            </Link>
            <Link
              href="/about"
              className={`block text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium ${selectedPage === "About" || selectedPage === "about" ? "text-primary font-bold font-xl" : ""}`}
            >
              About
            </Link>
            <Link
              href="/events"
              className={`block text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium ${selectedPage === "Events" || selectedPage === "events" ? "text-primary font-bold font-xl" : ""}`}
            >
              Events
            </Link>
            <Link
              href="/b4g"
              className={`block text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium ${selectedPage === "B4G" || selectedPage === "b4g" ? "text-primary font-bold font-xl" : ""}`}
            >
              Build4Good
            </Link>
            <a
              href="https://discord.gg/CBWn8mKFvx"
              target="_blank"
              className="block bg-primary-light border-2 border-primary    text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 mt-2"
            >
              Join our Discord
            </a>
            <a
              href="mailto:tacs-officers@lists.tamu.edu"
              target="_blank"
              className="block bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600 mt-2"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
