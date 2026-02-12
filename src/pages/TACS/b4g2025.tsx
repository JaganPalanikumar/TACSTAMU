import Navbar from "./components/Navbar";
import Image from "next/image";
import B4G_Logo from "@/B4G_Logo.png";
import Challenges_Header from "@/challenges_header.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Footer from "./components/Footer";

const B4G: React.FC = () => {
  // Example schedule data
  const saturdayEvents = [
    { time: "8:00 AM", name: "Doors Open" },
    { time: "8:00-8:30 AM", name: "Breakfast" },

    { time: "8:30 AM", name: "Opening Ceremony Begins" },
    { time: "8:45 AM", name: "Team Matching + Hacking Begins!" },
    { time: "12:30 PM", name: "Lunch" },
    { time: "2:30 PM", name: "Devpost Opens" },
    { time: "3:30 PM", name: "Devpost Closes + Judging Begins" },
    { time: "4:45 PM", name: "Award Ceremony" },
    { time: "5:00 PM", name: "Distribute Shirts + Participants Leave!" },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1500 },
      items: 4,
      centerMode: false, // Or true if you want partial slides on superLarge
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 3,
      centerMode: false, // Turn off for desktop to reduce big gaps
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      centerMode: false, // Usually off for tablet
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      centerMode: false, // Definitely off for mobile
    },
  };

  const awards = [
    {
      title: "Grand Challenge",
      subtitle:
        "Best overall hack that meets all of the judging criteria: creativity, technical complexity, and societal impact",
      prizes: [
        { place: "1st Place", prize: 'Acer 27" Monitor' },
        { place: "2nd Place", prize: '15.6" portable monitor' },
        { place: "3rd Place", prize: "Amazon Echo Dot" },
      ],
    },
    {
      title: "Poker Bot Challenge",
      subtitle:
        "Create an algorithm to play against other bots in a variant of poker.",
      prizes: [
        { place: "1st Place", prize: "SIG Backpack and HRT Pokerset" },
        { place: "2nd Place", prize: "SIG Waterbottle and HRT T-Shirt" },
      ],
      extra: "https://github.com/MontgomeryBohde/Build4Good-Pokerbots",
    },
    {
      title: "Best Beginner Hack",
      subtitle:
        "Best overall hack by first time hackers. Challenge: Build a simple web app that solves a daily problem, saves time, keeps you organized, or raises awareness for a cause (e.g., to-do list, reminder, meal generator).",
      prizes: [
        { place: "1st Place", prize: "Sony Headphones" },
        { place: "2nd Place", prize: "Amazon Giftcard" },
        { place: "3rd Place", prize: "Squishmallow" },
      ],
    },
    {
      title: "Best UI/UX",
      subtitle: "Hack with best design and seamless user experience",
      prizes: [
        { place: "1st Place", prize: "Beats Studio Buds" },
        { place: "2nd Place", prize: "Desk Lamps" },
        { place: "3rd Place", prize: "Amazon Giftcard" },
      ],
    },
    {
      title: "Notion API Challenge",
      subtitle: "Most creative use of Notion API",
      prizes: [{ place: "1st Place", prize: "Notion Goody Bag" }],
    },
  ];

  // Two-column schedule with a thick pink border
  function TwoColumnSchedule() {
    return (
      <div className="w-full flex justify-center">
        <div
          className="max-w-6xl w-full border-2 border-blue-200 rounded-3xl p-6 bg-white text-[#42A9D7]"
          style={{ boxShadow: "2px 3px 5px rgba(66,169,215,0.8)" }}
        >
          {/* Header */}
          <h2 className="text-center text-[#D6B6E2] font-black text-4xl uppercase tracking-wider mb-6">
            Tentative Event Schedule
          </h2>

          {/* Schedule items */}
          <div className="space-y-4">
            {saturdayEvents.map((item, idx) => (
              <div key={idx} className="flex justify-between p-2">
                <span className="font-medium">{item.name}</span>
                <span className="font-medium">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Prize board with thick borders on each card
  function PrizeBoard() {
    return (
      <div className="max-w-7xl mx-auto p-4">
        {/* 1st Place (full-width card) */}
        <div className="bg-pink-200 border-4 border-pink-300 p-4 rounded mb-6">
          <h3 className="text-2xl font-bold mb-1">1st Place Software</h3>
          <p className="text-lg mb-2">First place software track.</p>
          <p className="font-semibold">Prize: Electric Scooter</p>
        </div>

        {/* Other prizes in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 2nd Place */}
          <div className="bg-blue-100 border-4 border-blue-300 p-4 rounded">
            <h3 className="text-xl font-bold mb-1">2nd Place Software</h3>
            <p className="mb-2">Second place software track.</p>
            <p className="font-semibold">Prize: Sony XM4 Headphones</p>
          </div>

          {/* 3rd Place */}
          <div className="bg-blue-100 border-4 border-blue-300 p-4 rounded">
            <h3 className="text-xl font-bold mb-1">3rd Place Software</h3>
            <p className="mb-2">Third place software track.</p>
            <p className="font-semibold">Prize: 165Hz Monitors</p>
          </div>

          {/* Best Design */}
          <div className="bg-yellow-100 border-4 border-yellow-300 p-4 rounded">
            <h3 className="text-xl font-bold mb-1">Best Design</h3>
            <p className="mb-2">
              Demonstrate clear design and usability in your project.
            </p>
            <p className="font-semibold">Prize: KODAK Portable Photo Printer</p>
          </div>

          {/* Best Beginner Software Hack */}
          <div className="bg-green-100 border-4 border-green-300 p-4 rounded">
            <h3 className="text-xl font-bold mb-1">
              Best Beginner Software Hack
            </h3>
            <p className="mb-2">
              Award for first-time hackers (at least 2 first-timers on a team).
            </p>
            <p className="font-semibold">Prize: JBL Clip 5 Bluetooth Speaker</p>
          </div>

          {/* American Airlines Challenge */}
          <div className="bg-purple-100 border-4 border-purple-300 p-4 rounded md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold mb-1">
              American Airlines Challenge
            </h3>
            <p className="mb-2">
              Create a solution for the airline industry—improve passenger
              experience, etc.
            </p>
            <p className="font-semibold">
              1st Place: 75k Miles <br />
              2nd Place: 25k Miles <br />
              3rd Place: 15k Miles
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar selectedPage="b4g" />

      <main className="flex-grow">
        {/* Top section with large title, star/cursor icons, date, etc. */}
        <div className="mx-auto px-4 py-4 text-center">
          <div className="mb-4">
            <Image
              src={B4G_Logo}
              alt="Build For Good Logo"
              className="mx-auto"
            />
          </div>

          <a
            href="https://b4ghelpq.vercel.app/"
            target="_blank"
            className="bg-[#42A9D7] text-white font-bold py-2 px-4 rounded-[20px] mb-4"
          >
            B4G Help Queue
          </a>
        </div>

        {/* Two-column schedule with thick border */}
        <div className="p-4 ">
          <TwoColumnSchedule />
        </div>

        {/* Prize board with thicker borders */}
        <div className="my-8 mt-20">
          {/* Large heading with an outline (stroke) effect */}
          <div className="my-5">
            <Image
              src={Challenges_Header}
              width={400}
              className="mx-auto"
              alt="Challenges Header"
            />
          </div>

          <Carousel
            responsive={responsive}
            ssr={true}
            swipeable={true}
            draggable={false}
            className="w-full"
          >
            {awards.map((challenge, index) => (
              <div key={index} className="flex justify-center px-2 my-4">
                <div
                  className="bg-white rounded-3xl p-6 w-80 min-h-[24rem] border-2 border-blue-200"
                  style={{ boxShadow: "2px 3px 5px rgba(66,169,215,0.8)" }}
                >
                  {/* Card Title */}
                  <h3 className="text-2xl font-bold text-[#D6B6E2] mb-2 text-center">
                    {challenge.title}
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="text-[#42A9D7] text-sm mb-4 text-center">
                    {challenge.subtitle}
                  </p>

                  {/* Places & Prizes */}
                  <div className="space-y-3">
                    {challenge.prizes.map((prize, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        {/* Medal-like circle (gold, silver, bronze) */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            i === 0
                              ? "bg-[#FCCA3F]" // Gold
                              : i === 1
                                ? "bg-[#C0C0C0]" // Silver
                                : "bg-[#CD7F32]" // Bronze
                          }`}
                        >
                          {i + 1}
                        </div>

                        <span className="font-semibold text-[#42A9D7]">
                          {prize.place}:
                        </span>
                        <span className="text-[#42A9D7]">{prize.prize}</span>
                      </div>
                    ))}
                  </div>

                  {challenge.extra && (
                    <div className="flex items-center space-x-2">
                      <a
                        href={challenge.extra}
                        target="_blank"
                        className="bg-[#42A9D7] text-white font-bold py-2 px-4 rounded-[20px] mt-[20px]"
                      >
                        More Info (Github)
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default B4G;
