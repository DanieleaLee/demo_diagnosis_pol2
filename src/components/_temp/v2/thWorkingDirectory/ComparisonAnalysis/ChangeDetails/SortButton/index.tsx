import { css } from '@emotion/react';
import { useState } from 'react';
import { BiSort } from 'react-icons/bi';

const sortButtonStyle = (toggle: boolean) => css`
  background-color: ${toggle ? '#9DA6AD' : '#525f68'};
  padding: 1.35px 0;
  border-radius: 2px;
  margin-left: 4px;
`;
type SortButtonProps = {
  fieldName: string;
  onClick?: (name: string, type: string) => void;
  toggle: boolean;
};
const SortButton = ({ onClick, fieldName, toggle }: SortButtonProps) => {
  const clickHandle = () => {
    onClick && onClick(fieldName, toggle ? 'asc' : 'desc');
  };
  return <BiSort css={sortButtonStyle(toggle)} color="#fff" size={12} onClick={clickHandle} />;
};

export default SortButton;
