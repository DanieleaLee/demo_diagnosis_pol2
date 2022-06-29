import React from 'react';
import InputGroup from "@components/molecules/InputGroup";
import {css, SerializedStyles} from "@emotion/react";


export type TableGlobalFilterProps = {
  filter: any;
  setFilter: any;
  placeholder?: string;
}

const TableGlobalFilter = ({filter, setFilter, ...props}) => {
  return (
    <span>
      <InputGroup
        inputCss={[css` height: 35px; line-height: 10px;`, props.inputCss]}
        containerCss={css`margin-right: 10px;`}
        placeholder={props.placeholder || 'Search'}
        showSearch={true}
        onChange = {e=>setFilter(e.target.value)} value={filter || ''}/>
    </span>
  );
};

export default TableGlobalFilter;
