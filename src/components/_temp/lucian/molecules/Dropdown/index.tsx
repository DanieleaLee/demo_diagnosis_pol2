import React, { useRef, useEffect } from "react";
import classNames from "classnames";
import Checkbox from "@lucianComponents/atoms/Checkbox";
import SmallSearchIcon from "@lucianComponents/atoms/Icon/SmallSearchIcon";
import FilledArrowDownIcon from "@lucianComponents/atoms/Icon/FilledArrowDownIcon";
import { flexColumnBase } from "@lucianComponents/organisms/Filter/flex_hotfix";
import Buttonable from "@components/atoms/Buttonable";
import Image from "next/image";
import { css } from "@emotion/react";
import Colors from "src/styles/colors";
import { flexCenter, flexRow, flexRowBetween } from "src/styles";
import * as Typography from "@styles/typography";

interface Props {
  width?: number;
  title: string;
  checkedItems: string[];
  filteredData: Array<{ id: number; name: string }>;
  show: boolean;
  clearCheckedItemsHandler: () => void;
  openDropdownHandler: () => void;
  searchTermHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const dropdownContainerWrap = ({ width }: Pick<Props, "width">) => css`
  ${flexColumnBase};
  width: ${width ? `${width}px` : "100%"};
  height: auto;
  margin-right: 10px;
  position: relative;
`;

const titleStyle = () => css`
  font-family: "Inter";
  padding-bottom: 3px;
`;

const dropdownUpperBtnWrap = () => css`
  border: 0.5px solid ${Colors.hint};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  width: 100%;
  height: 41px;
  ${flexRowBetween};
  cursor: pointer;

  &.active {
    border-bottom: none;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const textWrapStyle = () => css`
  ${flexRowBetween};
  width: 100%;
  padding-left: 16px;
`;

const searchContainerWrap = () => css`
  ${flexRow};
  padding-left: 10.33px;
  font-size: 12px;
  font-family: "Inter";
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.03em;
  padding-right: 13px;
  color: ${Colors.primary4};
`;

const searchInputStyle = () => css`
  flex: 1;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  width: 100%;
  padding-left: 7.96px;
  color: black;
`;

const filledArrowDownIconWrap = () => css`
  width: 100%;
  height: 100%;
  ${flexRow};
  justify-content: flex-end;
  padding-right: 13px;
`;

const dropdownLowerContentsWrap = () => css`
  position: absolute;
  width: 100%;
  top: 58px;
  z-index: 100;
  background: ${Colors.backgroundWhite};
`;

const clearSelectionStyle = () => css`
  ${flexRow};
  width: 100%;
  height: 19px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 0.5px solid ${Colors.hint};
  border-top: 0;
  padding-left: 7px;
  cursor: pointer;
`;

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

const Dropdown = ({
  width,
  title,
  checkedItems,
  filteredData,
  show,
  clearCheckedItemsHandler,
  openDropdownHandler,
  searchTermHandler,
  onChangeHandler,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // show가 되면 input focusing된다.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  return (
    <div css={[dropdownContainerWrap({ width })]}>
      <Typography.Base
        fontSize="12px"
        fontWeight="500"
        lineHeight="15px"
        color={Colors.selectCategoryAmountBg}
        css={titleStyle}
      >
        {title}
      </Typography.Base>
      <div css={dropdownUpperBtnWrap} className={classNames({ active: show })}>
        {/* 체크된 체크박스가 1개 이상이고 드롭다운이 닫혔을 경우 */}
        {checkedItems.length > 0 && show === false && (
          <div css={textWrapStyle} onClick={openDropdownHandler}>
            <Typography.Base fontSize="12px" fontWeight="500" lineHeight="15px">
              {checkedItems[0]}
            </Typography.Base>
            <Buttonable
              css={css`
                ${flexCenter}
                padding-right:12px;
              `}
              onClick={clearCheckedItemsHandler}
            >
              <Image
                src="/img/lucian/close.png"
                alt="닫기"
                width={17}
                height={17}
              />
            </Buttonable>
          </div>
        )}
        {/* 드롭다운이 열려있을 경우 */}
        {show === true && (
          <div css={searchContainerWrap}>
            <SmallSearchIcon />
            <input
              css={searchInputStyle}
              ref={inputRef}
              type="text"
              placeholder="Search"
              onChange={searchTermHandler}
            />
            <FilledArrowDownIcon onClick={openDropdownHandler} />
          </div>
        )}
        {/* 체크된 체크박스가 없고 드롭다운이 닫혀있을 경우 */}
        {checkedItems.length === 0 && show === false && (
          <div css={filledArrowDownIconWrap} onClick={openDropdownHandler}>
            <FilledArrowDownIcon />
          </div>
        )}
      </div>
      {/* 드롭다운이 열릴 경우 나타나는 하부 체크박스 그룹 및 Clear Selection  */}
      {show && (
        <div css={dropdownLowerContentsWrap}>
          {/* 체크박스 그룹 컴포넌트 */}
          <MultipleCheckbox
            data={filteredData}
            onChangeHandler={onChangeHandler}
            checkedItems={checkedItems}
          />
          {/* Selected된 체크박스를 모두 clear시켜준다. */}
          <Typography.Base
            fontSize="8px"
            lineHeight="10px"
            css={clearSelectionStyle}
            onClick={clearCheckedItemsHandler}
          >
            Clear Selection
          </Typography.Base>
        </div>
      )}
    </div>
  );
};

interface MultipleCheckboxProps {
  data: Array<{ id: number; name: string }>;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checkedItems: Array<string>;
}

const multipleCheckboxContainerWrap = () => css`
  font-family: "Inter";
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: ${Colors.primary7};
  border: 0.5px solid ${Colors.hint};
  margin: 0;
  padding-right: 17px;
  width: 100%;
`;

const multipleCheckboxWrap = () => css`
  max-height: 142px;
  overflow-y: overlay;
  overflow-x: hidden;
  margin: 9px 0 8px 0;

  &::-webkit-scrollbar {
    background: ${Colors.disabled};
    border-radius: 1.5px;
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: ${Colors.selectCategoryAmountBg};
  }
`;

const singleCheckboxStyle = () => css`
  ${flexRow};
  cursor: pointer;
  padding: 0 20px;

  &:hover {
    background: rgba(196, 196, 196, 0.15);
    color: ${Colors.primary4};
    font-weight: 500;
  }

  &.active {
    background: rgba(196, 196, 196, 0.15);
    color: ${Colors.primary4};
    font-weight: 600;
  }
`;

/********MultipleCheckbox 컴포넌트****** */
/*
data : 검색창에 입력한 input값을  포함한 필터링된 데이터
onChangeHandler : 체크박스 체크/체크해제 함수
checkedItems : 체크된 아이템들을 모아놓은 배열
*/

const MultipleCheckbox = ({
  data,
  onChangeHandler,
  checkedItems,
}: MultipleCheckboxProps) => {
  return (
    <div css={multipleCheckboxContainerWrap}>
      <ul css={multipleCheckboxWrap}>
        {/* 검색한 텍스트가 드롭다운 안의 체크박스에 존재하지 않을 경우 */}
        {data.length === 0 && (
          <Typography.Base
            css={css`
              padding-left: 20px;
            `}
          >
            Checklist Not Found
          </Typography.Base>
        )}
        {/* 검색한 텍스트가 드롭다운 안의 체크박스에 존재할 경우 */}
        {data.map((el) => (
          <li
            css={singleCheckboxStyle}
            key={el.id}
            /* 체크된 체크박스들이 el.name을 포함하면 "active" className 부여 */
            className={classNames({
              active: checkedItems.includes(el.name),
            })}
          >
            <label
              css={css`
                cursor: pointer;
              `}
              htmlFor={el.name}
            >
              <Checkbox
                id={el.name}
                name={el.name}
                value={el.name}
                checked={checkedItems.includes(el.name)}
                onChange={onChangeHandler}
              />
              {el.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
