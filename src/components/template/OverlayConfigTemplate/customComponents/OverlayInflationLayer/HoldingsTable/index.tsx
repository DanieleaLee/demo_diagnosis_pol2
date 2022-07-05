import React from "react";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import Colors from "@styles/colors";
import { flexRow } from "@styles";
import * as Typography from "@styles/typography";
import { holdings_table_data } from "src/data/holdings_table_data";
import SingleScoreChart from "@components/customCharts/SingleScoreChart";
import HeaderSort from "@components/molecules/HeaderSort";
import RangeBar from "@components/template/OverlayConfigTemplate/customComponents/Rangebar";

const PfOlHoldingsTbContainerCss = css`
  display: block;
  text-align: center;
  padding: 5px 23px 0px 15px;
`;

const PfOlHoldingsTbWrapCss = css`
  border-spacing: 0;
`;

const PfOlHoldingsTbHeadCss = css`
  display: inline-block;
  width: 100%;
  padding-bottom: 7px;
`;

const PfOlHoldingsTbTrCss = css`
  ${flexRow};
`;

const PfOlHoldingsTbBodyCss = css`
  width: 100%;
  display: inline-block;
  height: 341px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    background: ${Colors.button3DisabledText};
    border-radius: 1.5px;
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: ${Colors.buttonSubmit};
  }
`;

const PfOlHoldingsTbRowCss = css`
  ${flexRow};
  width: 540px;
  height: 31px;
  border-bottom: 0.5px solid ${Colors.borderPrimary};
  &:first-of-type {
    border-top: 0.5px solid ${Colors.borderPrimary};
  }
`;

const PfOlHoldingsHeaderCss = css`
  font-family: "Inter";
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${Colors.buttonSubmit};
  ${flexRow}
  & > div {
    width: 15px;
    height: 15px;
    svg {
      width: 20px;
      height: 20px;
      margin-top: -5px;
    }
  }
`;

const PfOlHoldingsTdRowCss = css`
  text-align: center;
`;


const hoverSpanCss = css`
  position: absolute;
  left: 0;
  top: -20px;
  visibility: hidden;
  background: #ececec;
  padding: 2px 10px;
  z-index: 2;
  white-space: nowrap;
  border-radius: 4px;
`;

const DATA = [
  { id: "0", title: "S&P 500" },
  { id: "1", title: "IndexName1" },
  { id: "2", title: "IndexName2" },
  { id: "3", title: "IndexName3" },
  { id: "4", title: "IndexName4" },
  { id: "5", title: "IndexName5" },
  { id: "6", title: "IndexName6" },
  { id: "7", title: "IndexName7" },
  { id: "8", title: "IndexName8" },
  { id: "9", title: "IndexName9" },
  { id: "10", title: "IndexName10" },
  { id: "11", title: "IndexName11" },
  { id: "12", title: "IndexName12" },
  { id: "13", title: "IndexName13" },
  { id: "14", title: "IndexName14" },
  { id: "15", title: "IndexName15" },
];

// Overlay -> Layer Implementation 의 Holdings를 나타내주는 테이블
// Rangebar 관련된 이슈 해결 필요
const HoldingsTable = () => {
  const columns = useMemo(() => {
    return [
      {
        accessor: "Assets",
        Header: ({ column }) => (
          <div
            css={css`
              text-align: left;
            `}
          >
            <Typography.Body4 color={Colors.buttonSubmit}>Assets</Typography.Body4>
          </div>
        ),
        Cell: ({ row }) => (
          <Typography.Body4
            css={css`
              text-align: left;
            `}
            color={Colors.buttonSubmit}
          >
            {row.original.assets}
          </Typography.Body4>
        ),
        width: "14%",
      },
      {
        accessor: "Asset Class",
        Header: ({ column }) => (
          <div>
            <Typography.Body4 color={Colors.buttonSubmit}>Asset Class</Typography.Body4>
          </div>
        ),
        Cell: ({ row }) => <Typography.Body4 color={Colors.primary4}>{row.original.asset_class}</Typography.Body4>,
        width: "25%",
      },
      {
        accessor: "Region",
        Header: ({ column }) => (
          <div>
            <Typography.Body4 color={Colors.buttonSubmit}>Region</Typography.Body4>
          </div>
        ),
        Cell: ({ row }) => (
          <Typography.Body4
            color={Colors.primary4}
            css={css`
              display: flex;
              justify-content: flex-end;
              padding-right: 15px;
            `}
          >
            {row.original.region}
          </Typography.Body4>
        ),
        width: "18%",
      },
      {
        accessor: "Impact score",
        Header: ({ column }) => {
          return (
            <div
              css={[
                PfOlHoldingsHeaderCss,
                css`
                  position: relative;
                  &:hover > span {
                    visibility: visible;
                  }
                `,
              ]}
            >
              <HeaderSort column={column} columnName="Impact score" isHoldings={true}/>
              <span css={hoverSpanCss}>
                The higher score is, the better your portfolio performs in high inflation period
              </span>
            </div>
          );
        },
        Cell: ({ row }) => (
          <SingleScoreChart
            isLoading={false}
            animation={true}
            value={row.original.impact_score}
            fontSize={10}
            lineWidth={1.5}
            containerCss={css`
              height: 24px;
              width: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            `}
          />
        ),
      },
      {
        accessor: "Original Weight",
        Header: ({ column }) => (
          <div css={PfOlHoldingsHeaderCss}>
            <HeaderSort column={column} columnName="Original Weight" />
          </div>
        ),
        Cell: ({ row }) => <Typography.Body4 color={Colors.primary4}>{row.original.original_weight}</Typography.Body4>,
      },
      {
        accessor: "Constraints",
        Header: ({ column }) => (
          <div>
            <Typography.Body4 color={Colors.buttonSubmit}>Constraints</Typography.Body4>
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <div
              css={css`
                margin-bottom: 2px;
                display: flex;
                justify-content: flex-end;
                // position: relative;
              `}
            >
              <RangeBar rowData={DATA} rowId={row.id} value={100} />
            </div>
          );
        },
      },
    ];
  }, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: holdings_table_data },
    useGlobalFilter,
    useSortBy
  );

  return (
    <div css={PfOlHoldingsTbContainerCss}>
      <table css={PfOlHoldingsTbWrapCss} {...getTableProps()}>
        <thead css={PfOlHoldingsTbHeadCss}>
          {headerGroups.map((headerGroup, idx) => (
            <tr css={PfOlHoldingsTbTrCss} key={idx} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <th key={idx} width={column.width} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody css={PfOlHoldingsTbBodyCss} {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr css={PfOlHoldingsTbRowCss} key={idx} {...row.getRowProps()}>
                {row.cells.map((cell, idx) => (
                  <td css={PfOlHoldingsTdRowCss} key={idx} width={cell.column.width} {...cell.getCellProps()}>
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

export default HoldingsTable;