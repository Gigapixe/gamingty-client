const UserIcon = ({
  fill = "none",
  stroke = "currentColor", // Use currentColor to inherit text color
  size = 24,
  width = 24,
  height = 24,
  className = "",
}) => {
  return (
    <svg
      width={width || size}
      height={height || size}
      className={`text-gray-900 dark:text-white ${className}`} // Default and dark mode colors
      viewBox="0 0 40 40"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 36.6667V34.5833C5 26.5292 11.7157 20 20 20C28.2843 20 35 26.5292 35 34.5833V36.6667"
        stroke={stroke}
        strokeWidth="2.36629"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0003 19.9997C24.6026 19.9997 28.3337 16.2686 28.3337 11.6663C28.3337 7.06397 24.6026 3.33301 20.0003 3.33301C15.398 3.33301 11.667 7.06397 11.667 11.6663C11.667 16.2686 15.398 19.9997 20.0003 19.9997Z"
        stroke={stroke}
        strokeWidth="2.36629"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;
