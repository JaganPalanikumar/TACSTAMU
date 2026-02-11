import { useAuth } from "./context/authContext";
import Image from "next/image";
import shortLogo from "/public/b4g/short logo.svg";
import longLogo from "/public/b4g/long logo.svg";
import planetBunny from "/public/b4g/planet bunny.svg";
import { useEffect } from "react";

export default function Landing() {
  // TODO Make a landing page
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="relative h-fit">
        <Image
          src={planetBunny}
          alt="Short Logo"
          width={500}
          height={300}
          className="w-[10rem] h-auto md:w-[15rem] lg:w-[20rem] mr-auto absolute left-[5rem] top-[3rem]"
        />

        <Image
          src={shortLogo}
          alt="Short Logo"
          width={500}
          height={300}
          className="visible xl:invisible w-[10rem] h-auto md:w-[15rem] lg:w-[20rem] xl:w-[50rem] -rotate-[6.69deg] ml-auto absolute right-[5rem] top-[10rem]"
        />

        <Image
          src={longLogo}
          alt="Long Logo"
          width={500}
          height={300}
          className="invisible xl:visible xl:w-[50rem] -rotate-[6.69deg] ml-auto absolute right-[5rem] top-[10rem]"
        />
      </div>
    </div>
  );
}
