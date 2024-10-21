import React from "react";

function Shape({ color, className }: { color?: string; className?: string }) {
  return (
    <svg
      className={className}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      {" "}
      <g clip-path="url(#clip0_238_1313)">
        {" "}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150L100 200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50L100 100L100 150L200 100L100 50Z"
          fill="url(#paint0_linear_238_1313)"
        />{" "}
      </g>{" "}
      <defs>
        {" "}
        <linearGradient
          id="paint0_linear_238_1313"
          x1="14"
          y1="26"
          x2="179"
          y2="179.5"
          gradientUnits="userSpaceOnUse">
          {" "}
          <stop stop-color={color} /> <stop offset="1" stop-color={color} />{" "}
        </linearGradient>{" "}
        <clipPath id="clip0_238_1313">
          {" "}
          <rect width="200" height="200" fill="white" />{" "}
        </clipPath>{" "}
      </defs>{" "}
    </svg>
  );
}

export default Shape;
