import React from "react";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";

import CarouselImage1 from "/public/carousel_image_1.jpg";
import CarouselImage2 from "/public/carousel_image_2.jpg";
import CarouselImage3 from "/public/carousel_image_3.jpg";
import CarouselImage4 from "/public/carousel_image_4.jpg";
import CarouselImage5 from "/public/carousel_image_5.jpg";
import CarouselImage6 from "/public/carousel_image_6.jpg";
import CarouselImage7 from "/public/carousel_image_7.jpg"; // Fixed the image path
import CarouselImage8 from "/public/carousel_image_8.jpg";
import CarouselImage9 from "/public/carousel_image_9.jpg"; // Added a new image

const images = [
  CarouselImage1,
  CarouselImage2,
  CarouselImage3,
  CarouselImage4,
  CarouselImage5,
  CarouselImage6,
  CarouselImage7,
  CarouselImage8,
  CarouselImage9,
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ImageCarousel = () => {
  return (
    <div className="w-full overflow-hidden">
      <Carousel
        responsive={responsive}
        centerMode={true}
        ssr={true}
        swipeable={true}
        draggable={false}
        className="w-full"
      >
        {images.map((src, index) => (
          <div key={index} className="flex justify-center mx-2">
            <div className="relative w-full h-60 mx-auto">
              <Image
                src={src}
                alt={`Carousel Image ${index + 1}`}
                layout={"fill"}
                objectFit={"cover"}
                width={undefined}
                height={undefined}
                className="rounded-[24px] border-4 border-[#4165E7]"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
