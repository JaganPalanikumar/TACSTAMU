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
import { Description } from "@mui/icons-material";

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
    image: "/b4g/TAMUIDS_logo.svg",
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

  // TODO Finish a landing page
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
            className="absolute bottom-0 left-0 sm:w-[170vw] md:w-[150vw] 2xl:w-[80vw] h-auto"
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
            className="absolute bottom-0 right-0 w-fit h-auto"
          >
            <Image
              src="/b4g/flower burst.svg"
              alt="Flower and Burst"
              width={605}
              height={452}
              priority
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute z-10 inset-0">
          <div className="absolute visible xl:invisible w-fit right-0 top-0  -translate-x-[20%] translate-y-[40%]">
            <Image
              src="/b4g/short logo.svg"
              alt="short Logo"
              width={373.47}
              height={228.67}
              priority
              className="-rotate-[6.69deg]"
            />
            <h1 className="w-fit text-center m-auto text-3xl">
              BUILD4GOOD 2026
            </h1>
          </div>

          <div className="absolute invisible xl:visible xl:w-[50rem] right-0 2xl:right-1/2 top-0 -translate-x-[10%] 2xl:translate-x-[50%] translate-y-full">
            <Image
              src="/b4g/long logo.svg"
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
            className="h-auto w-[20rem] absolute left-0 top-0 translate-x-[10%] translate-y-[10%]"
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
      <section className="h-fit">
        <div className="mx-auto w-[70%] p-[1rem] rounded-[5rem] bg-gradient-to-b from-[--peach] to-[--pink]">
          <div className="bg-white rounded-[4rem] p-10 flex flex-col gap-3">
            <h1 className="text-8xl text-[--pink]">About</h1>
            <p className="text-3xl text-[--gray] font-[600]">
              Build4Good is a 1.5-day hackathon hosted by the Texas A&M
              Computing Society (TACS). In this event, teams of students
              collaborate on innovative projects based on curated prompts and
              challenges. This year marks our third year hosting, bringing
              together creativity, technical skill, and a passion for making an
              impact. <br /> <br />
              We can’t wait to see what you build!
            </p>
          </div>
        </div>
      </section>
      {/* TODO Add location */}
      <section className="h-fit">
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
      </section>
      <section className="h-fit w-dvw">
        <div className="realitive flex flex-col gap-5 h-fit">
          <h1 className="text-8xl mx-auto">Tentative Schedule</h1>
          <div className="w-fit h-full p-[1rem] rounded-[5rem] bg-gradient-to-b from-[--peach] to-[--pink] mx-auto">
            <ul className="w-[70dvw] h-full p-[2rem] rounded-[4rem] bg-white flex flex-col gap-4 text-4xl">
              <h1 className="text-6xl text-[--pink] mb-5">
                Saturday, March 28th
              </h1>
              <li className="flex flex-row w-full justify-between text-[--gray]">
                <h2>Doors Open</h2> <p>9:00 AM</p>
              </li>
              <li className="flex flex-row w-full justify-between text-[--gray]">
                <h2>Opening Ceremony</h2> <p>11:00 AM</p>
              </li>
              <li className="flex flex-row w-full justify-between text-[--gray]">
                <h2>Hacking Begins</h2> <p>11:30 AM</p>
              </li>
              <li className="flex flex-row w-full justify-between text-[--gray]">
                <h2>Lunch</h2> <p>12:00 PM</p>
              </li>
              <li className="flex flex-row w-full justify-between text-[--gray]">
                <h2>Poker Bot Challenge Closes</h2> <p>5:00 PM</p>
              </li>
              <li className="flex flex-row w-full justify-between text-[--gray]">
                <h2>Doors Close</h2> <p>5:00 PM</p>
              </li>
              <h1 className="text-6xl text-[--pink] my-5">
                Sunday, March 29th
              </h1>
              <li className="flex flex-row w-full justify-between text-[--gray]">
                <h2>Devpost Submissions Due</h2> <p>12:00 PM</p>
              </li>
              <li className="flex flex-row w-full justify-between text-[--gray]">
                <h2>Judging</h2> <p>2:00 - 4:00 PM</p>
              </li>
              <li className="flex flex-row w-full justify-between text-[--gray]">
                <h2>Virtual Award Ceremony</h2> <p>5:00 PM</p>
              </li>
              <h1 className="text-6xl text-[--pink] my-5">
                Wednesday, April 1st
              </h1>
              <li className="flex flex-row w-full justify-between text-[--gray]">
                <h2>Prize Distribution</h2> <p>7:00 PM</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* TODO Add sponsors page */}
      <section className="flex flex-col gap-20 w-dvw h-fit">
        <h1 className="text-8xl mx-auto w-fit">Sponsors</h1>

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
