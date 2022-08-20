import React, { useState } from "react";

function SearchBar({ search }) {
  const [input, setInput] = useState("");
  console.log(input);
  // get inputdata
  const handleInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    search(event.target.value);
  };
  return (
    <>
      <div className="max-w-[1450px] mx-1 lg:max-w-[1550px] lg:mx-[5rem]  flex justify-center items-center">
        <div className="flex space-x-[1rem]  p-6">
          <div className="flex items-center space-x-2 ">
            <div>
              <input
                type="text"
                value={input}
                onChange={handleInput}
                className="w-[400px] py-2 px-3 outline-0  bg-transparent border-[2px] border-[#666666] rounded-md font-medium"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
