import React, { useEffect } from "react";

function Notify({ notify, setNotify }) {
  useEffect(() => {
    setTimeout(() => {
      setNotify(false);
    }, 1000);
  }, [notify, setNotify]);
  return (
    <div
      className={`absolute top-7 right-0 z-[100] ${
        notify ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="max-w-[350px] bg-[#42ba96] px-[1rem] py-[0.5rem] rounded-sm font-myfont text-white">
          <h1>Item Added</h1>
        </div>
      </div>
    </div>
  );
}

export default Notify;
