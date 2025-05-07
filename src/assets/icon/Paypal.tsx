import React from "react";

const Paypal: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="36"
      height="24"
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      {...props}
    >
      <title>PayPal</title>
      <g clipPath="url(#clip0_48_399)">
        <path
          d="M0 3C0 1.34315 1.34315 0 3 0H33C34.6569 0 36 1.34315 36 3V21C36 22.6569 34.6569 24 33 24H3C1.34315 24 0 22.6569 0 21V3Z"
          fill="#CCDEFF"
        />
        {/* All the other paths from the original SVG */}
        <path d="M8.07812 8.63807C7.70209..." fill="#003087" />
        <path d="M32.8093 8.25H31.7256..." fill="#009CDE" />
        <path d="M19.7142 10.6084C19.7142..." fill="#003087" />
        <path d="M30.2172 10.4034H29.104..." fill="#009CDE" />
        <path d="M13.5787 10.4034H12.4655..." fill="#003087" />
        <path d="M24.7169 8.63807C24.3409..." fill="#009CDE" />
      </g>
      <defs>
        <clipPath id="clip0_48_399">
          <rect width="36" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Paypal;
