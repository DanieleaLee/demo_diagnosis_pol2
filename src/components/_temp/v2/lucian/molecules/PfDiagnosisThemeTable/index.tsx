import React from "react";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import TblHeaderPrimary from "@components/molecules/TblHeaderPrimary";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { PFDGTHEME_DUMMY_DATA } from "@lucian2Components/Dummy";

const PfDgThemeTbContainerCss = css`
  display: block;
  width: 280px;
  height: 100%;
`;

const PfDgThemeTbTitleCss = css`
  padding-bottom: 27px;
`;

const PfDgThemeTbWrapCss = css`
  display: inline-block;
  width: 280px;
  height: 100%;
`;

const PfDgThemeTbHeadCss = css`
  display: inline-block;
  width: 280px;
  padding-bottom: 17px;
  border-bottom: 1px solid ${Colors.diagnosisThemeTableBorder};
`;

const PfDgThemeTbBodyCss = css`
  width: 100%;
`;

const PfDgThemeTbRowCss = css`
  display: inline-block;
  width: 100%;
  padding-bottom: 1.2rem;

  &:first-of-type {
    padding-top: 1rem;
  }
`;

const PfDgThemeTbHeaderCss = css`
  font-family: "Inter";
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  width: 100%;
  padding-left: 1.4rem;
  color: ${Colors.selectCategoryAmountBg};
`;

// Diagnosis에 Theme에 따른 점수를 보여주는 테이블
const PfDiagnosisThemeTable = () => {
  const columns = useMemo(() => {
    return [
      {
        accessor: "Theme",
        Header: () => (
          <Typography.Subtitle2 color={Colors.selectCategoryAmountBg}>
            Theme
          </Typography.Subtitle2>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle2
              css={css`
                width: 10.3rem;
              `}
              color={Colors.selectCategoryAmountBg}
            >
              {row.original.name}
            </Typography.Subtitle2>
          );
        },
      },
      {
        accessor: "Impact Score",
        Header: ({ column }) => (
          <div css={PfDgThemeTbHeaderCss}>
            <TblHeaderPrimary column={column} columnName={"Impact Score"} />
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Subtitle3
              css={css`
                text-align: center;
                width: 100%;
                padding-right: 2rem;
              `}
              color={Colors.selectCategoryAmountBg}
            >
              {row.original.score}
            </Typography.Subtitle3>
          );
        },
      },
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data: PFDGTHEME_DUMMY_DATA },
      useGlobalFilter,
      useSortBy
    );

  return (
    <div css={PfDgThemeTbContainerCss}>
      <Typography.Subtitle2
        css={PfDgThemeTbTitleCss}
        color={Colors.selectCategoryAmountBg}
      >
        Thematic Influence Anaylsis
      </Typography.Subtitle2>
      <table css={PfDgThemeTbWrapCss} {...getTableProps()}>
        <thead css={PfDgThemeTbHeadCss}>
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
        <tbody css={PfDgThemeTbBodyCss} {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr css={PfDgThemeTbRowCss} key={idx} {...row.getRowProps()}>
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

export default PfDiagnosisThemeTable;
