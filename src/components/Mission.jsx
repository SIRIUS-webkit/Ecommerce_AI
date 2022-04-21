import React from "react";
import { ArrowRightIcon } from "@heroicons/react/solid";

function Mission() {
  return (
    <>
      <div className="mt-[8rem] relative font-myfont bg-footer-texture bg-no-repeat bg-cover bg-center w-full h-full">
        <div className=" w-full h-full text-white flex justify-between items-start md:p-[70px] p-[40px] flex-col md:flex-row">
          <div className="w-full md:w-[40vw] flex h-full flex-col">
            <p className="text-[25px] md:text-[40px] font-bold leading-20 w-full">
              We couldn’t find a trail shoe that was tough enough, light enough
              or fast enough to take us where we wanted to go. So we created it.
            </p>
          </div>
          <div className="mt-[8rem] md:mt-0">
            <h4 className="text-base md:text-[19px] font-bold flex items-center">
              <span className="relative transition ease-in-out cursor-pointer before:absolute before:h-[0.5px] before:bg-white before:w-0 before:left-0 before:-bottom-2 before:transition-all hover:before:w-full">
                Discover our mission
              </span>{" "}
              <ArrowRightIcon className="h-5 w-5 ml-[20px]" />
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mission;
