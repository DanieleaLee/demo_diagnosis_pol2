import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { flexCenter } from '@styles';
import Colors from '@styles/colors';
import Buttonable from '@components/atoms/Buttonable';
import { CgClose } from 'react-icons/cg';
import { BiSearchAlt2 } from 'react-icons/bi';

export const flexColumnBase = css`
  display: flex;
  flex-direction: column;
`;

const searchBarContainerWrap = ({
  width,
  height,
  withShadow,
}: Pick<SearchBarProps, 'width' | 'height' | 'withShadow'>) => css`
  width: ${width ? `${width}px` : '100%'};
  height: ${height ? `${height}px` : 'auto'};
  ${flexColumnBase};
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${Colors.searchbarBorder};
  padding-right: 12px;
  box-shadow: ${withShadow ? '0 0 4px rgba(0, 0, 0, 0.15)' : 'none'};
  background-color: white;
`;

const searchBarInputStyle = () => css`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  color: ${Colors.buttonSubmit};
  margin-left: 21px;
  border: none;
  background-color: transparent;
  width: 100%;

  &::placeholder {
    color: ${Colors.primary7};
  }
`;

const searchIconWrapStyle = css`
  cursor: pointer;
  height: 100%;
  ${flexCenter};
  margin-right: 7px;
`;

const allClearBtnStyle = css`
  ${flexCenter};
  height: inherit;
  padding-left: 9px;
  border-left: 1px solid ${Colors.searchbarBorder};
`;

export interface SearchBarProps {
  width?: number;
  height?: number;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  withShadow?: boolean;
  withClear?: boolean;
}

/**
 *
 * @param onSearch
 * 실제 검색 로직(ex: Server통신, local data 내 검색)
 */
const SearchBar = ({ width, height = 42, value, onChange, onSearch, withShadow, withClear }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    onChange && onChange(inputValue);
  }, [inputValue]);

  const searchHandle = () => {
    onSearch && onSearch(inputValue);
  };
  const keyPressEnterHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter') return;
    searchHandle();
  };
  const clearInput = () => {
    setInputValue('');
    onSearch && onSearch('');
  };

  return (
    <div css={[searchBarContainerWrap({ width, height, withShadow })]}>
      <div
        css={css`
          height: ${height}px;
          ${flexCenter};
        `}
      >
        <input
          css={searchBarInputStyle}
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={keyPressEnterHandle}
        />
        <div css={searchIconWrapStyle} onClick={searchHandle}>
          <BiSearchAlt2 color='#2F3B43' size={31}/>
        </div>

        {withClear && (
          <div css={allClearBtnStyle}>
            <Buttonable onClick={clearInput}>
              <CgClose size={24} color="#9DA6AD" />
            </Buttonable>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
