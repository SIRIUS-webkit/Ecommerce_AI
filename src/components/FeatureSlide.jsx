import React, { useRef, useEffect } from "react";
import useOnScreen from "./hooks/useOnScreen";

function FeatureSlide({ title, content, index, updateActiveImage }) {
  const ref = useRef(null);
  const OnScreen = useOnScreen(ref);
  useEffect(() => {
    if (OnScreen) {
      updateActiveImage(index);
    }
  }, [OnScreen, index]);
  return (
    <div
      ref={ref}
      className="h-[110vh] flex justify-center flex-col w-[70%] md:w-[60%] text-left m-auto  "
    >
      <h1 className="text-[1.5rem] md:text-[3.5rem] lg:text-[4rem] uppercase font-bold font-lastfont">
        {title}
      </h1>
      <p className="text-[1rem] mt-7 font-secondaryfont">{content}</p>
    </div>
  );
}

export default FeatureSlide;