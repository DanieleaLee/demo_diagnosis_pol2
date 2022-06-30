import React from "react";
import { css } from "@emotion/react";
import BasicBox from "@components/atoms/BasicBox";
import * as Typography from "@styles/typography";
import { BiShare } from "react-icons/bi";

const titleStyle = css`
  margin-bottom: 6px;
`;
const rowStyle = css`
  height: 31px;
  border-bottom: 0.5px solid #ced9e1;
  display: flex;
  align-items: center;
  &:last-child {
    border: none;
  }
`;
type LinkToindexProps = {
  categories: string[];
};
const LinkToindex = ({ categories }: LinkToindexProps) => {
  const renderRow = (rowId: string) => {
    return (
      <div css={[rowStyle]} key={rowId}>
        <Typography.Subtitle3 color="#2F3B43" lineHeight="18.15px">
          <a href={`#${rowId}`}>
            Stock Diagnosis -
            <span
              css={css`
                font-size: 0.9375rem;
                font-weight: 600;
                font-family: "Inter";
                color: #2f3b43;
              `}
            >
              {" "}
              {rowId}
            </span>
            <BiShare
              size={19}
              css={css`
                transform: scaleX(-1);
                margin-left: 5px;
              `}
            />
          </a>
        </Typography.Subtitle3>
      </div>
    );
  };
  return (
    <BasicBox height={229} borderColor="#CED9E1" paddingTop={28} paddingRight={35} paddingBottom={22} paddingLeft={35}>
      <Typography.Subtitle2 color="#2F3B43" lineHeight="18.15px" css={titleStyle}>
        Table of Contents
      </Typography.Subtitle2>
      {categories?.map((c, i) => renderRow(c))}
    </BasicBox>
  );
};

export default LinkToindex;
