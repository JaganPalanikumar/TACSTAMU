import React from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa";
import JoinPageImage from "@/join_page_image.jpg";

const JoinPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar selectedPage="join" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col-reverse sm:flex-row gap-8 items-center justify-center">
          <div className="space-y-4 sm:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">How to Join</h1>
            <p className="text-gray-600">
              Texas A&M Computing Society does not have any membership fees or
              applications! All we ask is that members join our Discord and
              follow our socials to stay updated on our events.
            </p>
            <p className="text-gray-600">
              Students from all majors are welcome :)
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://discord.gg/CBWn8mKFvx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-x-2 bg-primary-light border-2 border-b-4 border-r-4 border-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-primary"
              >
                <FaDiscord className="text-xl" />
                <span>Join the Discord</span>
              </a>
              <a
                href="https://www.linkedin.com/company/tamucs/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary-light border-2 border-b-4 border-r-4 border-primary text-white rounded-full hover:bg-white hover:text-primary"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/tacstamu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary-light border-2 border-b-4 border-r-4 border-primary text-white rounded-full hover:bg-white hover:text-primary"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-3xl overflow-hidden">
              <Image
                src={JoinPageImage}
                alt="TACS meeting"
                width={500}
                height={300}
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JoinPage;
