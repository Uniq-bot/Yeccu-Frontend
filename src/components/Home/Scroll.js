import React from "react";

function ScrollIcon() {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-col items-center">
        {/* Arrow */}
        <span className="animate-bounce text-white text-2xl">⌄</span>
        {/* Optional Text */}
        <p className="text-white text-sm mt-2">Scroll down</p>
      </div>
    </div>
  );
}

export default ScrollIcon;
