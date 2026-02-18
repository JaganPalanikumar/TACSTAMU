import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import Image from "next/image";
import useMeasure from "react-use-measure";
import { useEffect } from "react";

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-6xl sm:text-8xl mx-auto w-fit text-center flex items-center justify-center gap-4 sm:gap-6 h-[3.5rem] sm:h-[6rem]">
      <Image
        src="/b4g/sparkle.svg"
        alt=""
        width={260}
        height={240}
        className="h-10 sm:h-full w-auto"
      />

      <span className="leading-none">{children}</span>

      <Image
        src="/b4g/sparkle.svg"
        alt=""
        width={260}
        height={240}
        className="h-10 sm:h-full w-auto"
      />
    </h1>
  );
}

const tracks = [
  { title: "TBD", description: "Tracks will be announced on March 28" },
  // {
  //   title: "BEST OVERALL",
  //   description:
  //     "Best overall hack that meets all of the judging criteria: creativity, technical complexity, and societal impact",
  // },
  // {
  //   title: "POKER BOT",
  //   description:
  //     "Create an algorithm to play against other bots in a variant of poker.",
  // },
  // {
  //   title: "FIGMA(UI/UX)",
  //   description:
  //     "Hack with best design and seamless user experience using the Figma API",
  // },
  // { title: "AGGIEX STARTUP", description: "Hello" },
];

const logos = [
  {
    title: "Cheveron",
    image: "/b4g/Chevron_Logo.svg",
    width: 200,
    height: 200,
  },
  {
    title: "TAMUIDS",
    image: "/b4g/TAMUIDS_Logo.svg",
    width: 151.98,
    height: 70.53,
  },
  {
    title: "Figma",
    image: "/b4g/Figma_Logo.svg",
    width: 248.45,
    height: 137.59,
  },
  {
    title: "Jane Street",
    image: "/b4g/Jane_Street_Capital_Logo.svg",
    width: 104,
    height: 41,
  },
  // {
  //   title: "Amazon Web Services",
  //   image: "/b4g/Amazon_Web_Services_Logo.svg",
  //   width: 300.67,
  //   height: 179.8,
  // },
  {
    title: "Good Bull Fund",
    image: "/b4g/Good_Bull_Fund_Logo.svg",
    width: 305.14,
    height: 55.18,
  },
  {
    title: "Mai Shan Yun",
    image: "b4g//Mai_Shan_Yun.svg",
    width: 200,
    height: 200,
  },
];

export default function Landing() {
  const { scrollY } = useScroll();

  const moveCloud = useTransform(scrollY, [0, 2500], ["-60%", "-200%"]);
  const moveBurst = useTransform(scrollY, [0, 200], ["10%", "100%"]);
  const moveStar = useTransform(scrollY, [0, 500], ["30%", "100%"]);

  let [ref, { width }] = useMeasure();

  const carouselTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 40;

    controls = animate(carouselTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 15,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [carouselTranslation, width]);

  return (
    <div className="flex flex-col overflow-x-clip gap-20">
      <section className="relative h-dvh">
        {/* Background */}
        <div className="absolute inset-0 -z-5">
          <motion.div
            style={{ x: moveStar }}
            className="absolute bottom-0 right-0 w-[100vw] h-auto invisible 2xl:visible"
          >
            <Image
              src="/b4g/star.svg"
              alt="Shooting Star"
              width={2052.15}
              height={1065.68}
              className=""
              priority
            />
          </motion.div>
          <motion.div
            style={{ x: moveCloud, y: "40%" }}
            className="absolute bottom-0 left-0 w-[250dvw] sm:w-[180vw] md:w-[150vw] lg:w-[100vw] 2xl:w-[80vw] h-auto max-h-[120%]"
          >
            <Image
              src="/b4g/cloud bunny.svg"
              alt="Cloud with Bunny"
              width={2119.83}
              height={1587}
              priority
            />
          </motion.div>
          <motion.div
            style={{ x: moveBurst }}
            className="invisible sm:visible absolute bottom-0 right-0 w-fit h-auto"
          >
            <Image
              src="/b4g/flower burst.svg"
              alt="Flower and Burst"
              width={605}
              height={452}
              className="w-[60dvw] lg:w-[50dvw] 2xl:w-[30dvw] max-h-[50dvh]"
              priority
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute z-10 inset-0">
          <div className="absolute visible xl:invisible w-fit right-0 top-0  -translate-x-[20%] translate-y-[10%]">
            <Image
              src="/b4g/bordered short logo.svg"
              alt="short Logo"
              width={373.47}
              height={228.67}
              priority
              className="-rotate-[6.69deg]"
            />
            <h1 className="w-fit text-center m-auto text-2xl">
              BUILD4GOOD 2026
            </h1>
          </div>

          <div className="absolute invisible xl:visible xl:w-[50rem] right-0 2xl:right-1/2 top-0 -translate-x-[10%] 2xl:translate-x-[50%] translate-y-1/2">
            <Image
              src="/b4g/bordered long logo.svg"
              alt="Long Logo"
              width={1072.48}
              height={229.37}
              priority
              className="-rotate-[6.69deg]"
            />
            <h1 className="w-fit text-center m-auto text-3xl">
              BUILD4GOOD 2026
            </h1>
          </div>

          <Image
            src="/b4g/planet bunny.svg"
            alt="Planet Bunny"
            width={317.5}
            height={232.93}
            priority
            className="invisible sm:visible h-auto w-[30dvw] md:w-[20dvw] xl:w-[15dvw] absolute left-0 top-0 translate-x-[10%] translate-y-[10%]"
          />

          <Image
            src="/b4g/planets.svg"
            alt="Planets"
            width={317.5}
            height={232.93}
            priority
            className="invisible 2xl:visible h-auto w-[20rem] absolute right-0 top-0 -translate-x-[10%] translate-y-[10%]"
          />
        </div>
      </section>
      <section id="About" className="h-fit flex flex-col gap-5">
        <SectionHeader>About</SectionHeader>
        <div className=" mx-auto w-[90%] max-w-[1500] rounded-[4rem] px-[60px] py-[40px] flex flex-col gap-3">
          <p className="text-2xl sm:text-3xl text-[--gray] text-center">
            Build4Good is a 1.5-day hackathon hosted by the Texas A&M Computing
            Society (TACS). In this event, teams of students collaborate on
            innovative projects based on curated prompts and challenges. This
            year marks our third year hosting, bringing together creativity,
            technical skill, and a passion for making an impact. <br /> <br />
            We can’t wait to see what you build!
          </p>
        </div>
      </section>
      {/* TODO Add location */}
      <section
        id="Location"
        className="h-fit flex flex-col gap-10 py-20 bg-[--background]"
      >
        <SectionHeader>Location</SectionHeader>

        <div className="flex flex-col items-center gap-6 mx-auto w-[90%] max-w-[1200px] text-center">
          <p className="text-2xl sm:text-3xl text-[--gray]">
            Build4Good 2026 will be held at the{" "}
            <strong>Innovative Learning Classroom Building (ILCB)</strong> on
            the Texas A&M campus.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-10 text-gray-600 text-lg font-medium">
            <div>📅 March 28-29, 2026</div>
            <div>📍 Innovative Learning Classroom Building (ILCB)</div>
            <div>⏰ Check-in: 9:00 AM</div>
          </div>

          <div className="w-full h-[400px] sm:h-[500px] mt-6 rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.7791629393496!2d-96.34449719999999!3d30.611991600000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864683e0796a3d63%3A0xdd0440b15e5686a7!2sInnovative%20Learning%20Classroom%20Building%20(ILCB)!5e0!3m2!1sen!2sus!4v1771406176695!5m2!1sen!2sus"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      {/* <section className="h-fit">
        <div className="relative flex flex-col h-fit gap-5">
          <h1 className="text-8xl mx-auto">Tracks</h1>
          <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-2 gap-10 w-full h-fit mx-auto px-[5vw]">
            {tracks.map((track, index) => (
              <div
                key={index}
                className="w-full h-full p-[1rem] rounded-[5rem] bg-gradient-to-b from-[--peach] to-[--pink]"
              >
                <div className="w-full h-full p-[2rem] rounded-[4rem] bg-white flex flex-col gap-4">
                  <h2 className="text-6xl w-fit text-[--pink]">
                    {track.title}
                  </h2>
                  <p className="text-4xl w-full text-[--gray]">
                    {track.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section id="Schedule" className="h-fit w-dvw">
        <div className="realitive flex flex-col gap-5 h-fit">
          <SectionHeader>Schedule</SectionHeader>
          <ul className="text-xl  mx-auto w-[90%] max-w-[1500] rounded-[4rem] px-[60px] py-[40px] flex flex-col gap-3">
            <h1 className="text-4xl sm:text-6xl text-[--pink] mb-5">
              Saturday, March 28th
            </h1>
            <li className="flex flex-row w-full justify-between text-[--gray]">
              <h2 className="text-white">Doors Open</h2> <p>9:00 AM</p>
            </li>
            <li className="flex flex-row w-full justify-between text-[--gray]">
              <h2 className="text-white">Opening Ceremony</h2> <p>11:00 AM</p>
            </li>
            <li className="flex flex-row w-full justify-between text-[--gray]">
              <h2 className="text-white">Hacking Begins</h2> <p>11:30 AM</p>
            </li>
            <li className="flex flex-row w-full justify-between text-[--gray]">
              <h2 className="text-white">Lunch</h2> <p>12:00 PM</p>
            </li>
            <li className="flex flex-row w-full justify-between text-[--gray]">
              <h2 className="text-white">Close Poker Bot Challenge </h2>{" "}
              <p>5:00 PM</p>
            </li>
            <li className="flex flex-row w-full justify-between text-[--gray]">
              <h2 className="text-white">Doors Close</h2> <p>5:00 PM</p>
            </li>
            <h1 className="text-4xl sm:text-6xl text-[--pink] my-5">
              Sunday, March 29th
            </h1>
            <li className="flex flex-row w-full justify-between text-[--gray]">
              <h2 className="text-white">Devpost Submissions Due</h2>{" "}
              <p>12:00 PM</p>
            </li>
            <li className="flex flex-row w-full justify-between text-[--gray]">
              <h2 className="text-white">Judging</h2> <p>2:00 - 4:00 PM</p>
            </li>
            <li className="flex flex-row w-full justify-between text-[--gray]">
              <h2 className="text-white">Virtual Award Ceremony</h2>{" "}
              <p>5:00 PM</p>
            </li>
            <h1 className="text-4xl sm:text-6xl text-[--pink] my-5">
              Wednesday, April 1st
            </h1>
            <li className="flex flex-row w-full justify-between text-[--gray]">
              <h2 className="text-white">Prize Distribution</h2> <p>7:00 PM</p>
            </li>
          </ul>
        </div>
      </section>
      {/* TODO Add sponsors page */}
      <section id="Sponsors" className="flex flex-col gap-20 w-dvw h-fit">
        <SectionHeader>Sponsors</SectionHeader>

        <div className="relative overflow-hidden w-[80dvw] h-fit mx-auto">
          <div className="absolute top-0 left-0 h-[10dvh] w-[20%] z-10 bg-gradient-to-r from-[--background] to-transparent" />
          <motion.div style={{ x: carouselTranslation }}>
            <div ref={ref} className="flex gap-[5rem] w-max">
              {[...logos, ...logos].map((logo, index) => (
                <Image
                  key={index}
                  src={logo.image}
                  alt={`${logo.title} logo`}
                  width={logo.width}
                  height={logo.height}
                  className="my-auto h-[10dvh] w-auto shrink-0"
                  priority
                />
              ))}
            </div>
          </motion.div>
          <div className="absolute top-0 right-0 h-[10dvh] w-[20%] z-10 bg-gradient-to-l from-[--background] to-transparent" />
        </div>
      </section>
    </div>
  );
}
