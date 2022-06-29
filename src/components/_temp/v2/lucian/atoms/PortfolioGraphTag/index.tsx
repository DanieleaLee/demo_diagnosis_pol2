import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { flexRow, flexCenter } from "@styles";
import * as Typography from "@styles/typography";

const PfGraphTagBodyCss = (width: number) => css`
  width: ${width}px;
  height: 24.47px;
  ${flexRow};
`;

const PfGraphTagLeftColorBgCss = (
  colorWidth: number,
  backgroundColor = Colors.primary2
) => css`
  background-color: ${backgroundColor};
  width: ${colorWidth}px;
  height: 100%;
  border: 1px solid transparent;
  border-top-left-radius: 1.95738px;
  border-bottom-left-radius: 1.95738px;
`;

const PfGraphTagNameCss = css`
  height: 100%;
  box-shadow: 0 0 1.95738px rgba(0, 0, 0, 0.1);
  border: 0.978692px solid ${Colors.primary6};
  border-radius: 1.95738px;
  background: ${Colors.backgroundWhite};
  ${flexCenter};
`;

const PfGraphTextCss = css`
  padding: 0 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface Props {
  width?: number;
  colorWidth?: number;
  backgroundColor: Required<string>;
  tagName: Required<string>;
}

const PortfolioGraphTag = ({
  width,
  colorWidth,
  backgroundColor,
  tagName,
}: Props) => {
  return (
    <div css={[PfGraphTagBodyCss(width)]}>
      <div css={PfGraphTagLeftColorBgCss(colorWidth, backgroundColor)} />
      <div css={PfGraphTagNameCss}>
        <Typography.Base
          fontSize="9.78692px"
          fontWeight="400"
          lineHeight="12px"
          color={Colors.buttonSubmit}
          css={[PfGraphTextCss]}
        >
          {tagName}
        </Typography.Base>
      </div>
    </div>
  );
};

export default PortfolioGraphTag;
