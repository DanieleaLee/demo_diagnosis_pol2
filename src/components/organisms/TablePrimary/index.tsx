import {css} from "@emotion/react";
import {useTable, useSortBy, useExpanded, useFilters } from "react-table";
import CheckBox from "@components/atoms/Checkbox";
import ClipLoader from "react-spinners/ClipLoader";
import {useTheme } from "@emotion/react";

export type TablePrimaryProps = {
  columns,
  data,
  useFilters?: boolean,
  useGlobalFilter?: boolean,
  useSortBy?: boolean,
  useExpanded?: boolean,
  loading: boolean,
};


const TblHeaderStyle = css`
  border-bottom: 2px solid gray;
  line-height:40px;
`;

const TblRowStyle = css`
  border-top: 0.02rem solid gray;
  border-bottom: 0.02rem solid gray;
`;


export const CheckboxSelColumn = ({accessor='checkbox', selects, setSelects}) => {
  return ({
    accessor: 'checkbox', // accessor is the "key" in the data
    Header: ({data}) => {

      const allData = data.map(d=>d.id);

      const hasAllData = allData.map(ad=>
        selects.includes(ad)).every(e=>!!e);

      return <CheckBox
        containerCss={css`position:relative; top: 6px;`}
        checked={hasAllData}
        onChange={()=>{
          if (hasAllData)
            setSelects([]);
          else
            setSelects(data.map(d=>d.id));
        }}
      />;
    },
    Cell: ({row})=>{

      if (row.depth == 0)
        return <CheckBox
          containerCss={css`position:relative; top: 6px;`}
          onChange={()=>{

            if (selects.includes(row.original.id)){
              setSelects(
                Array.from(new Set(
                  selects.filter(p=> p!=row.original.id)
                ))
              );
            }
            else{
              setSelects(
                Array.from(new Set(
                  [...selects, row.original.id])
                ))
            }
          }}
          checked={selects.includes(row.original.id)}
        />;
      else{
        return <></>;
      }
    },
    maxWidth: 40,

  });
};


const TablePrimary = ({columns, data, loading, ...props}: TablePrimaryProps)=>{

  const plugins = [
    (props.useFilters && useFilters), // TODO: 아직 미구현
    (props.useSortBy && useSortBy),
    (props.useExpanded && useExpanded)
  ].filter(e=>!!e);

  const theme = useTheme();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data },
    ...plugins
  );


  return (
    <table css={css`width:100%; border-collapse:collapse;`} {...getTableProps()}>
      <thead>
      {
        headerGroups.map((headerGroup, k) => (
          <tr key={k} css={TblHeaderStyle} {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map((column, k) => (

                <th key={k} {...column.getHeaderProps(
                  {
                    ...(props.useSortBy && {...column.getSortByToggleProps()}),
                    style: {width:column.width, maxWidth: column.maxWidth, minWidth: column.minWidth}
                  }
                )}>
                  {column.render('Header')}
                </th>
              ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {
        loading && <tr><td colSpan={999}>
          <div css={css`display:flex; justify-content:center; height: 100px; padding-top: 40px;`}>
            <ClipLoader color={theme.colors.primary2} loading={true} size={25} />
          </div>
        </td></tr>
      }
      {
        rows.map((row,k) => {
          prepareRow(row);
          if (row.depth == 0)
            return (
              <tr key={k} css={TblRowStyle} {...row.getRowProps()}>
                {
                  row.cells.map((cell, k) => {
                    return (
                      <td key={k} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
              </tr>
            );
          else
            return <tr>
              <td colSpan={99}>
                {row.original}
              </td>
            </tr>
        })}
      </tbody>
    </table>
  )

};

export default TablePrimary;

