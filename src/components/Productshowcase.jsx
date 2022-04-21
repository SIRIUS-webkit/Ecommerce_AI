import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { productShowcase } from "../components/data/details";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";

function Productshowcase() {
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);

  return (
    <>
      <div className="relative mt-[8em] font-myfont max-w-[1450px] mx-9 lg:max-w-[1550px] lg:mx-20 h-full">
        <button
          className="absolute w-10 top-[57%] -left-5 z-10 h-10 hidden md:flex justify-center items-center bg-black rounded-full transition"
          ref={prevBtn}
        >
          <ArrowLeftIcon className="h-5 w-5 text-white" />
        </button>
        <button
          className="absolute w-10 top-[57%] -right-5 z-10 h-10 hidden md:flex justify-center items-center bg-black rounded-full"
          ref={nextBtn}
        >
          <ArrowRightIcon className="h-5 w-5 text-white" />
        </button>

        <div className="flex justify-between items-center">
          <h1 className="text-[2.5rem] md:text-[3.5rem] leading-[62px] font-semibold">
            Fetaured
          </h1>
          <h4 className="relative text-base md:text-[19px] md:flex items-center hidden font-semibold">
            <span className="relative transition ease-in-out cursor-pointer before:absolute before:h-[0.5px] before:bg-black before:w-0 before:left-0 before:-bottom-2 before:transition-all hover:before:w-full">
              Discover our products
            </span>{" "}
            <ArrowRightIcon className="h-5 w-5 ml-[20px]" />
          </h4>
        </div>
        <div className="mt-[4em]">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            speed={1000}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={{
              prevEl: prevBtn.current,
              nextEl: nextBtn.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevBtn.current;
              swiper.params.navigation.nextEl = nextBtn.current;
            }}
            on={{
              slideChangeTransitionStart: () => {},
            }}
            breakpoints={{
              766: {
                slidesPerView: 2,
              },
            }}
          >
            {productShowcase.map((data) => {
              return (
                <SwiperSlide key={data.id}>
                  <div className="relative w-full h-[50vh] md:h-[80vh] bg-blue-300">
                    <p className="absolute top-7 left-7 text-xs">
                      <span className="inline-block bg-black p-[5px] text-white rounded leading-1 uppercase">
                        {data.stock}
                      </span>
                    </p>
                    <img
                      className="object-cover w-full h-full"
                      src={data.imageUrl}
                      alt="product"
                    />
                    <div className="absolute bottom-7 left-7 text-base font-bold flex space-x-6">
                      <p>{data.name}</p>
                      <p>{data.price}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="mt-[3em] md:hidden">
          <h4 className="relative text-base md:text-[19px] flex items-center font-semibold">
            <span className="relative transition ease-in-out cursor-pointer before:absolute before:h-[0.5px] before:bg-black before:w-0 before:left-0 before:-bottom-2 before:transition-all hover:before:w-full">
              Discover our products
            </span>{" "}
            <ArrowRightIcon className="h-5 w-5 ml-[20px]" />
          </h4>
        </div>
      </div>
    </>
  );
}

export default Productshowcase;
