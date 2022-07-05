import React from "react";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import Colors from "@styles/colors";
import { flexCenter } from "@styles";
import * as Typography from "@styles/typography";
import HeaderSort from "@components/molecules/HeaderSort";
import { NewTechDataType } from "@components/template/OverlayConfigTemplate/customComponents/NewTechLayer";
import RangeBar from "@components/template/OverlayConfigTemplate/customComponents/Rangebar";
import SingleScoreChart from "@components/customCharts/SingleScoreChart";

const TbContainerCss = css`
  display: block;
  text-align: center;
  padding: 5px 23px 0px 15px;
`;

const TbWrapCss = css`
  border-spacing: 0;
`;

const TbHeadCss = css`
  display: inline-block;
  width: 100%;
`;

const TbBodyCss = css`
  width: 100%;
  display: inline-block;
  height: 203px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    background: ${Colors.button3DisabledText};
    border-radius: 1.85168px;
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1.85168px;
    background: #2e3b43;
  }
`;

const TbTrCss = css``;

const TbRowCss = css`
  width: 549px;
  height: 31px;
  text-align: center;
  border-bottom: 0.5px solid ${Colors.borderPrimary};
  ${flexCenter};

  &:first-of-type {
    border-top: 0.3px solid ${Colors.hint};
  }
`;

const TbTdCss = css`
  text-align: center;
`;

const TbHeaderCss = css`
  font-size: 12px;
  font-weight: 500;
  color: ${Colors.buttonSubmit};
  font-family: "Inter";
`;
const TbCellCss = css`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${Colors.buttonSubmit};
`;

const closeIconWrapCss = css`
  outline: none;
  border: none;
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DATA = [
  { id: "1", title: "S&P 500" },
  { id: "2", title: "IndexName1" },
  { id: "3", title: "IndexName2" },
  { id: "4", title: "IndexName3" },
  { id: "5", title: "IndexName4" },
  { id: "6", title: "IndexName5" }
];

interface Props {
  data: NewTechDataType[];
  onRemove: (id: number) => void;
}

const NewTechKeywordTable = ({ data, onRemove }: Props) => {
  const columns = useMemo(() => {
    return [
      {
        accessor: "Keyword",
        Header: ({ column }) => (
          <div
            css={[
              TbHeaderCss,
              css`
                text-align: left;
              `
            ]}
          >
            <Typography.Body4 color={Colors.buttonSubmit}>
              Keyword
            </Typography.Body4>
          </div>
        ),
        Cell: ({ row }) => (
          <div
            css={[
              TbCellCss,
              css`
                text-align: left;
              `
            ]}
          >
            {row.original.keyword}
          </div>
        ),
        width: 260
      },
      {
        accessor: "Trending",
        Header: ({ column }) => (
          <div css={[TbHeaderCss]}>
            <HeaderSort size={7.65} column={column} columnName={"Trending"} />
          </div>
        ),
        Cell: ({ row }) => (
          <div
            css={[
              TbCellCss,
              css`
                ${flexCenter};
              `
            ]}
          >
            <SingleScoreChart
              isLoading={false}
              animation={true}
              value={row.original.trending}
              fontSize={10}
              lineWidth={1.5}
              containerCss={css`
                height: 24px;
                width: 24px;
              `}
            />
          </div>
        ),
        width: 80
      },
      {
        accessor: "Ratio",
        Header: ({ column }) => (
          <div css={[TbHeaderCss]}>
            <HeaderSort size={7.65} column={column} columnName={"Ratio"} />
          </div>
        ),
        Cell: ({ row }) => <div css={[TbCellCss]}>{row.original.ratio}</div>,
        width: 130
      },
      {
        accessor: "Poqwe",
        Header: ({ column }) => (
          <div css={[TbHeaderCss]}>
            <Typography.Body4 color={Colors.buttonSubmit}>
              Power
            </Typography.Body4>
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <div>
              <RangeBar rowData={DATA} rowId={row.original.id} value={50} />
            </div>
          );
        },
        width: 75
      },
      {
        accessor: "button",
        Header: ({ column }) => <></>,
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => onRemove(row.original.id)}
              css={[closeIconWrapCss]}
            >
              <BiTrashAlt color={Colors.primary2} />
            </button>
          );
        },
        width: 50
      }
    ];
  }, [data]);

  const {
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    ...tableProps
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <div css={TbContainerCss}>
      <table css={TbWrapCss} {...getTableProps()}>
        <thead css={TbHeadCss}>
          {headerGroups.map((headerGroup, idx) => (
            <tr css={TbTrCss} key={idx} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <th
                  key={idx}
                  width={column.width}
                  css={css`
                    text-align: center;
                  `}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} css={TbBodyCss}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr css={TbRowCss} key={idx} {...row.getRowProps()}>
                {row.cells.map((cell, idx) => (
                  <td
                    css={TbTdCss}
                    key={idx}
                    width={cell.column.width}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NewTechKeywordTable;
