import React from "react";

const Facebook: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const clipId = React.useId();

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M15.503 8.05024C15.503 3.60424 11.921 0.000244141 7.50298 0.000244141C3.08298 0.00124414 -0.499023 3.60424 -0.499023 8.05124C-0.499023 12.0682 2.42698 15.3982 6.25098 16.0022V10.3772H4.22098V8.05124H6.25298V6.27624C6.25298 4.25924 7.44798 3.14524 9.27498 3.14524C10.151 3.14524 11.066 3.30224 11.066 3.30224V5.28224H10.057C9.06398 5.28224 8.75398 5.90324 8.75398 6.54024V8.05024H10.972L10.618 10.3762H8.75298V16.0012C12.577 15.3972 15.503 12.0672 15.503 8.05024Z"
          fill="#161616"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.000976562 0.000244141)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Facebook;
