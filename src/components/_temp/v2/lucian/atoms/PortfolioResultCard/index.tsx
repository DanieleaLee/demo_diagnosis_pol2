import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { CgClose } from "react-icons/cg";

const PfResultCardBodyCss = (width, height) => css`
  width: ${width ? `${width}px` : "100%"};
  height: ${height ? `${height}px` : "auto"};
  min-height: 158px;
  border: 2px dashed ${Colors.searchbarBorder};
  border-radius: 10px;
  background: ${Colors.backgroundWhite};
  cursor: pointer;
  position: relative;

  &.clicked {
    border: 1.5px solid ${Colors.button2};
    box-shadow: 0 0 10px rgba(84, 106, 120, 0.15);
  }
`;

const PfResultCardCloseBtnCss = css`
  position: absolute;
  right: 15.59px;
  top: 10.52px;
`;

interface Props {
  children: React.ReactNode;
  width?: number;
  height?: number;
  clicked?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
}

const PortfolioResultCard = ({
  children,
  width,
  height,
  clicked,
  onSelect,
  onRemove,
}: Props) => {
  return (
    <div
      onClick={onSelect}
      css={[PfResultCardBodyCss(width, height)]}
      className={clicked ? "clicked" : ""}
    >
      {clicked && (
        <div onClick={onRemove} css={PfResultCardCloseBtnCss}>
          <CgClose size={16.97} color={Colors.portfolioCloseBtnColor} />
        </div>
      )}
      {children}
    </div>
  );
};

export default PortfolioResultCard;
