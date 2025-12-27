const ReferralUserIcon = ({
  className,
  fill,
}: {
  className?: string;
  fill?: string;
}) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={className}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2980_3407)">
        <mask
          id="mask0_2980_3407"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M32 0H0V32H32V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2980_3407)">
          <mask
            id="mask1_2980_3407"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="32"
            height="32"
          >
            <path d="M0 1.90735e-06H32V32H0V1.90735e-06Z" fill="white" />
          </mask>
          <g mask="url(#mask1_2980_3407)">
            <path
              d="M8.75 8.5C8.75 4.49594 11.9959 1.25 16 1.25C20.0041 1.25 23.25 4.49594 23.25 8.5C23.25 12.5041 20.0041 15.75 16 15.75C11.9959 15.75 8.75 12.5041 8.75 8.5Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.5625 30.75H3.7933C2.17455 30.75 0.974922 29.2597 1.30486 27.6749C2.72367 20.8599 8.76386 15.7396 16 15.7396C18.6452 15.7396 21.1306 16.4238 23.2889 17.625"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27.875 19.625L30.1964 21.9206C30.9331 22.6492 30.9347 23.8323 30.2001 24.5629L27.875 26.875"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M29.875 23.1889H21.468C19.3801 23.1889 17.6875 24.8815 17.6875 26.9694C17.6875 29.0574 19.3496 30.75 21.4375 30.75"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2980_3407">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ReferralUserIcon;
