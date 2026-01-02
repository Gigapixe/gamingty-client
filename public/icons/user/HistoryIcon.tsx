import React from "react";

const HistoryIcon = ({ className = "", fill = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Icons"
      width="512"
      height="512"
      viewBox="0 0 64 64"
      className={className}
      fill={fill}
    >
      <path d="m31.71 34.61 12 9a2 2 0 1 0 2.4-3.2L35 32V15a2 2 0 1 0-4 0v18c0 .664.278 1.262.71 1.61"></path>
      <path d="M34 2C19.361 2 6.86 12.566 4.42 27l-.76-1.13a2.002 2.002 0 1 0-3.32 2.24l4 6A2 2 0 0 0 5.8 35H6a2 2 0 0 0 1.41-.59l5-5a2.002 2.002 0 0 0-2.83-2.83l-1.24 1.25C10.643 13.656 24 4.034 38.173 6.337S61.97 21.996 59.667 36.17C57.622 48.756 46.751 58.002 34 58a24.61 24.61 0 0 1-20.37-10.16 2 2 0 1 0-3.26 2.32A28.57 28.57 0 0 0 34 62c16.569 0 30-13.431 30-30S50.569 2 34 2"></path>
    </svg>
  );
};

export default HistoryIcon;
