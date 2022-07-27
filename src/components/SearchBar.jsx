import React from "react";
import { SearchCircleIcon } from "@heroicons/react/solid";

function SearchBar() {
  return (
    <>
      <div className="max-w-[1450px] mx-1 lg:max-w-[1550px] lg:mx-[5rem]  flex justify-center items-center">
        <div className="flex  p-6">
          <div className="flex items-center space-x-2 ">
            <SearchCircleIcon className="w-5 h-5" />
            <div>
              <input type="text" className="w-[400px]" />
            </div>
          </div>
          <div className="flex space-x-2">
            <h1>camera</h1>
            <h1>voice</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
