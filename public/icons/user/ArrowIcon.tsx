import React from "react";

const ArrowIcon = ({ className = "", fill = "none" }) => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      className={className}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.16487 1.35303H11.6082V10.7963M10.9524 2.00882L1.37793 11.5833"
        stroke="currentColor"
        strokeWidth="1.54839"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default ArrowIcon;
