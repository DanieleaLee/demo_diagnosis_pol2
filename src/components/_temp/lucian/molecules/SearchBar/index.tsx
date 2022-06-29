import React, { useCallback } from "react";
import classNames from "classnames";
import { css } from "@emotion/react";
import Image from "next/image";
import { flexCenter, flexRow } from "src/styles";
import Colors from "src/styles/colors";
import Buttonable from "src/components/atoms/Buttonable";

export const flexColumnBase = css`
  display: flex;
  flex-direction: column;
`;


interface Props {
  sendDataPressingEnterKey: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  sendDataByPressingSearchBtn: () => void;
  addInputValHandler: (text: string) => void;
  clearInputValHandler: () => void;
  openFilterContainerHandler: () => void;
  inputVal: string;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
  openFilterContainer: boolean;
  showCategories: boolean;
  width?: number;
}

const searchBarWithFilterBtnContainerWrap = () => css`
  padding-bottom: 12px;
  ${flexRow}
`;

const showFilterButtonWrap = () => css`
  border-radius: 4px;
  background: ${Colors.filterTagContainerBg};
  ${flexCenter};
  width: 30px;
  height: 34px;
  margin-left: 8px;
  outline: none;
  border: none;

  &:disabled {
    background: gray;
  }
`;

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

const SearchBarWithFilterButton = ({
  sendDataPressingEnterKey,
  sendDataByPressingSearchBtn,
  addInputValHandler,
  showCategories,
  openFilterContainer,
  clearInputValHandler,
  openFilterContainerHandler,
  inputVal,
  setInputVal,
  width = 972,
}: Props) => {
  return (
    <div css={searchBarWithFilterBtnContainerWrap}>
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
      <button
        css={showFilterButtonWrap}
        onClick={openFilterContainerHandler}
        disabled={openFilterContainer === true && showCategories === false}
      >
        <Image src="/img/lucian/filter.png" alt="" width={22} height={22} />
      </button>
    </div>
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
interface SearchBarProps {
  width?: number;
  height?: number;
  addInputValHandler: (text: string) => void;
  clearInputValHandler: () => void;
  sendDataByPressingSearchBtn: () => void;
  sendDataPressingEnterKey: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  inputVal: string;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
}

const searchBarContainerWrap = ({
  width,
  height,
}: Pick<SearchBarProps, "width" | "height">) => css`
  width: ${width ? `${width}px` : "100%"};
  height: ${height ? `${height}px` : "auto"};
  ${flexColumnBase};
  border-radius: 8px;
  border: 1px solid ${Colors.searchbarBorder};
  padding-right: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
`;

const searchBarInputStyle = () => css`
  font-family: "Inter";
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  color: ${Colors.buttonSubmit};
  margin-left: 21px;
  flex: auto;
  border: none;

  &::placeholder {
    color: ${Colors.primary7};
  }
`;

const searchIconWrapStyle = () => css`
  cursor: pointer;
  border-right: 1px solid ${Colors.searchbarBorder};
  padding: 11px 7px 3px 0;
`;

const allClearBtnStyle = () => css`
  padding-left: 20px;
`;

const SearchBar = ({
  width,
  height,
  clearInputValHandler,
  sendDataByPressingSearchBtn,
  sendDataPressingEnterKey,
  inputVal,
  setInputVal,
}: SearchBarProps) => {
  // input에 입력하는 값들을 onChange하기 위한 handler
  const inputWordHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      setInputVal(e.currentTarget.value);
    },
    [setInputVal]
  );

  return (
    <div
      css={[searchBarContainerWrap({ width, height })]}
      className={classNames({ active: inputVal.length > 0 })}
    >
      <div
        css={css`
          ${flexRow}
        `}
      >
        {/* Search bar input */}
        <input
          css={searchBarInputStyle}
          placeholder="Search"
          value={inputVal}
          onKeyPress={sendDataPressingEnterKey}
          onChange={inputWordHandler}
        />
        {/* 검색 아이콘 */}
        <div css={searchIconWrapStyle} onClick={sendDataByPressingSearchBtn}>
          <Image src="/img/lucian/search.png" alt="" width={36} height={36} />
        </div>
        {/* X Button */}
        <Buttonable
          css={allClearBtnStyle}
          onClick={() => clearInputValHandler()}
        >
          <Image
            src="/img/lucian/close-ver2.png"
            alt="닫기"
            width={11.31}
            height={11.31}
          />
        </Buttonable>
      </div>
    </div>
  );
};

export default SearchBarWithFilterButton;
