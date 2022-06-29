import React, { FC } from "react";
import Image from "next/image";
import {
  FilterTemplateContainer,
  FilterIconWithText,
  FilterContainerWrap,
  Text,
  FiltersWrap,
  FilterResultWrap,
  ApplyBtn
} from "./filterTemplateStyle";
import { FilterTemplateType } from "./filterTemplateType";

/*
Filter 컴포넌트로부터 받아온 props
  showCategories : 필터링된 카테고리들을 보여주는 여부를 결정하는 State
  filterData : Category List Array 
  filterResult : Filtered & checked category list
  sendDataByPressingApplyBtn : Apply 버튼 클릭 후 적용된 필터 정보 handler
  width 
*/

const FilterTemplate: FC<FilterTemplateType> = ({
  showCategories,
  filterData,
  filtersResult,
  sendDataByPressingApplyBtn,
  width
}) => {
  // 필터링된 결과를 보여주는 배열 안의 값들이 비어있는지 비어있지 않은지 알기 위한 boolean
  const isEmptyFilterResult = filtersResult.every((el: any) => el === false);
  // Filter값이 없는 상태로 Apply 눌렀을 때 Filter 텍스트 및 아이콘이 없어지도록
  const isShow = showCategories && isEmptyFilterResult;

  return (
    <FilterTemplateContainer showCategories={showCategories} width={width}>
      {!showCategories && (
        <FilterContainerWrap>{filterData}</FilterContainerWrap>
      )}
      <FiltersWrap>
        <div style={{ display: "flex", width: "100%" }}>
          {!isShow && (
            <FilterIconWithText>
              <Image
                src="/img/lucian/filter-small.png"
                alt=""
                width={17}
                height={17}
              />
              <Text>Filters</Text>
            </FilterIconWithText>
          )}
          <FilterResultWrap>{filtersResult}</FilterResultWrap>
        </div>
        {!showCategories && (
          <ApplyBtn onClick={sendDataByPressingApplyBtn}>Apply</ApplyBtn>
        )}
      </FiltersWrap>
    </FilterTemplateContainer>
  );
};

export default FilterTemplate;
