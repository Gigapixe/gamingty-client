import React from "react";

const EmailSupportIcon = ({ className = "", fill = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="25"
      fill={fill}
      className={className}
      viewBox="0 0 34 25"
    >
      <path
        fill={fill}
        d="M13.928 10.056c1.957 1.013 4.253 1.013 6.143 0l10.598-5.4L33.1 3.44A5.65 5.65 0 0 0 27.97.2H6.097C3.87.2 1.912 1.55.967 3.44l2.43 1.215z"
      ></path>
      <path
        fill={fill}
        d="M21.353 12.486a9.7 9.7 0 0 1-4.32 1.012 9.7 9.7 0 0 1-4.32-1.012L3.06 7.558l-2.7-1.35v12.826c0 3.105 2.565 5.67 5.67 5.67h21.939c3.105 0 5.67-2.565 5.67-5.67V6.208l-2.7 1.35z"
      ></path>
    </svg>
  );
};

export default EmailSupportIcon;
