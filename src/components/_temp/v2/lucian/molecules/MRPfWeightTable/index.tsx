import React from "react";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import TblHeaderPrimary from "@components/molecules/TblHeaderPrimary";
import { MRPFWEIGHT_DUMMY_DATA } from "@lucian2Components/Dummy";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { flexCenter, flexRow } from "@styles";

const MRPfWeightTbContainerCss = css`
  display: block;
  background-color: ${Colors.backgroundWhite};
  border: 0.5px solid ${Colors.divider};
  border-radius: 8px;
  padding: 21px 18px 32px 28px;
  width: 287px;
  height: 460px;
`;

const MRPfWeightTbWrapCss = css`
  display: inline-block;
  width: 100%;
`;

const MRPfWeightTbHeadCss = css`
  display: inline-block;
  width: 95%;
  padding: 17px 0 9px 0;
`;

const MRPfWeightBodyWrapCss = css`
  width: 100%;
  max-height: 348px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    background: #ececec;
    border-radius: 1.5px;
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: ${Colors.button1};
  }
`;

const MRPfWeightTbBodyCss = css`
  display: inline-block;
  width: 100%;
  padding-right: 25px;
`;

const MRPfWeightTbRowCss = css`
  border-top: 0.5px solid ${Colors.borderPrimary};
  height: 29px;
  ${flexRow};

  &:last-of-type {
    border-bottom: 0.5px solid ${Colors.borderPrimary};
  }
`;

const MRPfWeightHeaderCss = css`
  text-align: center;
  font-family: "Inter";
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  color: ${Colors.buttonSubmit};
`;

interface Props {
  id: number;
  name: string;
  weight: number;
}

// Model Run쪽 Portfolio Weight table
const MRPfWeightTable = () => {
  const columns = useMemo(() => {
    return [
      {
        accessor: "Index Name",
        Header: ({ column }) => (
          <div css={MRPfWeightHeaderCss}>
            <TblHeaderPrimary column={column} columnName={"Index Name"} />
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Body6
              css={css`
                padding-left: 0.2rem;
              `}
              color={Colors.buttonSubmit}
            >
              {row.original.name}
            </Typography.Body6>
          );
        },
      },
      {
        accessor: "Weight",
        Header: ({ column }) => (
          <div css={MRPfWeightHeaderCss}>
            <TblHeaderPrimary column={column} columnName={"Weight(%)"} />
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <Typography.Body6
              color={Colors.buttonSubmit}
              css={css`
                padding-right: 1rem;
                ${flexCenter};
              `}
            >
              {row.original.weight}
            </Typography.Body6>
          );
        },
      },
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data: MRPFWEIGHT_DUMMY_DATA },
      useGlobalFilter,
      useSortBy
    );

  return (
    <div css={MRPfWeightTbContainerCss}>
      <Typography.Body2 color={Colors.buttonSubmit}>
        Portfolio Weight
      </Typography.Body2>
      <table css={MRPfWeightTbWrapCss} {...getTableProps()}>
        <thead css={MRPfWeightTbHeadCss}>
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
        <div css={MRPfWeightBodyWrapCss}>
          <tbody css={MRPfWeightTbBodyCss} {...getTableBodyProps()}>
            {rows.map((row, idx) => {
              prepareRow(row);
              return (
                <tr css={MRPfWeightTbRowCss} key={idx} {...row.getRowProps()}>
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
        </div>
      </table>
    </div>
  );
};

export default MRPfWeightTable;
