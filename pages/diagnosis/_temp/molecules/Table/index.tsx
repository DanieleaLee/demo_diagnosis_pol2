import { css } from "@emotion/react";
import { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { BiLayer } from "react-icons/bi";
import { HiServer } from "react-icons/hi";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { flexRow } from "@styles";
// import CheckBox from "@components/atoms/CheckBox";
import CheckBoxV2 from "../../atoms/CheckBoxV2";
import TblHeaderPrimary from "@components/molecules/TblHeaderPrimary";
import { TinyBg } from "@lucian2Components/atoms/Button/TextButtonTinyWithBg";
import { NumberSchema } from "yup";
import { useRouter } from 'next/router';

const TbContainerCss = css`
  display: block;
  height: 90%;
  width: 100%;
  background-color: white;
  margin-top: 10px;
  border: 0.5px solid ${Colors.divider};
  border-radius: 8px;
  padding: 20px 20px 20px 41px;
  overflow-y: auto;
  position: relative;
  /* border: none; */
  /* border: 1px solid red; */
`;

const TbWrapCss = css`
  /* display: inline-block; */
  width: 100%;
`;

const TbHeadCss = css`
  /* display: inline-block; */
  width: 100%;
  /* padding: 0 30px 12px 0; */
  height: 50px;
  border-bottom: 0.5px solid ${Colors.primary5};
`;

const TbBodyCss = css`
  /* display: inline-block; */
  width: 100%;
  // height: 542px; // 0514 테이블 BODY Container 조정
  overflow: auto;
  /* padding-right: 25px; */

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
  /* padding: 0 25px 33px 0; */
`;

const TbButtonWrapCss = css`
  ${flexRow}
  justify-content:center;
  /* border: 1px solid black; */
  & > button > p {
    margin-bottom: -5px;
  }
`;

const TbHeaderCss = css`
  font-size: "15px";
  font-weight: 600;
  color: ${Colors.buttonSubmit};
  font-family: "Inter";
  /* border: 1px solid black; */
`
const TbCellCss = css`
  font-size: "15px";
  font-weight: 400;
  color: ${Colors.buttonSubmit};
  font-family: "Inter";
  /* border: 1px solid black; */
`

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
  // filterData: Array<fakeType>;
  allCheckedCondition: boolean;
  pfImportTableData?: any[];
  setPfImportTableData?: any;
  setStep?: any;
  dataDiagnosis?: any;
  setDataDiagnosis?: any;
  selectedPortfolioName?: any;
  setSelectedPortfolioName?: any;
}

const Table = ({
  setSelectTable,
  selectTable,
  // filterData,
  allCheckedCondition,
  pfImportTableData,
  setPfImportTableData,
  dataDiagnosis,
  setDataDiagnosis,
  selectedPortfolioName,
  setSelectedPortfolioName
}: Props) => {

  const [skipCount, setSkipCount] = useState(true);
  const router = useRouter();

  const exportHandler = (row) => {
    const id = (Number(row.id) + 1) % 2
    const id_ = (id == 0 ? Number(id) + 2 : id)
    const selectedPortfolioName = 'portfolio' + id_
    console.log('selectedPortfolioName :', selectedPortfolioName)
    setSelectedPortfolioName(selectedPortfolioName)
    router.push("/diagnosis")
  }

  // to next page!
  // useEffect(() => {
  //   if (skipCount) setSkipCount(false);
  //   if (!skipCount) {
  //     console.log('가즈아!! Step2 번으로 : ', selectedPortfolioName)
  //     setStep(prev => prev + 1)
  //   }
  // }, [selectedPortfolioName])

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
            <CheckBoxV2
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
            <div css={css`width: 30px; position: absolute;`}>
            <CheckBoxV2
              containerCss={css`
                position: relative;
                top: 4px;
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
            </div>
          );
        },
        width: "1%",
        maxWidth: 40,
      },
      {
        accessor: "portfolio_name",
        Header: ({ column }) => (
          <div css={[TbHeaderCss ,css`text-align: left; padding-left: 110px;`]}>
            <TblHeaderPrimary column={column} columnName={"Portfolio Name"} />
          </div>
        ),
        Cell: ({ value }) => <div css={[TbCellCss, css`text-align: left; padding-left: 110px;`]}>{value}</div>,
        width: "14%",
      },
      {
        accessor: "underlaying_assets",
        Header: ({ column }) => (
          <div css={[TbHeaderCss]}>
            <TblHeaderPrimary column={column} columnName={"Underlaying Assets"} />
          </div>
        ),
        Cell: ({ value }) => <div css={[TbCellCss]}>{value}</div>,
        width: "17%",
      },
      {
        accessor: "holdings",
        Header: ({ column }) => (
          <div css={[TbHeaderCss]}>
            <TblHeaderPrimary column={column} columnName={"# of Holdings"} />
          </div>
        ),
        Cell: ({ value }) => <div css={[TbCellCss]}>{value}</div>,
        width: "7%",
      },
      {
        accessor: "source",
        Header: ({ column }) => (
          <div css={[TbHeaderCss]}>
            <TblHeaderPrimary column={column} columnName={"Source"} />
          </div>
        ),
        Cell: ({ value }) => <div css={[TbCellCss]}>{value}</div>,
        width: "16%",
      },

      {
        accessor: "start", // accessor is the "key" in the data
        Header: ({ column }) => (
          <div css={[TbHeaderCss]}>
            Start
          </div>
        ),
        Cell: ({ row }) => {
          return (
            <div css={[TbButtonWrapCss]}>
              <TinyBg
                icon={() => <HiServer color={Colors.backgroundWhite} size={14} />}
                title="Diagnosis"
                bgTheme="accent"
                height={30}
                onClick={() => {
                  exportHandler(row)
                }}
              // onClick={() => {
              //   console.log('row: ', row)
              // }}
              />
            </div>
          );
        },
        width: "10%",
      },
    ];
  }, [selectTable, setSelectTable, allCheckedCondition]);


  // 데이터 전처리

  useEffect(() => {
    // setPfImportTableData(fakePortfolioList_)
  }, []);


  const {
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    ...tableProps
  } = useTable({ columns, data: pfImportTableData }, useGlobalFilter, useSortBy);
  return (
    <div css={TbContainerCss}>
      <table css={TbWrapCss} {...getTableProps()}>
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
                      padding-top: 6px;
                      box-sizing: content-box;
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
