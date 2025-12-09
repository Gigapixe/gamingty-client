import React from "react";

const TelegramIcon = ({ fill = "currentColor", className = "" }) => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7715 19.4758L11.2752 26.4558C11.9852 26.4558 12.2927 26.1508 12.6615 25.7845L15.9902 22.6033L22.8877 27.6545C24.1527 28.3595 25.044 27.9883 25.3852 26.4908L29.9127 5.27578L29.914 5.27453C30.3152 3.40453 29.2377 2.67328 28.0052 3.13203L1.39272 13.3208C-0.423528 14.0258 -0.396028 15.0383 1.08397 15.497L7.88772 17.6133L23.6915 7.72453C24.4352 7.23203 25.1115 7.50453 24.5552 7.99703L11.7715 19.4758Z"
        fill={fill}
      />
    </svg>
  );
};

export default TelegramIcon;
