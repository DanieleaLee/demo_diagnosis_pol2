import React from "react";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { flexRow } from "@styles";
import TblHeaderPrimary from "@components/molecules/TblHeaderPrimary";
import { PFDGSTRESS_DUMMY_DATA } from "@lucian2Components/Dummy";
import MDDLineChart from "@tempComponents/v2/customCharts/MDDLineChart";
import { getMddData } from "@tempComponents/v2/customCharts/MDDLineChart/getNegativeData";
import LineChartHnTDot from "@tempComponents/v2/customCharts/LineChartHnTDot";

const PfDgStressTbContainerCss = css`
  display: block;
  width: 100%;
  max-width: 1439px;
  text-align: center;
`;

const PfDgStressTbWrapCss = css`
  width: 100%;
`;

const PfDgStressTbHeadCss = css`
  display: inline-block;
  width: 100%;
  padding-bottom: 11px;
  border-bottom: 1px solid ${Colors.diagnosisThemeTableBorder};
`;

const PfDgStressTbBodyCss = css`
  width: 100%;
`;

const PfDgStressTbRowCss = css`
  ${flexRow};
  white-space: pre-wrap;
  height: 69px;
  padding-bottom: 5px;
  padding-right: 23px;
  border-bottom: 0.5px solid ${Colors.diagnosisThemeTableBorder};
`;

const PfDgStressTbTitleCss = css`
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: "Inter";
`;

const mddData = getMddData();
const DATA = [
  1, 2.8, 3, 4.8, 3.8, 3.2, 4.4, 2.2, 3.1, 3.8, 1.2, 1.3, 3.1, 4.2, 5, 4.3, 5.5,
];

// Diagnosis 에 Pandemic, subprime과 같은 위기상황에서의 Performance 보여주는 차트
const PfDiagnosisStressTable = () => {
  const columns = useMemo(() => {
    return [
      {
        accessor: "Case",
        Header: ({ column }) => (
          <Typography.Subtitle2
            css={css`
              text-align: left;
            `}
            color={Colors.selectCategoryAmountBg}
          >
            Case
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3 color={Colors.selectCategoryAmountBg}>
              {row.original.case}
            </Typography.Subtitle3>
          );
        },
        width: "13%",
      },
      {
        accessor: "Periods",
        Header: ({ column }) => (
          <div css={PfDgStressTbTitleCss}>
            <TblHeaderPrimary column={column} columnName={"Periods"} />
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3
              css={css`
                text-align: center;
              `}
              color={Colors.selectCategoryAmountBg}
            >
              {row.original.periods}
            </Typography.Subtitle3>
          );
        },
        width: "12%",
      },
      {
        accessor: "Recovery Time",
        Header: ({ column }) => (
          <Typography.Subtitle2 color={Colors.selectCategoryAmountBg}>
            Recovery Time
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3
              css={css`
                text-align: center;
              `}
              color={Colors.selectCategoryAmountBg}
            >
              {row.original.recovery_time}
            </Typography.Subtitle3>
          );
        },
        width: "11%",
      },
      {
        accessor: "Underwater Periods",
        Header: ({ column }) => (
          <Typography.Subtitle2 color={Colors.selectCategoryAmountBg}>
            Underwater Periods
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3
              css={css`
                text-align: center;
              `}
              color={Colors.selectCategoryAmountBg}
            >
              {row.original.underwater_periods}
            </Typography.Subtitle3>
          );
        },
        width: "11.5%",
      },
      {
        accessor: "MDD",
        Header: ({ column }) => (
          <div css={PfDgStressTbTitleCss}>
            <TblHeaderPrimary column={column} columnName={"MDD"} />
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3
              css={css`
                text-align: center;
              `}
              color={Colors.selectCategoryAmountBg}
            >
              {row.original.mdd}
            </Typography.Subtitle3>
          );
        },
        width: "10%",
      },
      {
        accessor: "Returns",
        Header: ({ column }) => (
          <div css={PfDgStressTbTitleCss}>
            <TblHeaderPrimary column={column} columnName={"Returns"} />
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3
              css={css`
                text-align: center;
              `}
              color={Colors.selectCategoryAmountBg}
            >
              {row.original.returns}
            </Typography.Subtitle3>
          );
        },
        width: "10.5%",
      },
      {
        accessor: "Volatility",
        Header: ({ column }) => (
          <div css={PfDgStressTbTitleCss}>
            <TblHeaderPrimary column={column} columnName={"Volatility"} />
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3
              css={css`
                text-align: center;
              `}
              color={Colors.selectCategoryAmountBg}
            >
              {row.original.volatility}
            </Typography.Subtitle3>
          );
        },
        width: "10%",
      },
      {
        accessor: "MDD Chart",
        Header: ({ column }) => (
          <Typography.Subtitle2 color={Colors.selectCategoryAmountBg}>
            MDD Chart
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => {
          return (
            <div
              css={css`
                width: 158px;
                height: 55px;
              `}
            >
              <MDDLineChart
                animation={false}
                colorSet={[["#18A3FD", 0.1]]}
                rowData={[{ name: "test1", data: mddData }]}
                isLoading={false}
                // prettier-ignore
                containerCss={css`height: 100%;width: 100%;`}
              />
            </div>
          );
        },
        width: "12.25%",
      },
      {
        accessor: "Performance Chart",
        Header: ({ column }) => (
          <Typography.Subtitle2 color={Colors.selectCategoryAmountBg}>
            Performance Chart
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => {
          return (
            <div
              css={css`
                height: 55px;
              `}
            >
              <LineChartHnTDot
                animation={false}
                color={[Colors.backgroundAccent2]}
                data={[DATA]}
                isLoading={false}
                // prettier-ignore
                containerCss={css`height: 100%;width: 100%; padding:8px;`}
              />
            </div>
          );
        },
        width: "9.75%",
      },
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data: PFDGSTRESS_DUMMY_DATA },
      useGlobalFilter,
      useSortBy
    );

  return (
    <div css={PfDgStressTbContainerCss}>
      <table css={PfDgStressTbWrapCss} {...getTableProps()}>
        <thead css={PfDgStressTbHeadCss}>
          {headerGroups.map((headerGroup, idx) => (
            <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <th
                  key={idx}
                  width={column.width}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody css={PfDgStressTbBodyCss} {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr css={PfDgStressTbRowCss} key={idx} {...row.getRowProps()}>
                {row.cells.map((cell, idx) => (
                  <td
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

export default PfDiagnosisStressTable;
