const CloseIcon = ({
  fill = "currentColor",
  size = 24,
  width = "",
  height = "",
  className = "",
}) => {
  return (
    <svg
      fill={fill}
      width={width || size}
      height={height || size}
      className={`${className}`}
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 25L1 1M25 1L1 25"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CloseIcon;
