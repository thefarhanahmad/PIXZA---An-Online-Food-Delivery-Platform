"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { foodItems } from "@/rawData";

const CarouselComponent = () => {
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        showThumbs={false}
        showStatus={false}
        dynamicHeight={30}
        stopOnHover={false}
      >
        {foodItems.map((item, i) => {
          return (
            <div
              key={i}
              className="w-full h-[30vh] sm:h-[40vh] md:h-[60vh] overflow-hidden"
            >
              <img
                src={item}
                alt={`Banner ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <p className="legend">
                Enjoy delicious meals delivered right to your doorstep.
              </p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
