import React from "react";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";
import Colors from "@styles/colors";
import { flexRow } from "@styles";
import * as Typography from "@styles/typography";
import { TableDataType } from "@components/template/OverlayResultTemplate/ChartPerformance";
import { ContentsType } from "@components/template/OverlayResultTemplate/FilterBox";
import SingleScoreChart from "@components/customCharts/SingleScoreChart";

const PfOLPerformanceTbContainerCss = css`
  display: block;
  text-align: center;
  padding: 6px 24px 8px 27px;
  width: 100%;
  height: 100%;
`;

const PfOLPerformanceTbWrapCss = css`
  border-spacing: 0;
`;

const PfOLPerformanceTbHeadCss = css`
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid #9fadb7;
  padding-bottom: 6px;
`;

const PfOLPerformanceTbTrCss = css`
  ${flexRow}
`;

const PfOLPerformanceTbBodyCss = css`
  width: 100%;
`;

const PfOLPerformanceTbRowCss = css`
  ${flexRow};
  white-space: pre-wrap;
  height: 35px;

  &:not(:last-of-type) {
    border-bottom: 0.5px solid ${Colors.borderPrimary};
  }
`;

const PfOLPerformanceCellCss = css`
  &:not(:first-of-type) {
    text-align: center;
  }
`;

interface Props {
  tableData: TableDataType[];
  contents: ContentsType;
  filterSelectedbar: Object;
  showChart?: boolean;
}

// Overlay Results의 Performance analysis Table
const PerformanceTable = ({
  tableData,
  contents,
  filterSelectedbar
}: Props) => {
  // 달력에서 선택한 날짜를 피그마 날짜 형식에 맞게 변환.
  const replacedStartDate = contents.period.startDate
    .slice(5, 7)
    .replace(/^0+/, "");
  const replacedEndDate = contents.period.endDate
    .slice(5, 7)
    .replace(/^0+/, "");

  const startDate = `${contents.period.startDate.slice(
    0,
    4
  )}.${replacedStartDate}`;
  const endDate = `${contents.period.endDate.slice(0, 4)}.${replacedEndDate}`;
  const diffDate = +replacedEndDate - +replacedStartDate + 1;
  const showingTxtConditional =
    contents.period.startDate !== "" && contents.period.endDate !== "";

  const columns = useMemo(() => {
    return [
      {
        accessor: "High Inflation Period",
        Header: ({ column }) => (
          <div
            css={css`
              text-align: left;
            `}
          >
            <Typography.Body5 color={Colors.diagnosisSidebarArrow}>
              {filterSelectedbar.name} Period
              {showingTxtConditional &&
                ` (${startDate} ~ ${endDate}) ${diffDate} month `}
              {diffDate > 1 ? "s" : ""}
            </Typography.Body5>
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Body3 color={Colors.buttonSubmit}>
              {row.original.hip}
            </Typography.Body3>
          );
        },
        width: 340
      },
      {
        accessor: "CAGR",
        Header: ({ column }) => (
          <Typography.Body4 color={Colors.buttonSubmit}>CAGR</Typography.Body4>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Body3 color={Colors.buttonSubmit}>
              {row.original.cagr}
            </Typography.Body3>
          );
        },
        width: 120
      },
      {
        accessor: "Volatility",
        Header: ({ column }) => (
          <Typography.Body4 color={Colors.buttonSubmit}>
            Volatility
          </Typography.Body4>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Body3 color={Colors.buttonSubmit}>
              {row.original.volatility}
            </Typography.Body3>
          );
        },
        width: 100
      },
      {
        accessor: "MDD",
        Header: ({ column }) => (
          <Typography.Body4 color={Colors.buttonSubmit}>MDD</Typography.Body4>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Body3 color={Colors.buttonSubmit}>
              {row.original.mdd}
            </Typography.Body3>
          );
        },
        width: 100
      },
      {
        accessor: "Sharpe ratio",
        Header: ({ column }) => (
          <Typography.Body4 color={Colors.buttonSubmit}>
            Sharpe ratio
          </Typography.Body4>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Body3 color={Colors.buttonSubmit}>
              {row.original.sharpe}
            </Typography.Body3>
          );
        },
        width: 100
      },
      {
        accessor: "Market beta",
        Header: ({ column }) => (
          <Typography.Body4 color={Colors.buttonSubmit}>
            Market beta
          </Typography.Body4>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Body3 color={Colors.buttonSubmit}>
              {row.original.beta}
            </Typography.Body3>
          );
        },
        width: 100
      },
      {
        accessor: "Impact score",
        Header: ({ column }) => (
          <Typography.Body4 color={Colors.buttonSubmit}>
            Impact score
          </Typography.Body4>
        ),
        Cell: ({ row }) => {
          return (
            <SingleScoreChart
              isLoading={false}
              animation={true}
              value={row.original.chart}
              fontSize={10}
              lineWidth={1.5}
              containerCss={css`
                height: 24px;
                width: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
              `}
            />
          );
        },
        width: 75
      }
    ];
  }, [contents]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData }, useGlobalFilter);

  return (
    <div css={PfOLPerformanceTbContainerCss}>
      <table css={PfOLPerformanceTbWrapCss} {...getTableProps()}>
        <thead css={PfOLPerformanceTbHeadCss}>
          {headerGroups.map((headerGroup, idx) => (
            <tr
              css={PfOLPerformanceTbTrCss}
              key={idx}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, idx) => (
                <th key={idx} width={column.width} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody css={PfOLPerformanceTbBodyCss} {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr
                key={idx}
                css={PfOLPerformanceTbRowCss}
                {...row.getRowProps()}
              >
                {row.cells.map((cell, idx) => (
                  <td
                    css={PfOLPerformanceCellCss}
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

export default PerformanceTable;
