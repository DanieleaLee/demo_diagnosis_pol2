import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import Colors from '@styles/colors';
import { MdFilterAlt } from 'react-icons/md';
import FilterTag from '@components/atoms/FilterTag';
import SearchBar from '@components/molecules/SearchBar';
import FilterDropdownBox from '@components/molecules/FilterDropdownBox';
import * as TextButton from '@components/atoms/TextButton/index';

const searchContainerStyle = css`
  padding-bottom: 12px;
  display: flex;
  align-items: center;
`;
const filterToggleStyle = (backgroundColor) => css`
  width: 30px;
  height: 34px;
  background: ${backgroundColor};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  border: none;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const filterContainerStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  background: ${Colors.backgroundWhite};
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  padding: 16px 15px 15px 18px;
`;

const dropDownContainer = css`
  display: flex;
`;
const tagsContainerStyle = css`
  height: 24px;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const tagLabelCss = css`
  color: #b9c1c7;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  margin-right: 12px;
`;
const applyButtonStyle = css`
  position: absolute;
  right: 23px;
  bottom: 14px;
`;

const tagListStyle = css`
  display: flex;
  align-items: center;
  gap: 0 8px;
`;

export type SearchFilterProps = {
  filterLists: {
    id: number | string;
    title: string;
    list: { id: number | string; name: string }[];
  }[];
  onApply?: (data: any) => void;
};
const SearchFilter = ({ filterLists, onApply }: SearchFilterProps) => {
  const [allCheckedItems, setAllCheckedItems] = useState<Array<string[]>>(new Array(filterLists.length).fill([]));
  const [openfFilter, setOpenFilter] = useState(false);
  // const [inputValue, setInputvalue] = useState('');

  const changeCheckedItemsState = (idx: number, checkedArr: Array<string>) => {
    setAllCheckedItems((prev) => {
      const temp = [...prev];
      temp[idx] = checkedArr;
      return temp;
    });
  };

  const clearFiltersHandler = (id: number) => {
    setAllCheckedItems((prev) => {
      const temp = [...prev];
      temp[id] = [];
      return temp;
    });
  };

  const applyHandle = (input: string) => {
    setOpenFilter(false);

    const temp = {};
    filterLists.forEach((el, i) => {
      temp[el.id] = allCheckedItems[i];
    });
    if (input) temp['searchText'] = input;
    onApply && onApply(temp);
  };

  return allCheckedItems ? (
    <div
      css={css`
        width: '100%';
      `}
    >
      <div css={searchContainerStyle}>
        <SearchBar
          width={972}
          height={49}
          // value={inputValue}
          // onChange={setInputvalue}
          onSearch={applyHandle}
          withShadow
        />
        <button css={[filterToggleStyle(openfFilter ? '#9DA6AD' : '#525f68')]} onClick={() => setOpenFilter(true)}>
          <MdFilterAlt color="#ffffff" size={22} />
        </button>
      </div>

      {openfFilter ? (
        <div css={filterContainerStyle}>
          <div css={dropDownContainer}>
            {filterLists.map((el, i) => (
              <FilterDropdownBox
                key={`${el.id}_${i}`}
                index={i}
                list={el.list}
                title={el.title}
                changeCheckedItemsState={changeCheckedItemsState}
                checkedItems={allCheckedItems[i]}
              />
            ))}
          </div>

          <div css={tagsContainerStyle}>
            <span css={tagLabelCss}>
              <MdFilterAlt color="#B9C1C7" size={17} />
              Filters
            </span>
            <div css={tagListStyle}>
              {allCheckedItems.map(
                (el, idx) =>
                  el.length > 0 && (
                    <div
                      css={css`
                        display: flex;
                      `}
                      key={idx}
                      onClick={() => clearFiltersHandler(idx)}
                    >
                      <FilterTag checkedElements={el} title={filterLists[idx].title} showCategories={true} />
                    </div>
                  )
              )}
            </div>
          </div>
          <div css={applyButtonStyle}>
            <TextButton.Tiny title="Apply" onClick={() => applyHandle(null)} />
          </div>
        </div>
      ) : (
        <div
          css={[
            tagsContainerStyle,
            css`
              margin-top: 8px;
              margin-left: 12px;
            `,
          ]}
        >
          {allCheckedItems.filter((el) => el.length > 0).length > 0 && (
            <span css={tagLabelCss}>
              <MdFilterAlt color="#B9C1C7" size={17} />
              Filters
            </span>
          )}
          <div css={tagListStyle}>
            {allCheckedItems.map(
              (el, idx) =>
                el.length > 0 && (
                  <div
                    css={css`
                      display: flex;
                    `}
                    key={idx}
                    onClick={() => clearFiltersHandler(idx)}
                  >
                    <FilterTag checkedElements={el} title={filterLists[idx].title} showCategories={true} />
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default SearchFilter;
