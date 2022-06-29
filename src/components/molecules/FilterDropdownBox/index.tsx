import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import { css } from '@emotion/react';

export const flexColumnBase = css`
  display: flex;
  flex-direction: column;
`;

interface FilterDropdownProps {
  title: string;
  list: Array<{ id: number | string; name: string }>;
  changeCheckedItemsState: (index: number, checkedArr: string[]) => void;
  index: number;
  checkedItems: string[];
}

const FilterDropdownBoxContainerWrap = () => css`
  padding-right: 10px;
`;

const FilterDropdownBox = ({ title, list, changeCheckedItemsState, index, checkedItems }: FilterDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState(''); // Dropdown 상위 검색창에 인풋하는 값의 상태
  const [show, setShow] = useState(false); // Dropdown 창 open & close 컨트롤하는 State
  const nodeRef = useRef<HTMLDivElement>(null);
  // 검색창에서 텍스트 검색시 필터링
  const searchFilteredList = list.filter((inputText) => {
    return inputText.name.toString().toLowerCase().includes(searchTerm.toLowerCase());
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
      changeCheckedItemsState(index, temp);
    } else {
      // 체크박스가 체크가 해제될 경우 인덱스의 배열에서 해당 값 제거
      changeCheckedItemsState(
        index,
        checkedItems.filter((item) => item !== value)
      );
    }
  };

  // 체크박스 초기화
  const clearCheckedItemsHandler = () => {
    setShow(false);
    changeCheckedItemsState(index, []);
  };

  // 드롭다운 open & close 핸들러
  const openDropdownHandler = () => {
    setShow((prev) => !prev);
    //dropdown 닫히면 검색창에 검색된 input text값 초기화
    if (show === false) {
      setSearchTerm('');
    }
  };

  // Dropdown 외부 영역을 클릭할 경우 드롭다운이 닫히게 하는 logic
  useEffect(() => {
    let handler = (event: any) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div css={FilterDropdownBoxContainerWrap} ref={nodeRef}>
      <div
        css={css`
          ${flexColumnBase}
        `}
      >
        <Dropdown
          // width 조정
          title={title}
          filteredData={searchFilteredList}
          checkedItems={checkedItems}
          show={show}
          clearCheckedItemsHandler={clearCheckedItemsHandler}
          openDropdownHandler={openDropdownHandler}
          searchTermHandler={searchTermHandler}
          onChangeHandler={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default FilterDropdownBox;
