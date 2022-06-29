import React from "react";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import { flexColumn, flexRow } from "@styles";
import Colors from "@styles/colors";
import { SUMMARY_DUMMY_DATA } from "@lucian2Components/Dummy";

const MRSummaryBodyWrapCss = css`
  width: 100%;
  height: 1000px;
  background: #fff;
  border: 0.5px solid ${Colors.borderPrimary};
  border-radius: 8px;
  padding-left: 43px;
`;

const MRSummaryWrapCss = css`
  display: flex;
  width: 100%;
  height: auto;
  border-bottom: 0.5px solid ${Colors.borderPrimary};
  padding: 13px 0;
`;

const MRSummaryTitleCss = css`
  width: 295px;
`;

const MRSummaryListCss = css`
  ${flexRow};
`;

const MRSummaryDotCss = css`
  border-radius: 50%;
  background: ${Colors.modelRunDotColor};
  width: 5px;
  height: 5px;
  margin-right: 8px;
`;

export interface MRSummaryProps {
  title: string;
  answer: string;
  contents: Array<{
    id: string;
    contents: string;
  }>;
}

const MRSummary = () => {
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <div css={MRSummaryBodyWrapCss}>
        {SUMMARY_DUMMY_DATA.map((el, idx) => (
          <div css={MRSummaryWrapCss} key={idx}>
            {/* prettier-ignore */}
            <Typography.Body4 color={el.answer.length > 0 || el.contents.length >0 ? `${Colors.selectCategoryAmountBg}` : "#000"} css={MRSummaryTitleCss}>
              {el.title}
            </Typography.Body4>
            {/* prettier-ignore */}
            <div css={el.contents.length > 0 ? css`${flexColumn}`: css`${flexRow}`}>
              <Typography.Body2 color={Colors.modelRunDotColor}>{el.answer}</Typography.Body2>
              <ul>
                {el.contents.map((el, idx) => (
                  <li css={MRSummaryListCss} key={idx}>
                    <div css={MRSummaryDotCss}/>
                    <Typography.Body3 color={Colors.modelRunDotColor}>
                      {el.contents}
                    </Typography.Body3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MRSummary;
