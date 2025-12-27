import React from "react";

const WithdrawalDollarIcon = ({ fill = "none", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill={fill}
      className={className}
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M12 2.25a.75.75 0 0 1 .75.75v2.283h.415c2.1 0 3.804 1.703 3.804 3.804a.75.75 0 0 1-1.5 0 2.304 2.304 0 0 0-2.304-2.304h-.415v4.487h.496a3.723 3.723 0 0 1 0 7.446h-.496V21a.75.75 0 0 1-1.5 0v-2.284h-.495a3.723 3.723 0 0 1-3.724-3.723.75.75 0 0 1 1.5 0c0 1.228.996 2.223 2.224 2.223h.495V12.77h-.475a3.743 3.743 0 1 1 0-7.487h.475V3a.75.75 0 0 1 .75-.75m-.75 4.533h-.475a2.243 2.243 0 1 0 0 4.487h.475zm1.5 5.987v4.446h.496a2.223 2.223 0 1 0 0-4.446z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default WithdrawalDollarIcon;
