import React, { useState } from 'react';
import { css } from '@emotion/react';

const selectContainerStyle = css`
  min-width: 248px;
  height: 32px;
  background-color: #ffffff;
  border: 1px solid #9da6ad;
  border-radius: 6px;
  text-align: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03em;
  color: #5b6266;
`;

export type OptionType = {
  label: string;
  value: string | number;
};

export type SelectProps = {
  options: OptionType[];
  defaultValue?: OptionType;
  placeholder?: string;
};
const Select = ({ options, defaultValue, placeholder }: SelectProps) => {
  const [selected, setSelected] = useState(
    placeholder ? { label: placeholder, value: 'none' } : defaultValue || options[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  console.log(isOpen);
  return (
    // <select css={selectContainerStyle} onChange={handleSelect} value={selected.value}>
    //   {placeholder && <option value="none">{placeholder}</option>}
    //   {options?.map((item, i) => (
    //     <option value={item.value} key={item.label + i}>
    //       {item.label}
    //     </option>
    //   ))}
    // </select>
    // <div css={wrapStyle}>
    <div css={selectBoxStyle}>
      <div css={boxStyle}>
        <div
          css={selectStyle}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          선택2
        </div>
        <ul
          css={[
            listStyle,
            scrollBar,
            isOpen
              ? css`
                  display: visible;
                `
              : css`
                  display: none;
                `,
          ]}
        >
          <li className="selected">선택</li>
          <li>항목01</li>
          <li>항목02</li>
          <li>항목03</li>
          <li>항목04</li>
          <li>항목05</li>
          <li>항목06</li>
          <li>항목07</li>
          <li>항목08</li>
          <li>항목09</li>
          <li>항목10</li>
        </ul>
      </div>
    </div>
    // </div>
  );
};

export default Select;

const scrollBar = css`
  &::-webkit-scrollbar {
    background: #ececec;
    border-radius: 1.5px;
    width: 2px;
    /* width: 36px; */
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: #2f3b43;

    /* border-left: 17px solid transparent;
    border-right: 17px solid transparent;
    background-color: #2f3b43;
    background-clip: content-box; */
    /* border-radius: 10px; */
  }
  &::-webkit-scrollbar-track {
    /* border-left: 17px solid transparent;
    border-right: 17px solid transparent;
    background-color: #ececec;
    background-clip: content-box;
    border-radius: 100px;
    margin-top: 9px;
    margin-bottom: 8px; */
  }
`;

const wrapStyle = css`
  margin: 0;
  padding: 0;
  & ul li,
  ol li {
    list-style: none;
  }
`;
const selectBoxStyle = css`
  & ul li,
  ol li {
    list-style: none;
  }
`;
const boxStyle = css`
  display: inline-block;
  position: relative;
  min-width: 248px;
`;
const selectStyle = css`
  position: relative;
  min-width: 248px;
  height: 32px;
  background-color: #ffffff;
  border: 1px solid #9da6ad;
  border-radius: 6px;
  text-align: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03em;
  color: #5b6266;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const listStyle = css`
  overflow-y: auto;
  position: absolute;
  top: 32px;
  left: 0;
  z-index: 10;
  border: 1px solid #9da6ad;
  box-sizing: border-box;
  /* padding: 10px 0; */
  width: 100%;
  max-height: 200px;
  background-color: #ffffff;
  // 디자인 나오면 변경
  border-top: none;
`;
