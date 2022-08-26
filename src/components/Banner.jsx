import React, { useEffect } from "react";
import { gsap, Power4 } from "gsap";
const Banner = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.staggerFrom(".hidetext", 1.5, { y: 200, ease: Power4.easeOut }, 0.35);
  }, []);

  return (
    <div className="">
      <div className="max-w-[1450px] mx-7 lg:max-w-[1550px] lg:mx-[9em] h-full ">
        <div className="mt-[50px] md:grid grid-cols-12 gap-[3em] md:mt-[80px] ">
          <div className="col-span-12 font-featured w-full ">
            <div className="leading-[40px] sm:leading-[80px] md:leading-[90px] lg:leading-[130px] font-bold">
              <h1 className="relative overflow-hidden w-full h-[50px] sm:h-[80px] md:h-[130px] lg:h-[150px] text-[35px] sm:text-[3rem] text-left  md:text-[4rem] lg:text-[5rem] 2xl:text-[6rem] ">
                <span className="absolute z-[200] hidetext">NEW ERA </span>
              </h1>
              <h1 className="relative overflow-hidden  w-full h-[50px] sm:h-[80px] md:h-[130px] lg:h-[150px] text-[35px] sm:text-[3rem] text-left  md:text-[4rem] lg:text-[5rem] 2xl:text-[6rem]">
                <span className="absolute z-[200] hidetext">OF ECOMMERCE</span>
              </h1>
              <h1 className="relative overflow-hidden  w-full h-[80px] sm:h-[80px] md:h-[130px] lg:h-[250px] 2xl:h-[120px] text-[35px] sm:text-[3rem] text-left  md:text-[4rem] lg:text-[5rem] 2xl:text-[6rem]">
                <span className="absolute z-[200] hidetext">
                  WITH MODERN AI
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
