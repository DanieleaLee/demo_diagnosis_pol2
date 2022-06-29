import { css } from "@emotion/react";
import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { BiLayer } from "react-icons/bi";
import { HiServer } from "react-icons/hi";
import Colors from "@styles/colors";
import { flexRow } from "@styles";
import TblHeaderPrimary from "@components/molecules/TblHeaderPrimary";
import { TinyBg } from "@lucian2Components/atoms/Button/TextButtonTinyWithBg";
import InputCheckbox from "@lucian2Components/atoms/InputCheckbox";

const TbContainerCss = css`
  display: block;
  padding: 1rem;
  width: 100%;
  height: auto;
  background-color: white;
  border: 0.5px solid ${Colors.divider};
  border-radius: 8px;
  padding: 20px 20px 20px 41px;
`;

const TbWrapCss = css`
  width: 100%;
  border-spacing: 0;
`;

const TbHeadCss = css`
  display: inline-block;
  width: 100%;
  padding: 0 30px 12px 0;
`;

const TbBodyCss = css`
  display: inline-block;
  width: 100%;
  height: 542px;
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
  &:first-of-type {
    border-top: 0.5px solid ${Colors.borderPrimary};
  }

  border-bottom: 0.5px solid ${Colors.borderPrimary};
  height: 50px;
  text-align: center;
  padding: 0 25px 33px 0;
`;

const TbButtonWrapCss = () => css`
  ${flexRow}
  padding-left:20px;
  & > button:first-of-type {
    margin-right: 9px;
  }
`;

export type fakeType = {
  id: string;
  portfolio_name: string;
  portfolio_type: string;
  underlaying_assets: string;
  holdings: number;
  source: string;
  initial_date: string;
  end_date: string;
};

interface Props {
  selectTable: Array<fakeType>;
  setSelectTable: React.Dispatch<React.SetStateAction<Array<fakeType>>>;
  filterData: Array<fakeType>;
  allCheckedCondition: boolean;
}

const Table = ({
  setSelectTable,
  selectTable,
  filterData,
  allCheckedCondition,
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
              checked={hasAllContents && allCheckedCondition}
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
                top: 0px;
              `}
              onChange={() => {
                if (selectTable.includes(row.original)) {
                  setSelectTable((prev) =>
                    prev.filter((el) => el !== row.original)
                  );
                } else {
                  setSelectTable((prev) => [...prev, row.original]);
                }
              }}
              checked={selectTable.includes(row.original)}
            />
          );
        },
        width: "1%",
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
        width: "20%",
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
      },
      {
        accessor: "source",
        Header: ({ column }) => (
          <div
            css={css`
            fontSize="15px"
            fontWeight="600"
            color={Colors.buttonSubmit};
              font-family: "Inter";
              text-align: center;
            `}
          >
            <TblHeaderPrimary column={column} columnName={"Source"} />
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
      },
      {
        accessor: "button", // accessor is the "key" in the data
        Header: ({ column }) => <></>,
        Cell: ({ row }) => {
          return (
            <div css={TbButtonWrapCss}>
              <TinyBg
                icon={() => <HiServer color={Colors.backgroundWhite} />}
                title="Analytics"
                bgTheme="accent"
                height={30}
                onClick={() => {}}
              />
              <TinyBg
                icon={() => <BiLayer color={Colors.backgroundWhite} />}
                title="Overlay"
                bgTheme="primary"
                height={30}
                onClick={() => {}}
              />
            </div>
          );
        },
        width: "14%",
      },
    ];
  }, [selectTable, setSelectTable, allCheckedCondition]);

  const {
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    ...tableProps
  } = useTable({ columns, data: filterData }, useGlobalFilter, useSortBy);

  return (
    <div css={TbContainerCss}>
      <table css={TbWrapCss} {...getTableProps()}>
        <thead css={TbHeadCss}>
          {headerGroups.map((headerGroup, idx) => (
            <tr  key={idx} {...headerGroup.getHeaderGroupProps()}>
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

export default Table;
