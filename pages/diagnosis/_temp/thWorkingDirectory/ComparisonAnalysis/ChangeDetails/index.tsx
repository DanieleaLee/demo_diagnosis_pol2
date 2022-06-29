import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import BasicBox from "@components/atoms/BasicBox";
import { BiChevronRight } from "react-icons/bi";
import SortButton from "./SortButton";

const titleContainerStyle = css`margin-bottom: 12px;`; // prettier-ignore
const tableStyle = css`
  display: block;
  width: 100%;

  & th {
    border-bottom: 0.3px solid #9da6ad;
    height: 31px;
    padding: 9px 0 6px 0;
  }
  & td {
    border-bottom: 0.5px solid #ced9e1;
    height: 31px;
    vertical-align: middle;
  }
  & tbody {
    display: block;
    height: 279px;
    overflow: auto;
    &::-webkit-scrollbar {
      background: #ececec;
      border-radius: 1.5px;
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 1.5px;
      background: #2f3b43;
    }
  }
  & th:nth-of-type(1),
  & td:nth-of-type(1) {
    width: 97px;
  }
  & th:nth-of-type(2),
  & td:nth-of-type(2) {
    width: 119px;
  }
  & th:nth-of-type(3),
  & td:nth-of-type(3) {
    width: 131px;
    text-align: center;
  }
  & th:last-child,
  & td:last-child {
    width: 80px;
    text-align: center;
  }
`;

type RowDataType = { Ticker: string; Original: number; AfterLayered: number; Changes: number }[];

type ChangeDetails = {
  rowData: RowDataType;
};
const ChangeDetails = ({ rowData }: ChangeDetails) => {
  const [tableRows, setTableRows] = useState<RowDataType>();
  const [sortChecked, setSortChecked] = useState({ Original: false, AfterLayered: false, Changes: false });

  useEffect(() => {
    setTableRows(rowData);
    setSortChecked({ Original: false, AfterLayered: false, Changes: false });
  }, [rowData]);

  const handleSort = (field: string, type: string) => {
    const temp: any = {};

    for (const property in sortChecked) {
      temp[property] = false;
    }
    temp[field] = !sortChecked[field];
    setSortChecked(temp);

    const getValueOfKeyAsc = (arr: any[], key: string) => {
      const _arr = [...arr];
      return _arr.sort(function (a, b) {
        return Number(a[key]) - Number(b[key]);
      });
    };
    const getValueOfKeyDesc = (arr: any[], key: string) => {
      const _arr = [...arr];
      return _arr.sort(function (a, b) {
        return Number(b[key]) - Number(a[key]);
      });
    };

    let newArr;

    switch (type) {
      case "asc":
        newArr = getValueOfKeyAsc(tableRows, field);
        break;
      case "desc":
        newArr = getValueOfKeyDesc(tableRows, field);
        break;
      default:
        newArr = [...tableRows];
    }

    setTableRows(newArr);

    // 여기서 type은 버튼 누르기 이전의 type이 들어온다.
    // type의 순서는 다음과 같다. ["init", "asc", "desc"]
    // let newArr = initRows;

    // switch (type) {
    //   case 'init':
    //     newArr = getValueOfKeyAsc(tableRows, field);
    //     break;
    //   case 'asc':
    //     newArr = getValueOfKeyDesc(tableRows, field);
    //     break;
    //   default:
    //     newArr = initRows;
    // }

    // setTableRows(newArr);
  };

  return (
    <>
      <Typography.Body2 color="#2F3B43" css={titleContainerStyle} lineHeight="15.73px">
        Change Detail
      </Typography.Body2>
      <BasicBox
        width={480}
        height={336}
        borderColor="#CED9E1"
        paddingTop={4}
        paddingBottom={22}
        paddingLeft={16}
        paddingRight={13}
      >
        <table css={tableStyle}>
          <thead>
            <tr>
              <th>
                <Typography.Body4 color="#2F3B43" lineHeight="14.52px">
                  Ticker
                </Typography.Body4>
              </th>
              <th>
                <Typography.Body4 color="#2F3B43" lineHeight="14.52px">
                  Original
                  <SortButton toggle={sortChecked.Original} onClick={handleSort} fieldName="Original" />
                </Typography.Body4>
              </th>
              <th>
                <Typography.Body4 color="#2F3B43" lineHeight="14.52px">
                  After Layered
                  <SortButton toggle={sortChecked.AfterLayered} onClick={handleSort} fieldName="AfterLayered" />
                </Typography.Body4>
              </th>
              <th>
                <Typography.Body4 color="#2F3B43" lineHeight="14.52px">
                  Changes
                  <SortButton toggle={sortChecked.Changes} onClick={handleSort} fieldName="Changes" />
                </Typography.Body4>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableRows?.map((row) => (
              <tr key={row.Ticker}>
                <td>
                  <Typography.Body4 color="#2F3B43" lineHeight="14.52px">
                    {row.Ticker}
                  </Typography.Body4>
                </td>
                <td
                  css={css`
                    position: relative;
                  `}
                >
                  <Typography.Body4
                    css={css`
                      padding-left: 6px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    `}
                    color="#5B6266"
                    lineHeight="14.52px"
                  >
                    {row.Original}%
                    <BiChevronRight size={30} color="#94A1A9" />
                  </Typography.Body4>
                </td>
                <td>
                  <Typography.Body4 color="#5B6266" lineHeight="14.52px">
                    {row.AfterLayered}%
                  </Typography.Body4>
                </td>
                <td>
                  <Typography.Body4 color="#5B6266" lineHeight="14.52px">
                    {row.Changes}%
                  </Typography.Body4>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </BasicBox>
    </>
  );
};

export default ChangeDetails;
