import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";

const CardContainerCss = (width = 385, height = 359) => css`
  border-radius: 17.026px;
  box-shadow: 0 0 6.81041px rgba(0, 0, 0, 0.25);
  width: ${width}px;
  height: ${height}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &.clicked {
    border: 3px solid ${Colors.button3Text};
  }
`;

interface Props {
  children: React.ReactNode;
  width?: number;
  height?: number;
  clicked?: boolean;
  onClick?: () => void;
}

const Card = ({ children, width, height, clicked, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      css={[CardContainerCss(width, height)]}
      className={clicked ? "clicked" : ""}
    >
      {children}
    </div>
  );
};

export default Card;
