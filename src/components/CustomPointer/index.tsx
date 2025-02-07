import React from "react";

const CustomPointer = () => {
  return (
    <span
      id="custom-pointer"
      className="opacity-0 scale-0 translate-x-[-50%] translate-y-[-50%] top-0 left-0  fixed uppercase text-white bg-accent text-xl rounded-full z-40 p-3 pointer-events-none"
    >
      <span id="pointer-message" className="opacity-0 hidden">
        OPEN
      </span>
    </span>
  );
};

export default CustomPointer;
