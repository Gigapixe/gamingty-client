import React from "react";

const RedeemGiftCardIcon = ({
  size = 24,
  fill = "none",
  className = "",
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 18"
      fill={fill}
      className={className}
    >
      <path
        d="M1 7C1 4.172 1 2.757 1.879 1.879C2.757 1 4.172 1 7 1H15C17.828 1 19.243 1 20.121 1.879C21 2.757 21 4.172 21 7V11C21 13.828 21 15.243 20.121 16.121C19.243 17 17.828 17 15 17H7C4.172 17 2.757 17 1.879 16.121C1 15.243 1 13.828 1 11V7Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 10C11 6.99 5 2.36 5 6.904C5 8.47 5.763 10 7.5 10H11ZM11 10C11 6.99 17 2.36 17 6.904C17 8.47 16.237 10 14.5 10H11ZM11 10L14 13M11 10L8 13M11 1V17M1 10H21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RedeemGiftCardIcon;
