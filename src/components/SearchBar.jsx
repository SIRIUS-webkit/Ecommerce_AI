/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import "@tensorflow/tfjs-backend-webgl";
import * as mobileNet from "@tensorflow-models/mobilenet";
import ReactTooltip from "react-tooltip";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function SearchBar({ search, searchValue }) {
  const [input, setInput] = useState("");
  const [boxDisplay, setBoxDisplay] = useState(false);
  const [imageURL, setImageURL] = useState("");
  // const [imageInput, setImageInput] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const [model, setModel] = useState(null);
  const imageRef = useRef(null);
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);

  useEffect(() => {
    const loadModal = async () => {
      const model = await mobileNet.load();
      setModel(model);
    };
    loadModal();
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setInput("");
    }
  }, [searchValue]);

  useEffect(() => {
    const handleListen = () => {
      if (isListening) {
        mic.start();
        mic.onend = () => {
          // console.log("Continue");
          mic.start();
        };
      } else {
        mic.stop();
        mic.onend = () => {
          // console.log("Stopped Mic on Click");
        };
      }

      // mic.onstart = () => {
      //   console.log("Mics on");
      // };

      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        // console.log(transcript);
        setNote(transcript);
        // history.push("/products/all");
        // mic.onerror = (event) => {
        //   console.log(event.error);
        // };
      };
    };
    handleListen();
  }, [isListening]);

  useEffect(() => {
    if (note !== null) {
      setInput(note);
      search(note);
    }
  }, [note]);

  // get inputdata
  const handleInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    search(event.target.value);
  };

  // search by image
  const uploadImage = (e) => {
    const { files } = e.target;
    setBoxDisplay(true);
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
      setInput("");
      // history.push("/products/all");
    } else {
      setImageURL(null);
    }
    if (imageURL !== null) {
      // setImageInput(false);
      setIsImage(false);
      // setImageInput(true);
      setIsImage(true);
    } else {
      // setImageInput(true);
      setIsImage(true);
    }
  };

  const Identify = async () => {
    try {
      const results = await model.classify(imageRef.current);
      setResults(results);
    } catch (error) {}
  };

  const removeInput = () => {
    setInput("");
    search("");
    return null;
  };

  return (
    <div className="relative font-myfont">
      <div className="max-w-[1450px] mx-[10px] lg:max-w-[1550px] lg:mx-[5rem]  flex justify-center items-center">
        <div className="flex  space-x-[1rem]  p-6">
          <div className="relative flex items-center space-x-2 ">
            <div>
              <input
                type="text"
                value={input}
                onChange={handleInput}
                className="max-w-[200px] md:min-w-[400px] sm:py-2 sm:pl-3 pr-7 py-1 px-2 outline-0  bg-transparent border-[2px] border-[#666666] rounded-md font-medium"
                placeholder="Search"
              />
            </div>
            {input && (
              <p
                className="absolute right-[10px] cursor-pointer h-full overflow-hidden flex items-center justify-center"
                role="presentation"
                onClick={() => removeInput()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#333333]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            id="file"
            onChange={uploadImage}
            hidden
          />
          <div className="flex items-center space-x-1 sm:space-x-3">
            <ReactTooltip id="camera" place="bottom" effect="solid">
              Search with image
            </ReactTooltip>
            <label
              htmlFor="file"
              className="cursor-pointer w-[30px] sm:w-[40px] sm:h-[40px] h-[30px] flex items-center justify-center bg-[#F7F3F2] rounded-full"
              data-tip
              data-for="camera"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-6 sm:w-6 text-[#333333] hover:text-black"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </label>

            <div
              role="presentation"
              onClick={() => setIsListening((prevState) => !prevState)}
              className="cursor-pointer w-[30px] sm:w-[40px] h-[30px] sm:h-[40px] flex items-center justify-center bg-[#F7F3F2] rounded-full"
              data-tip
              data-for="voice"
            >
              <ReactTooltip id="voice" place="bottom" effect="solid">
                Search with voice
              </ReactTooltip>
              {isListening ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-6 sm:w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-mic-mute-fill h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z" />
                  <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      {boxDisplay && (
        <div className="">
          <div className="sm:max-w-full max-w-[320px] mx-auto flex justify-center items-center relative">
            <div
              className={`absolute ${
                results.length === 0 ? "mt-[20rem]" : "mt-[26rem]"
              }  w-full max-w-[450px] border-[1px] rounded-md px-[2rem] py-[1rem] bg-white border-[#666666]`}
            >
              <div
                className="flex justify-end cursor-pointer hover:text-blue-300"
                role="presentation"
                onClick={() => {
                  setBoxDisplay(false);
                  // setImageInput(false);
                  setImageURL(null);
                  setResults([]);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="max-w-[200px]  mx-auto">
                {isImage && (
                  <img
                    src={imageURL}
                    alt="test"
                    ref={imageRef}
                    className="w-full h-[200px] object-cover"
                  />
                )}
              </div>
              {results.length === 0 && (
                <div className="flex items-center justify-center mt-[2rem]">
                  <button
                    type="button"
                    onClick={Identify}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Identify Image
                  </button>
                </div>
              )}
              {results.length > 0 && (
                <div className="mt-[2rem]">
                  {results.map((res) => {
                    return (
                      <div
                        onClick={() => {
                          search(res.className.replaceAll(",", ""));
                          setInput(res.className.replaceAll(",", ""));
                        }}
                        className="flex justify-between items-center mb-1 cursor-pointer hover:bg-red-200 px-[1rem] py-[0.5rem] rounded-md"
                      >
                        <p>{res.className}</p>
                        <p>
                          {(
                            Math.round(res.probability * 100 * 100) / 100
                          ).toFixed(2)}
                          %
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
