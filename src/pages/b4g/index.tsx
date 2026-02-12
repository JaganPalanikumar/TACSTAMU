import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Landing() {
  const { scrollY } = useScroll();

  const moveCloud = useTransform(scrollY, [0, 2500], ["-60%", "-200%"]);
  const moveBurst = useTransform(scrollY, [0, 200], ["10%", "100%"]);
  const moveStar = useTransform(scrollY, [0, 500], ["30%", "100%"]);
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
              src="/b4g/bunny logo.svg"
              alt="Bunny Logo"
              width={373.47}
              height={228.67}
              priority
              className="-rotate-[6.69deg]"
            />
            <h1 className="w-fit text-center m-auto text-3xl">
              build4good 2026
            </h1>
          </div>

          <div className="absolute invisible xl:visible xl:w-[50rem] right-0 top-0">
            <Image
              src="/b4g/long logo.svg"
              alt="Long Logo"
              width={1072.48}
              height={229.37}
              priority
              className="-rotate-[6.69deg] -translate-x-[10%] translate-y-[100%]"
            />
          </div>

          <Image
            src="/b4g/planet bunny.svg"
            alt="Planet Bunny"
            width={317.5}
            height={232.93}
            priority
            className="h-auto w-[20rem] absolute left-0 top-0 translate-x-[10%] translate-y-[10%]"
          />
        </div>
      </section>
      <section className="h-[100dvh]">
        <div className="p-10 flex flex-col gap-3">
          <h1 className="text-6xl font-[var(--font-header)]">About</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur. Feugiat at arcu consectetur
            sem vitae id velit. Nibh tristique rhoncus nisi enim sit gravida ut.
            Varius sit eget sed sapien. Consectetur viverra at dolor neque
            vulputate feugiat maecenas cras. Pretium cursus imperdiet egestas
            ornare fermentum. Tortor vestibulum orci lacus eget feugiat rhoncus
            interdum. Lorem ut nam volutpat sed in aliquam vivamus vestibulum
            et. Fermentum adipiscing consequat dui non in adipiscing dolor.
          </p>
        </div>
      </section>
    </div>
  );
}
