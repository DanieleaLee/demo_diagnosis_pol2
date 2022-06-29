import React, { FC } from "react";
import Image from "next/image";
import { FilterResultBoxType } from "./filterResultBoxType";
import {
  FilterResultBoxContainer,
  SelectedCategory,
  CloseIconWrap,
  SelectedCategoryAmount
} from "./filterResultBoxStyle";

/**
   clearFiltersHandler로 해당 필터링된 값들을 삭제
 */

/*
Filter 컴포넌트로부터 받아온 props
    checkedElements : 체크된 값들
    title 
    id : Filtered & checked category list 각각의 id
    showCategories : 필터링된 카테고리들을 보여주는 여부를 결정하는 State
*/

const FilterResultBox: FC<FilterResultBoxType> = ({
  checkedElements,
  title,
  id,
  clearFiltersHandler,
  showCategories
}) => {
  return (
    <FilterResultBoxContainer onClick={() => clearFiltersHandler(id)}>
      <SelectedCategory>{`${title} : ${checkedElements[0]}`}</SelectedCategory>
      {/* 선택된 체크박스가 한개일 경우 */}
      {checkedElements.length === 1 && !showCategories && (
        <CloseIconWrap>
          <Image
            src="/img/lucian/small-close.png"
            alt="닫기"
            width={12}
            height={12}
          />
        </CloseIconWrap>
      )}
      {/* 선택된 체크박스가 여러개일 경우 */}
      {checkedElements.length > 1 && (
        <SelectedCategoryAmount>
          +{checkedElements.length - 1}
        </SelectedCategoryAmount>
      )}
    </FilterResultBoxContainer>
  );
};

export default FilterResultBox;
