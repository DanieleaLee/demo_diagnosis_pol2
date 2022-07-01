import React from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";

const PfTagBodyCss = (width, height) => css`
  width: ${width}px;
  height: ${height}px;
  background: ${Colors.portfolioTagBg};
  border-radius: 15.5px;
  padding: 4px 13px;
  display: inline-block;
`;

interface Props {
  title: string;
  element: string | string[] | number;
  width?: number;
  height?: number;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
}

const Tag = ({
  title,
  element,
  width,
  height,
  fontSize = 15,
  fontWeight = 600,
  lineHeight = 18
}: Props) => {
  return (
    <div css={[PfTagBodyCss(width, height)]}>
      <Typography.Base
        fontSize={`${fontSize}px`}
        fontWeight={`${fontWeight}`}
        lineHeight={`${lineHeight}px`}
        color={Colors.selectBoxBorder}
        css={css`
          font-family: "Inter";
        `}
      >
        {title} :{" "}
        {Array.isArray(element)
          ? element[0] + ` +${element.length - 1}`
          : element}
      </Typography.Base>
    </div>
  );
};

export default Tag;
