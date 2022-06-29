import React from "react";
import { css, Theme, useTheme } from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "src/styles/colors";
import Image from "next/image";
import { flexCenter, flexRowBetween } from "src/styles";

export interface Props {
  width?: number;
  minWidth?: number;
  title: string;
  checkedElements: Array<string>;
  showCategories: boolean;
}

const filterTagContainerWrap = (props: { theme: Theme; width: number }) => css`
  min-width: 150px;
  width: ${props.width ? `${props.width}px` : "100%"};
  height: 24px;
  border-radius: 12px;
  background: ${Colors.filterTagContainerBg};
  ${flexRowBetween};
  cursor: pointer;
  padding: 0 7px 0 11px;
`;

const selectCategoryStyle = () => css`
  display: flex;
  padding-bottom: 1px;
  font-weight: "Inter";
`;

const closeIconWrapStyle = () => css`
  ${flexCenter}
  cursor: pointer;
  padding-left: 11px;
`;

const selectCategoryAmountStyle = () => css`
  width: 33px;
  height: 16px;
  border-radius: 12px;
  margin: 0 0 0 7px;
  font-family: "Inter";
  letter-spacing: -0.03em;
  background: ${Colors.selectCategoryAmountBg};
  ${flexCenter};
`;

const FilterTag = ({
  width,
  title,
  checkedElements,
  showCategories,
  ...props
}: Props) => {
  const theme = useTheme();
  return (
    <div
      css={[
        filterTagContainerWrap({
          theme,
          width,
        }),
      ]}
    >
      <Typography.Base
        fontSize="12px"
        fontWeight="500"
        lineHeight="15px"
        color={Colors.backgroundWhite}
        css={selectCategoryStyle}
      >{`${title} : ${checkedElements[0]}`}</Typography.Base>
      {checkedElements.length === 1 && !showCategories && (
        <div css={closeIconWrapStyle}>
          <Image
            src="/img/lucian/small-close.png"
            alt="닫기"
            width={12}
            height={12}
          />
        </div>
      )}
      {checkedElements.length > 1 && (
        <Typography.Base
          fontSize="12px"
          fontWeight="500"
          lineHeight="15px"
          color={Colors.backgroundWhite}
          css={selectCategoryAmountStyle}
        >
          +{checkedElements.length - 1}
        </Typography.Base>
      )}
    </div>
  );
};

export default FilterTag;
