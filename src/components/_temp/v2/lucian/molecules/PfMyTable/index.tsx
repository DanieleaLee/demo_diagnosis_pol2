import React from "react";
import { css } from "@emotion/react";
import { useMemo, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import Colors from "@styles/colors";
import TblHeaderPrimary from "@components/molecules/TblHeaderPrimary";
import CheckBox from "@components/atoms/CheckBox";
import { fakePortfolioList } from "@lucian2Components/Dummy";
import { fakeType } from "@lucian2Components/molecules/Table";
import InputCheckbox from '@lucian2Components/atoms/InputCheckbox';

const TbContainerBodyCss = css`
  display: block;
  height: auto;
  background-color: ${Colors.backgroundWhite};
  border: 0.5px solid ${Colors.divider};
  border-radius: 8px;
  padding: 20px 20px 20px 41px;
  width: 100%;
`;

const TbContainerCss = css`
  display: inline-block;
  width: 100%;
`;

const TbHeadCss = css`
  display: inline-block;
  width: 100%;
  padding: 0 25px 12px 0;
  border-bottom: 0.5px solid ${Colors.borderPrimary};
`;

const TbBodyCss = css`
  display: inline-block;
  width: 100%;
  height: 424px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 25px;

  &::-webkit-scrollbar {
    background: #ececec;
    border-radius: 1.5px;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: ${Colors.button1};
  }
`;

const TbRowCss = css`
  border-bottom: 0.5px solid ${Colors.borderPrimary};
  height: 50px;
  text-align: center;
  padding: 0 25px 33px 0;
`;

interface Props {
  selectTable: Array<fakeType>;
  setSelectTable: React.Dispatch<React.SetStateAction<Array<fakeType>>>;
  pfImportTableData: Array<fakeType>;
  setPfImportTableData: React.Dispatch<React.SetStateAction<Array<fakeType>>>;
}

const PfMyTable = ({
  selectTable,
  setSelectTable,
  pfImportTableData,
  setPfImportTableData,
}: Props) => {
  const columns = useMemo(() => {
    return [
      {
        accessor: "checkbox", // accessor is the "key" in the data
        Header: ({ data }) => {
          const allContents = data.map((el) => el);
          const hasAllContents = allContents
            .map((el) => selectTable.includes(el))
            .every((e) => !!e);
          return (
            <InputCheckbox
              containerCss={css`
                position: relative;
                top: 6px;
              `}
              checked={hasAllContents && selectTable.length > 0}
              onChange={() => {
                if (hasAllContents) setSelectTable([]);
                else setSelectTable(allContents);
              }}
            />
          );
        },
        Cell: ({ row }) => {
          return (
            <InputCheckbox
              containerCss={css`
                position: relative;
                top: 6px;
              `}
              onChange={() => {
                if (selectTable.includes(row.original)) {
                  setSelectTable((prev) => {
                    const temp = [...prev];
                    temp[row.index] = undefined;
                    return temp;
                  });
                } else {
                  setSelectTable((prev) => {
                    const temp = [...prev];
                    temp[row.index] = row.original;
                    return temp;
                  });
                }
              }}
              checked={selectTable.includes(row.original)}
            />
          );
        },
        width: "1%",
        maxWidth: 40,
      },
      {
        accessor: "name",
        Header: ({ column }) => (
          <div
            css={css`
              font-size: "15px";
              font-weight: 600;
              color: ${Colors.buttonSubmit};
              text-align: left;
              font-family: "Inter";
            `}
          >
            <TblHeaderPrimary column={column} columnName={"Portfolio Name"} />
          </div>
        ),
        Cell: ({ value }) => {
          return (
            <div
              css={css`
                font-size: "15px";
                font-weight: 600;
                color: ${Colors.buttonSubmit};
                text-align: left;
                font-family: "Inter";
              `}
            >
              {value}
            </div>
          );
        },
        width: "30%",
      },
      {
        accessor: "pType",
        Header: ({ column }) => (
          <div
            css={css`
              font-size: "15px";
              font-weight: 600;
              color: ${Colors.buttonSubmit};
              font-family: "Inter";
            `}
          >
            <TblHeaderPrimary column={column} columnName={"Portfolio Type"} />
          </div>
        ),
        Cell: ({ value }) => {
          return (
            <div
              css={css`
                font-size: "16px";
                font-weight: 400;
                color: ${Colors.buttonSubmit};
                font-family: "Inter";
              `}
            >
              {value}
            </div>
          );
        },
        width: "18%",
      },
      {
        accessor: "underlaying_assets",
        Header: ({ column }) => (
          <div
            css={css`
              font-size: "15px";
              font-weight: 600;
              color: ${Colors.buttonSubmit};
              font-family: "Inter";
            `}
          >
            <TblHeaderPrimary
              column={column}
              columnName={"Underlaying Assets"}
            />
          </div>
        ),
        Cell: ({ value }) => {
          return (
            <div
              css={css`
                font-size: "15px";
                font-weight: 400;
                color: ${Colors.buttonSubmit};
                font-family: "Inter";
              `}
            >
              {value}
            </div>
          );
        },
        width: "17%",
      },
      {
        accessor: "holdings",
        Header: ({ column }) => (
          <div
            css={css`
              font-size: "15px";
              font-weight: 600;
              color: ${Colors.buttonSubmit};
              font-family: "Inter";
            `}
          >
            <TblHeaderPrimary column={column} columnName={"# of Holdings"} />
          </div>
        ),
        Cell: ({ value }) => (
          <div
            css={css`
              font-size: "15px";
              font-weight: 400;
              color: ${Colors.buttonSubmit};
              font-family: "Inter";
            `}
          >
            {value}
          </div>
        ),
        width: "15%",
      },
      {
        accessor: "initial_date",
        Header: ({ column }) => (
          <div
            css={css`
              font-size: "15px";
              font-weight: 600;
              color: ${Colors.buttonSubmit};
              font-family: "Inter";
              text-align: left;
            `}
          >
            <TblHeaderPrimary column={column} columnName={"Initial Date"} />
          </div>
        ),
        Cell: ({ value }) => (
          <div
            css={css`
              font-size: "15px";
              font-weight: 400;
              color: ${Colors.buttonSubmit};
              font-family: "Inter";
            `}
          >
            {value}
          </div>
        ),
        width: "8%",
      },
      {
        accessor: "end_date",
        Header: ({ column }) => (
          <div
            css={css`
              font-size: "15px";
              font-weight: 600;
              color: ${Colors.buttonSubmit};
              font-family: "Inter";
            `}
          >
            <TblHeaderPrimary column={column} columnName={"End Date"} />
          </div>
        ),
        Cell: ({ value }) => (
          <div
            css={css`
              font-size: "15px";
              font-weight: 400;
              color: ${Colors.buttonSubmit};
              font-family: "Inter";
            `}
          >
            {value}
          </div>
        ),
        width: "11%",
      },
    ];
  }, [selectTable, setSelectTable]);

  const fetchMyPortfolioListData = () => {
    setPfImportTableData(
      fakePortfolioList.map((el) => {
        return {
          ...el,
          name: el.portfolio_name,
          pType: el.portfolio_type,
          underlaying_assets: el.underlaying_assets,
          holdings: el.holdings,
          initial_date: el.initial_date,
          end_date: el.end_date,
        };
      })
    );
  };

  useEffect(() => {
    fetchMyPortfolioListData();
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: pfImportTableData }, useGlobalFilter, useSortBy);

  return (
    <div css={TbContainerBodyCss}>
      <table css={TbContainerCss} {...getTableProps()}>
        <thead css={TbHeadCss}>
          {headerGroups.map((headerGroup, idx) => (
            <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
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
                    key={idx}
                    width={cell.column.width}
                    css={css`
                      text-align: center;
                    `}
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

export default PfMyTable;
