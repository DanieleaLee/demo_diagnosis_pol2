import React from "react";
import Image from "next/image";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { css } from "@emotion/react";
import Colors from "src/styles/colors";
import * as Typography from "@styles/typography";
import Buttonable from "src/components/atoms/Buttonable";


export const flexRowBetweenBase = css`
  display: flex;
  justify-content: space-between;
`;

export const flexColumnBase = css`
  display: flex;
  flex-direction: column;
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;


interface Props {
  showCategories: boolean;
  filterData: EmotionJSX.Element[];
  filtersResult: EmotionJSX.Element[];
  sendDataByPressingApplyBtn: () => void;
  width?: number;
}

const filterTemplateContainerWrap = ({
  width,
  showCategories,
}: Pick<Props, "width" | "showCategories">) => css`
  ${flexColumnBase};
  width: ${width ? `${width}px` : "100%"};
  height: auto;
  background: ${Colors.backgroundWhite};
  border-radius: ${showCategories === true ? "0" : "4px"};
  box-shadow: ${showCategories === true ? "0" : "0 0 4px rgba(0,0,0,0.15)"};
  padding: 16px 15px 15px 18px;
`;

const filterContainerWrap = () => css`
  display: flex;
  padding-bottom: 15px;
`;

const filterIconWithTextWrap = () => css`
  font-family: "Inter";
  display: inline-flex;
  align-items: center;
  width: 75px;
`;

const filterResultWrap = () => css`
  display: flex;
  flex-wrap: wrap;
  max-width: 1320px;
  width: 100%;
`;

const applyBtnStyle = () => css`
  width: 109px;
  height: 26px;
  font-family: "Inter";
  font-size: 12px;
  font-weight: 600;
  ${flexCenter};
  background: ${Colors.selectCategoryAmountBg};
  color: ${Colors.backgroundWhite};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

/*
Filter 컴포넌트로부터 받아온 props
  showCategories : 필터링된 카테고리들을 보여주는 여부를 결정하는 State
  filterData : Category List Array 
  filterResult : Filtered & checked category list
  sendDataByPressingApplyBtn : Apply 버튼 클릭 후 적용된 필터 정보 handler
  width 
*/

const FilterTemplate = ({
  showCategories,
  filterData,
  filtersResult,
  sendDataByPressingApplyBtn,
  width,
}: Props) => {
  // 필터링된 결과를 보여주는 배열 안의 값들이 비어있는지 비어있지 않은지 알기 위한 boolean
  const isEmptyFilterResult = filtersResult.every((el: any) => el === false);
  // Filter값이 없는 상태로 Apply 눌렀을 때 Filter 텍스트 및 아이콘이 없어지도록
  const isShow = showCategories && isEmptyFilterResult;

  return (
    <div css={[filterTemplateContainerWrap({ width, showCategories })]}>
      {!showCategories && <div css={filterContainerWrap}>{filterData}</div>}
      <div
        css={css`
          ${flexRowBetweenBase}
        `}
      >
        <div
          css={css`
            display: flex;
            width: 100%;
          `}
        >
          {!isShow && (
            <Typography.Base
              fontSize="15px"
              fontWeight="500"
              lineHeight="18px"
              color={Colors.filtersText}
              css={filterIconWithTextWrap}
            >
              <Image
                src="/img/lucian/filter-small.png"
                alt=""
                width={17}
                height={17}
              />
              <p>Filters</p>
            </Typography.Base>
          )}
          <div css={filterResultWrap}>{filtersResult}</div>
        </div>
        {!showCategories && (
          <Buttonable css={applyBtnStyle} onClick={sendDataByPressingApplyBtn}>
            Apply
          </Buttonable>
        )}
      </div>
    </div>
  );
};

export default FilterTemplate;
