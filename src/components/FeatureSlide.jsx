import React, { useRef, useEffect } from "react";
import useOnScreen from "./hooks/useOnScreen";

function FeatureSlide({ title, content, index, updateActiveImage }) {
  const ref = useRef(null);
  const OnScreen = useOnScreen(ref);
  useEffect(() => {
    if (OnScreen) {
      updateActiveImage(index);
    }
  }, [OnScreen, index]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      ref={ref}
      className="h-[100vh] flex justify-center flex-col w-[80%] md:w-[60%] text-left m-auto text-white md:text-black"
    >
      <h1 className="text-[2rem] md:text-[3.5rem] lg:text-[4rem] uppercase font-bold font-lastfont">
        {title}
      </h1>
      <p className="text-[1rem] mt-7 font-secondaryfont">{content}</p>
    </div>
  );
}

export default FeatureSlide;
