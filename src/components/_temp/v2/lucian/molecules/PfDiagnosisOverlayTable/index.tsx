import React from "react";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { flexRow } from "@styles";
import MDDLineChart from "../../../customCharts/MDDLineChart";
import { getMddData } from "../../../customCharts/MDDLineChart/getNegativeData";
import LineChartHnTDot from "@tempComponents/v2/customCharts/LineChartHnTDot";
import { PFDGOVERLAY_DUMMY_DATA } from "../../Dummy";

const PfDgOverlayTbContainerCss = css``;

const PfDgOverlayTbWrapCss = css``;

const PfDgOverlayTbHeadCss = css``;

const PfDgOverlayTbBodyCss = css``;

const PfDgOverlayTbRowCss = css``;

const mddData = getMddData();
const DATA = [
  1, 2.8, 3, 4.8, 3.8, 3.2, 4.4, 2.2, 3.1, 3.8, 1.2, 1.3, 3.1, 4.2, 5, 4.3, 5.5,
];

// 진행중 스탑된 진단 Overlay 테이블
const PfDiagnosisOverlayTable = () => {
  const columns = useMemo(() => {
    return [
      {
        accessor: "Overlay-timing",
        Header: () => <></>,
        Cell: () => <></>,
      },
      {
        accessor: "MDD",
        Header: ({ column }) => (
          <Typography.Subtitle2 color={Colors.selectCategoryAmountBg}>
            MDD
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3 color={Colors.selectCategoryAmountBg}>
              {row.original.mdd}
            </Typography.Subtitle3>
          );
        },
      },
      {
        accessor: "Returns",
        Header: ({ column }) => (
          <Typography.Subtitle2 color={Colors.selectCategoryAmountBg}>
            Returns
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3 color={Colors.selectCategoryAmountBg}>
              {row.original.returns}
            </Typography.Subtitle3>
          );
        },
      },
      {
        accessor: "Volatility",
        Header: ({ column }) => (
          <Typography.Subtitle2 color={Colors.selectCategoryAmountBg}>
            Volatility
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3 color={Colors.selectCategoryAmountBg}>
              {row.original.volatility}
            </Typography.Subtitle3>
          );
        },
      },
      {
        accessor: "MDD Chart",
        Header: ({ column }) => (
          <Typography.Subtitle2 color={Colors.selectCategoryAmountBg}>
            MDD Chart
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => <></>,
        //   return (
        //     <div
        //       css={css`
        //         width: 225px;
        //         height: 88px;
        //       `}
        //     >
        //       <MDDLineChart
        //         animation={false}
        //         colorSet={[["#18A3FD", 0.1]]}
        //         rowData={[{ name: "test1", data: mddData }]}
        //         isLoading={false}
        //         // prettier-ignore
        //         containerCss={css`height: 100%;width: 100%;`}
        //       />
        //     </div>
        //   );
        // {
        //   return (

        //   );
        // },
      },
      {
        accessor: "Performance Chart",
        Header: ({ column }) => (
          <Typography.Subtitle2 color={Colors.selectCategoryAmountBg}>
            Performance Chart
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => <></>,
        // {
        //   return (
        //     <div
        //       css={css`
        //         height: 55px;
        //       `}
        //     >
        //       <LineChartHnTDot
        //         animation={false}
        //         color={[Colors.backgroundAccent2]}
        //         data={[DATA]}
        //         isLoading={false}
        //         // prettier-ignore
        //         containerCss={css`height: 100%;width: 100%; padding:8px;`}
        //       />
        //     </div>
        //   );
        // },
      },
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: PFDGOVERLAY_DUMMY_DATA });

  return (
    <div css={PfDgOverlayTbContainerCss}>
      <table css={PfDgOverlayTbWrapCss} {...getTableProps()}>
        <thead css={PfDgOverlayTbHeadCss}>
          {headerGroups.map((headerGroup, idx) => (
            <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <th key={idx} width={column.width} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody css={PfDgOverlayTbBodyCss} {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr key={idx} css={PfDgOverlayTbRowCss} {...row.getRowProps()}>
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

export default PfDiagnosisOverlayTable;
