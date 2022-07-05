import TablePrimary from "@components/organisms/TablePrimary";
import {useMemo} from "react";
import {css} from "@emotion/react";
import {CheckboxSelColumn} from "@components/organisms/TablePrimary";
import HeaderSort from "@components/molecules/HeaderSort";

export const useTblIndexListColumns = ()=> {
  return useMemo(()=>{
    return ([
      {
        ...CheckboxSelColumn({selects:[], setSelects:()=>{}}),
      },
      {
        accessor: 'code',
        Header: ({column})=> <HeaderSort column={column} columnName={'Index Name'} size={12}/>,
        width: 'auto',
      },
      {
        accessor: 'asset_class',
        Header: ({column})=> <HeaderSort column={column} columnName={'Asset Class'} size={12}/>,
        width: 'auto',
      },
      {
        accessor: 'leverage',
        Header: ({column})=> <HeaderSort column={column} columnName={'Leveraged/ Inverse'} size={12}/>,
        width: 'auto',
      },
      {
        accessor: 'size',
        Header: ({column})=> <HeaderSort column={column} columnName={'Size'} size={12}/>,
        width: 'auto',
      },
      {
        accessor: 'economic_development',
        Header: ({column})=> <HeaderSort column={column} columnName={'Economic Development'} size={12}/>,
        width: 'auto',
      },
      {
        accessor: 'region',
        Header: ({column})=> <HeaderSort column={column} columnName={'Region'} size={12}/>,
        width: 'auto',
      },
      {
        accessor: 'geography',
        Header: ({column})=> <HeaderSort column={column} columnName={'Geography'} size={12}/>,
        width: 'auto',
      },
      {
        accessor: 'tag',
        Header: ({column})=> <HeaderSort column={column} columnName={'Tags'} size={12}/>,
        Cell: ({cell:{value}}) => {
          return <span css={css`font-size:12px;`}>{value.map(v=>`#${v}`).join(', ').slice(0,20)}</span>;
        },
        width: 'auto',
      },
      {
        accessor: 'perf',
        Header: ({column})=> <HeaderSort column={column} columnName={'Perfomance'} size={12}/>,
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