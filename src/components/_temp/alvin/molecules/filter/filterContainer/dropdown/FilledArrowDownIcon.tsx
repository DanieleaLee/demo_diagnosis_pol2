import React, { FC } from "react";

const FilledArrowDownIcon: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 6L0.669873 1.38009e-07L9.33013 8.95112e-07L5 6Z"
        fill="#2F3B43"
      />
    </svg>
  );
};

export default FilledArrowDownIcon;
