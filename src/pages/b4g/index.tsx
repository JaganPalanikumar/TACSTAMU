import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Landing() {
  const { scrollY } = useScroll();

  const moveCloud = useTransform(scrollY, [0, 1300], ["-30%", "-100%"]);
  const moveBunny = useTransform(scrollY, [0, 800], ["0%", "-300%"]);
  const moveBurst = useTransform(scrollY, [0, 1300], ["0%", "300%"]);
  // TODO Finish a landing page
  return (
    <div className="flex flex-col gap-3">
      <section className="relative h-[100dvh]">
        {/* Background */}
        <div className="absolute inset-0 -z-5">
          <motion.div
            style={{ x: moveCloud }}
            className="absolute bottom-0 left-0 w-[200vw] h-auto -translate-y-[50%]"
          >
            <Image
              src="/b4g/cloud with flower.svg"
              alt="Cloud with Flower"
              width={2119.83}
              height={1199}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto h-full flex items-center justify-between px-8">
          <motion.div
            style={{ x: moveBunny }}
            className="relative top-0 left-[5%] w-[40vw] h-auto"
          >
            <Image
              src="/b4g/cowboy bunny.svg"
              alt="Cowboy Bunny"
              width={391}
              height={629.86}
              priority
            />
          </motion.div>

          <div className="block xl:hidden w-[30rem] relative right-0 top-[-30%]">
            <Image
              src="/b4g/bunny logo.svg"
              alt="Bunny Logo"
              width={373.47}
              height={228.67}
              priority
              className="h-auto -rotate-[6.69deg]"
            />
            <h1 className="w-fit text-center m-auto text-3xl">build4good</h1>
          </div>

          <Image
            src="/b4g/long logo.svg"
            alt="Long Logo"
            width={1072.48}
            height={229.37}
            priority
            className="hidden xl:block xl:w-[50rem] -rotate-[6.69deg] relative right-0 top-[-30%]"
          />
        </div>

        <Image
          src="/b4g/planet bunny.svg"
          alt="Planet Bunny"
          width={317.5}
          height={232.93}
          priority
          className="h-auto w-[20rem] absolute left-[5%] top-[3rem]"
        />

        <motion.div
          style={{ x: moveBurst }}
          className="absolute z-[2] bottom-[5%] -right-[10%] w-[60vw] h-auto"
        >
          <Image
            src="/b4g/flower burst.svg"
            alt="Flower and Burst"
            width={605}
            height={452}
            className="object-contain"
            priority
          />
        </motion.div>
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
