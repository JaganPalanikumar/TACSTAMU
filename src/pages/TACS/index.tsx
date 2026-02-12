import Navbar from "./components/Navbar";
import Link from "next/link";
import Image from "next/image";
import StarIcon from "@/star_icon.png";
import CursorIcon from "@/cursor_icon.png";
import MicrophoneIcon from "@/microphone_icon.png";
import SocialIcon from "@/social_icon.png";
import WorkshopsIcon from "@/workshops_icon.png";

import ImageCarousel from "./components/ImageCarousel";
import SponsorCarousel from "./components/SponsorCarousel";
import Footer from "./components/Footer";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-4xl sm:text-6xl font-bold text-primary mb-4">
            <h1 className="mb-2">Texas A&M</h1>
            <h1>Computing Society</h1>
          </div>

          <div className="relative hidden sm:block">
            <Image
              src={StarIcon}
              alt="Star Icon"
              className="absolute left-10"
              width={60}
              height={50}
            />
            <Image
              src={StarIcon}
              alt="Star Icon"
              className="absolute bottom-10 right-10"
              width={60}
              height={50}
            />
            <Image
              src={StarIcon}
              alt="Star Icon"
              className="absolute bottom-0 left-20"
              width={60}
              height={50}
            />
            <Image
              src={CursorIcon}
              alt="Cursor Icon"
              className="absolute top-7 right-20"
              width={100}
              height={50}
            />
          </div>

          <h2 className="text-xl sm:text-2xl max-w-lg mx-auto text-gray-600 mb-6">
            Official ACM Chapter @ Texas A&M University
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link
              href="/b4g"
              className="bg-white border-2 border-b-4 border-r-4 border-primary text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-light hover:text-white"
            >
              Build4Good 2025
            </Link>
            <a
              href="mailto:tacs-officers@lists.tamu.edu"
              className="bg-primary-light border-2 border-b-4 border-r-4 border-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-primary"
            >
              Get in touch!
            </a>
          </div>
        </div>

        <div className="container mx-auto px-4 mb-8">
          <ImageCarousel />
        </div>

        <div className="container mx-auto px-4 mb-8">
          <SponsorCarousel />
        </div>

        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            What We Do
          </h2>

          <div className="sm:grid sm:grid-cols-2 gap-8 space-y-8 md:space-y-0 md:flex  justify-center">
            {[
              {
                icon: MicrophoneIcon,
                title: "Tech Talks",
                description:
                  "See industry speakers talk about what's cool in the CS world.",
              },
              {
                icon: SocialIcon,
                title: "Socials",
                description:
                  "Get to know your peers and connect with like-minded people while having fun!",
              },
              {
                icon: WorkshopsIcon,
                title: "Workshops",
                description:
                  "Learn industry-relevant skills from experienced students and company speakers.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-64 min-h-64 border-2 border-primary-light border-r-4 border-b-4 rounded-2xl p-6 text-center flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={item.icon}
                      alt={`${item.title} icon`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="text-primary font-bold text-xl mb-2">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <Link
            href="/events"
            className="bg-primary-light border-2 border-b-4 border-r-4 border-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-primary"
          >
            See our past events
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
