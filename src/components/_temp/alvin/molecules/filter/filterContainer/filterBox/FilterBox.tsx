import React, { ChangeEvent, FC, useState, useRef, useEffect } from "react";
import { FilterBoxType } from "./filterBoxType";
import { Container, DropdownWrap } from "./filterBoxStyle";
import Dropdown from "@lucianComponents/molecules/filter/filterContainer/dropdown/Dropdown";

// ********* Filter Box 컴포넌트 *********//
/*
Filter Box : 각 카테고리 박스
*/

/*
Filter 컴포넌트로부터 받는 props
title 
data : fakeData내에 있는 각 드롭다운내 체크박스 리스트들
changeCheckedItemsState :  Apply 버튼 클릭 시, Filter Category list display 컨트롤 핸들러
id : 카테고리 박스의 id
checkedItems : 체크된 아이템들을 모아놓은 배열
*/

const FilterBox: FC<FilterBoxType> = ({
  title,
  data,
  changeCheckedItemsState,
  id,
  checkedItems
}) => {
  // Dropdown 상위 검색창에 인풋하는 값의 상태
  const [searchTerm, setSearchTerm] = useState("");
  // Dropdown 창 open & close 컨트롤하는 State
  const [show, setShow] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  // 검색창에서 텍스트 검색시 필터링
  const searchFilteredData = data.filter((inputText) => {
    return inputText.name
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  // 검색창에 검색된 텍스트값으로 변경
  const searchTermHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  // 체크박스 onChange Handler
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.currentTarget;

    if (checked) {
      // 체크박스 체크가 될 경우 해당 인덱스의 배열에 체크한 값 추가
      const temp = checkedItems.concat(value);
      changeCheckedItemsState(id, temp);
    } else {
      // 체크박스가 체크가 해제될 경우 인덱스의 배열에서 해당 값 제거
      changeCheckedItemsState(
        id,
        checkedItems.filter((item) => item !== value)
      );
    }
  };

  // 체크박스 초기화
  const clearCheckedItemsHandler = () => {
    setShow(false);
    changeCheckedItemsState(id, []);
  };

  // 드롭다운 open & close 핸들러
  const openDropdownHandler = () => {
    setShow((prev) => !prev);
    //dropdown 닫히면 검색창에 검색된 input text값 초기화
    if (show === false) {
      setSearchTerm("");
    }
  };

  // Dropdown 외부 영역을 클릭할 경우 드롭다운이 닫히게 하는 logic
  useEffect(() => {
    let handler = (event: any) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Container ref={nodeRef}>
      <DropdownWrap>
        <Dropdown
          // width 조정
          id={id}
          title={title}
          filteredData={searchFilteredData}
          checkedItems={checkedItems}
          show={show}
          clearCheckedItemsHandler={clearCheckedItemsHandler}
          openDropdownHandler={openDropdownHandler}
          searchTermHandler={searchTermHandler}
          onChangeHandler={onChangeHandler}
        />
      </DropdownWrap>
    </Container>
  );
};

export default FilterBox;
