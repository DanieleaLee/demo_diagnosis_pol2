import React, { FC, useCallback } from "react";
import classNames from "classnames";
import {
  SearchBarWrap,
  ButtonWrap,
  SearchContainer,
  Wrap,
  SearchIconWrap,
  SearchBarInput,
  AllClearBtn
} from "./searchBarStyle";
import { SearchBarType, SearchBarWithFilterBtnType } from "./searchbarType";
import Image from "next/image";

//************ Search bar with filter button 컴포넌트  ************* */
/*
Filters 컴포넌트로부터 받아온 props
  sendDataPressingEnterKey : Enter Key 입력시 적용된 필터 정보 handler
  sendDataPressingSearchBtn : Search 버튼 클릭 시 적용된 필터 정보 handler
  addInputValHandler : Search bar에 input한 텍스트값 추가 핸들러
  showCategories : 필터링된 카테고리들을 보여주는 여부를 결정하는 State
  openFilterContainer : Searchbox에서 필터 버튼 클릭 시 열리는 filter container open 여부를 결정하는 State
  clearInputValHandler : Input한 Text값을 clear해주는 핸들러
  openFilterContainerHandler : Filter Container open control handler
  inputVal : Input한 Text값
  setInputVal : Input한 Text값을 update state 
  width 
*/

const SearchBarWithFilterButton: FC<SearchBarWithFilterBtnType> = ({
  sendDataPressingEnterKey,
  sendDataByPressingSearchBtn,
  addInputValHandler,
  showCategories,
  openFilterContainer,
  clearInputValHandler,
  openFilterContainerHandler,
  inputVal,
  setInputVal,
  width = 972
}) => {
  return (
    <SearchBarWrap>
      <SearchBar
        // width 조정
        width={width}
        sendDataByPressingSearchBtn={sendDataByPressingSearchBtn}
        sendDataPressingEnterKey={sendDataPressingEnterKey}
        addInputValHandler={addInputValHandler}
        clearInputValHandler={clearInputValHandler}
        inputVal={inputVal}
        setInputVal={setInputVal}
      />
      {/* Filter Button (Filter Box Open & Close 위한 버튼) */}
      {/* <ButtonWrap
        onClick={openFilterContainerHandler}
        disabled={openFilterContainer === true && showCategories === false}
      >
        <Image src="/img/lucian/filter.png" alt="" width={22} height={22} />
      </ButtonWrap> */}
    </SearchBarWrap>
  );
};

//************ Search bar 컴포넌트  ************* */
/* 
SearchBarWithFilterButton 컴포넌트를 통해 받아온 props
  width 
  height
  clearInputValHandler : Input한 Text값을 clear해주는 핸들러
  sendDataByPressingSearchBtn : Search 버튼 클릭 시 적용된 필터 정보 handler
  sendDataPressingEnterKey : Enter Key 입력시 적용된 필터 정보 handler
  inputVal : Input한 Text값
  setInputVal : Input한 Text값을 update state
*/
const SearchBar: FC<SearchBarType> = ({
  width,
  height,
  clearInputValHandler,
  sendDataByPressingSearchBtn,
  sendDataPressingEnterKey,
  inputVal,
  setInputVal
}) => {
  // input에 입력하는 값들을 onChange하기 위한 handler
  const inputWordHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      setInputVal(e.currentTarget.value);
    },
    [setInputVal]
  );

  return (
    <SearchContainer
      width={width}
      height={height}
      className={classNames({ active: inputVal.length > 0 })}
    >
      <Wrap>
        {/* Search bar input */}
        <SearchBarInput
          placeholder="Search"
          value={inputVal}
          onKeyPress={sendDataPressingEnterKey}
          onChange={inputWordHandler}
        />
        {/* 검색 아이콘 */}
        <SearchIconWrap onClick={sendDataByPressingSearchBtn}>
          <Image src="/img/lucian/search.png" alt="" width={36} height={36} />
        </SearchIconWrap>
        {/* X Button */}
        <AllClearBtn onClick={() => clearInputValHandler()}>
          <Image
            src="/img/lucian/close-ver2.png"
            alt="닫기"
            width={11.31}
            height={11.31}
          />
        </AllClearBtn>
      </Wrap>
    </SearchContainer>
  );
};

export default SearchBarWithFilterButton;
