import TablePrimary from "@components/organisms/TablePrimary";
import {usePortfolioSel, usePortfolioSelValue} from "@recoil/hooks/usePortfolioSel";
import {useMemo, useState} from "react";
import CheckBox from "@components/atoms/CheckBox";
import {css} from "@emotion/react";
import TblHeaderPrimarya from "@components/molecules/TblHeaderPrimary";
import {CheckboxSelColumn} from "@components/organisms/TablePrimary";
import TblEditableField from "@components/molecules/TblEditableField";
import TblHeaderPrimary from "@components/molecules/TblHeaderPrimary";

import TextButton from "@components/atoms/TextButton";
import Colors from "@styles/colors";
import {GoGraph} from "react-icons/go";
import Buttonable from "@components/atoms/Buttonable";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";



export const useTblIndexListColumns = ()=> {
  return useMemo(()=>{
    return ([
      {
        ...CheckboxSelColumn({selects:[], setSelects:()=>{}}),
      },
      {
        accessor: 'code',
        Header: ({column})=> <TblHeaderPrimary column={column} columnName={'Index Name'}/>,
        width: 'auto',
      },
      {
        accessor: 'asset_class',
        Header: ({column})=> <TblHeaderPrimary column={column} columnName={'Asset Class'}/>,
        width: 'auto',
      },
      {
        accessor: 'leverage',
        Header: ({column})=> <TblHeaderPrimary column={column} columnName={'Leveraged/ Inverse'}/>,
        width: 'auto',
      },
      {
        accessor: 'size',
        Header: ({column})=> <TblHeaderPrimary column={column} columnName={'Size'}/>,
        width: 'auto',
      },
      {
        accessor: 'economic_development',
        Header: ({column})=> <TblHeaderPrimary column={column} columnName={'Economic Development'}/>,
        width: 'auto',
      },
      {
        accessor: 'region',
        Header: ({column})=> <TblHeaderPrimary column={column} columnName={'Region'}/>,
        width: 'auto',
      },
      {
        accessor: 'geography',
        Header: ({column})=> <TblHeaderPrimary column={column} columnName={'Geography'}/>,
        width: 'auto',
      },
      {
        accessor: 'tag',
        Header: ({column})=> <TblHeaderPrimary column={column} columnName={'Tags'}/>,
        Cell: ({cell:{value}}) => {
          return <span css={css`font-size:12px;`}>{value.map(v=>`#${v}`).join(', ').slice(0,20)}</span>;
        },
        width: 'auto',
      },
      {
        accessor: 'perf',
        Header: ({column})=> <TblHeaderPrimary column={column} columnName={'Perfomance'}/>,
        width: '300px',
      },


    ]);

  },[]);

};

const TblIndexList = (tableProps) => {

  return (
    <TablePrimary
      {...tableProps}
      useSortBy={true}
    />
  );
};

export default TblIndexList;