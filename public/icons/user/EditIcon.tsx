import React from "react";

const EditIcon = ({ fill = "", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill={fill}
      className={className}
      viewBox="0 0 18 18"
    >
      <mask
        id="mask0_2980_4977"
        width="18"
        height="18"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M.515.217h17.154v17.154H.515z"></path>
      </mask>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.005"
        mask="url(#mask0_2980_4977)"
      >
        <path d="M9.729 3.467h-7.37c-.741 0-1.341.6-1.341 1.34v10.721c0 .74.6 1.34 1.34 1.34H13.08c.74 0 1.34-.6 1.34-1.34v-7.37"></path>
        <path d="m16.969 2.81-7.581 7.581-2.37.474.474-2.369L15.074.915a.67.67 0 0 1 .947 0l.948.948a.67.67 0 0 1 0 .947M14.125 1.864l1.895 1.895"></path>
      </g>
    </svg>
  );
};

export default EditIcon;
