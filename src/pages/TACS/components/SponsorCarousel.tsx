import React from "react";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";

// Import sponsor logos
import GoodBullLogo from "/public/good_bull_logo.png";
import UltraPressLogo from "/public/ultrapress_logo.svg";
import DoorDashLogo from "/public/doordash_logo.png";
import ConocoPhillipsLogo from "/public/conocophillips_logo.png";
import NotionLogo from "/public/notion_logo.svg";
import stickermule from "/public/stickermule_logo.svg";
import chevronLogo from "/public/chevron_icon.svg";
import TAMUIDS from "/public/TAMIDS_logo.svg";

const logos = [
  GoodBullLogo,
  UltraPressLogo,
  DoorDashLogo,
  ConocoPhillipsLogo,
  stickermule,
  NotionLogo,
  DoorDashLogo,
  ConocoPhillipsLogo,
  chevronLogo,
  TAMUIDS,
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const SponsorCarousel = () => {
  return (
    <div className="w-full overflow-hidden py-4">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="flex items-center justify-center"
      >
        {logos.map((src, index) => (
          <div key={index} className="flex justify-center mx-2">
            <div className="w-28 h-14 relative">
              <Image
                src={src}
                alt={`Sponsor Logo ${index + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SponsorCarousel;
