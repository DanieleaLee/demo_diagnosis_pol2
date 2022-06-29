import { css } from '@emotion/react';
import React from 'react';

const containerStyle = css`
  margin-bottom: 14px;
`;
const selectStyle = css`
  width: 311px;
  height: 26px;
  border: 1px solid #9da6ad;
  border-radius: 4px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #5B6266;
`;
const listStyle = css`
  list-style: inside;
  padding-left: 4px;
  margin-top: 8px;
  height: 112px;
`;

const listItemStyle = css`
  padding-left: 1.5em;
  text-indent: -1.5em;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 19px;
  color: #9da6ad;
`;
type SelectPortfolioInfoProps = {
  options: { id: string; text: string }[];
  onChange?: (name: string) => void;
  description: {
    holdings: number;
    turnover: string;
    text: string;
  };
};
const SelectPortfolioInfo = ({ options, onChange, description }: SelectPortfolioInfoProps) => {
  return (
    <div css={containerStyle}>
      <select css={selectStyle} name="select overlay" onChange={(e) => onChange(e.target.value)}>
        {options.map((o,i) => (
          <option key={i} value={o.id}>{o.text}</option>
        ))}
      </select>
      <ul css={listStyle}>
        <li css={listItemStyle}>
          <span># of Holdings : {description.holdings}</span>
        </li>
        <li css={listItemStyle}>Turnover Ratio : {description.turnover}</li>
        <li
          css={[
            listItemStyle,
            css`
              line-height: 16px;
            `,
          ]}
        >
          {description.text}
        </li>
      </ul>
    </div>
  );
};

export default SelectPortfolioInfo;
