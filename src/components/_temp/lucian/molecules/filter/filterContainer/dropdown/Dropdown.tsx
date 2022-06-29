import React, { FC, useRef, useEffect } from "react";
import classNames from "classnames";
import {
  Container,
  Title,
  DropdownLowerContents,
  ClearSelection,
  DropdownUpperBtnContainer,
  TextWrap,
  FirstCheckedText,
  RemoveBtn,
  IconWrap,
  SearchContainer,
  SearchInput,
  MultiCheckboxContainer,
  Wrap,
  NotIncluded,
  SingleCheckboxList,
  Label
} from "./dropdownStyle";
import { DropdownType, MultiCheckboxType } from "./dropdownType";
import Checkbox from "./Checkbox";
import SmallSearchIcon from "./SmallSearchIcon";
import FilledArrowDownIcon from "./FilledArrowDownIcon";
import Image from "next/image";

/********Dropdown 컴포넌트****** */

/*
상위 컴포넌트로부터 
width 
title
checkedItems : 체크된 아이템들을 모아놓은 배열
filteredData : 검색창에 입력한 input값을  포함한 필터링된 데이터
show : Dropdown open & close control하는 state
clearCheckedItemsHandler : 체크박스 초기화 함수
openDropdownHandler : 드롭다운 open & close 핸들러
searchTermHandler : 검색창에서 입력된 값을 받아오는 함수
onChangeHandler : 체크박스 체크/체크해제 함수 
props로 받아온다
*/

const Dropdown: FC<DropdownType> = ({
  width,
  title,
  checkedItems,
  filteredData,
  show,
  clearCheckedItemsHandler,
  openDropdownHandler,
  searchTermHandler,
  onChangeHandler
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // show가 되면 input focusing된다.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  return (
    <Container width={width}>
      <Title>{title}</Title>
      <DropdownUpperBtnContainer className={classNames({ active: show })}>
        {/* 체크된 체크박스가 1개 이상이고 드롭다운이 닫혔을 경우 */}
        {checkedItems.length > 0 && show === false && (
          <TextWrap onClick={openDropdownHandler}>
            <FirstCheckedText>{checkedItems[0]}</FirstCheckedText>
            <RemoveBtn onClick={clearCheckedItemsHandler}>
              <Image
                src="/img/lucian/close.png"
                alt="닫기"
                width={17}
                height={17}
              />
            </RemoveBtn>
          </TextWrap>
        )}
        {/* 드롭다운이 열려있을 경우 */}
        {show === true && (
          <SearchContainer>
            <SmallSearchIcon />
            <SearchInput
              ref={inputRef}
              type="text"
              placeholder="Search"
              onChange={searchTermHandler}
            />
            <FilledArrowDownIcon onClick={openDropdownHandler} />
          </SearchContainer>
        )}
        {/* 체크된 체크박스가 없고 드롭다운이 닫혀있을 경우 */}
        {checkedItems.length === 0 && show === false && (
          <IconWrap onClick={openDropdownHandler}>
            <FilledArrowDownIcon />
          </IconWrap>
        )}
      </DropdownUpperBtnContainer>
      {/* 드롭다운이 열릴 경우 나타나는 하부 체크박스 그룹 및 Clear Selection  */}
      {show && (
        <DropdownLowerContents>
          {/* 체크박스 그룹 컴포넌트 */}
          <MultipleCheckbox
            data={filteredData}
            onChangeHandler={onChangeHandler}
            checkedItems={checkedItems}
          />
          {/* Selected된 체크박스를 모두 clear시켜준다. */}
          <ClearSelection onClick={clearCheckedItemsHandler}>
            Clear Selection
          </ClearSelection>
        </DropdownLowerContents>
      )}
    </Container>
  );
};


/********MultipleCheckbox 컴포넌트****** */
/*
data : 검색창에 입력한 input값을  포함한 필터링된 데이터
onChangeHandler : 체크박스 체크/체크해제 함수
checkedItems : 체크된 아이템들을 모아놓은 배열
*/

const MultipleCheckbox: FC<MultiCheckboxType> = ({
  data,
  onChangeHandler,
  checkedItems
}) => {
  return (
    <MultiCheckboxContainer>
      <Wrap>
        {/* 검색한 텍스트가 드롭다운 안의 체크박스에 존재하지 않을 경우 */}
        {data.length === 0 && <NotIncluded>Checklist Not Found</NotIncluded>}
        {/* 검색한 텍스트가 드롭다운 안의 체크박스에 존재할 경우 */}
        {data.map((el) => (
          <SingleCheckboxList
            key={el.id}
            /* 체크된 체크박스들이 el.name을 포함하면 "active" className 부여 */
            className={classNames({
              active: checkedItems.includes(el.name)
            })}
          >
            <Label htmlFor={el.name}>
              <Checkbox
                id={el.name}
                name={el.name}
                value={el.name}
                checked={checkedItems.includes(el.name)}
                onChange={onChangeHandler}
              />
              {el.name}
            </Label>
          </SingleCheckboxList>
        ))}
      </Wrap>
    </MultiCheckboxContainer>
  );
};


export default Dropdown;

