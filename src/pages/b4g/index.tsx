import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import useMeasure from "react-use-measure";

const tracks = [
  "BEST OVERALL",
  "POKER BOT",
  "FIGMA(UI/UX)",
  "AGGIEX STARTUP",
  "TBD",
];

export default function Landing() {
  const { scrollY } = useScroll();

  const moveCloud = useTransform(scrollY, [0, 2500], ["-60%", "-200%"]);
  const moveBurst = useTransform(scrollY, [0, 200], ["10%", "100%"]);
  const moveStar = useTransform(scrollY, [0, 500], ["30%", "100%"]);

  let [ref, { height }] = useMeasure();

  const carouselTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    let finalPosition = -height / 3 - 5;

    controls = animate(carouselTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 10,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [carouselTranslation, height]);

  // TODO Finish a landing page
  return (
    <div className="flex flex-col">
      <section className="relative h-[100dvh]">
        {/* Background */}
        <div className="absolute inset-0 -z-5">
          <motion.div
            style={{ x: moveStar }}
            className="absolute bottom-0 right-0 w-[2052.15px] h-auto invisible 2xl:visible"
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
            className="absolute bottom-0 left-0 w-[2119.83px] h-auto"
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

          <div className="absolute invisible xl:visible xl:w-[50rem] right-0 2xl:right-1/2 top-0 -translate-x-[10%] 2xl:translate-x-[50%] translate-y-[100%]">
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
      {/* TODO Change height to fit once everything is done */}
      <section className="h-[50dvh]">
        <div className="mx-auto w-[70%] p-[1rem] rounded-[5rem] bg-gradient-to-r from-[#f5dcc6] via-[#d594dc] to-[#f5dcc6]">
          <div className="bg-white rounded-[4rem] p-10 flex flex-col gap-3">
            <h1 className="text-8xl font-[700] text-[--pink]">About</h1>
            <p className="text-lg text-[--gray] font-[600]">
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
      {/* TODO Change height to fit once everything is done */}
      <section className="h-[100dvh] flex flex-col justify-center items-center">
        <div className="relative flex flex-row gap-5 overflow-clip h-[40vh]">
          <div className="absolute z-10 top-0 left-0 right-0 h-[50%] w-[100%] bg-gradient-to-b from-[--background] to-transparent" />
          <h1 className="text-[9vw] 3xl:text-[15vh] my-auto">Tracks</h1>
          <motion.div
            ref={ref}
            style={{ y: carouselTranslation }}
            className="flex flex-col gap-5 h-fit"
          >
            {[...tracks, ...tracks, ...tracks].map((track, index) => (
              <div key={index} className="snap-center">
                <h2 className="text-[9vw] 3xl:text-[15vh]  w-fit">{track}</h2>
              </div>
            ))}
          </motion.div>
          <div className="absolute z-10 bottom-0 left-0 right-0 h-[50%] w-[100%] bg-gradient-to-t from-[--background] to-transparent" />
        </div>
      </section>
    </div>
  );
}
