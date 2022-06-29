import { css, SerializedStyles } from '@emotion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import CheckBox from '@components/atoms/CheckBox';
import Image from 'next/image';
import THLineChart from '../../organisms/THLineChart';

const tableContainerStyle = (columnsCount: number) => css`
  /* min-width: ${columnsCount * 40}px; */
  width: inherit;
`;

const fixedWidthColumnStyle = (width: number) => css`
  /* min-width: ${width}px; */
  width: ${width}px;
  flex-grow: 0;
`;

const headerContainerStyle = css`
  display: flex;
  border-bottom: 1px solid #9fadb7;
  padding-right: 16px; //스크롤바 width 만큼 row container 내부 영역이 밀려서 padding추가
`;

const baseHeaderStyle = css`
  flex-grow: 1;
  /* white-space: pre-wrap; */
  white-space: pre; // 개행문자만 줄바꿈 & 자동 줄바꿈 X
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  /* min-width: 40px; //cell width 최소값 설정 */
  width: 100%;
`;

const baseHeaderTextStyle = css`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #2f3b43;
`;

const rowContainerStyle = (height?: number) => css`
  display: flex;
  height: ${height}px;
`;

type BaseRowType = {
  width: number;
};

const baseRowStyle = ({ width }: BaseRowType) => css`
  flex-grow: 1;
  /* min-width: 40px; //cell width 최소값 설정 */
  width: ${width}px;
  display: flex;
  align-items: center;

  border-bottom: 1px solid #ced9e1;
`;

const baseRowTextStyle = css`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #2f3b43;
  white-space: pre-wrap;
  overflow: hidden;
`;

const tableFooterStyle = css`
  display: flex;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #2f3b43;
`;

type TextEllipsisType = {
  align?: 'left' | 'center' | 'right';
};
const textEllipsisStyle = ({ align = 'center' }: TextEllipsisType) => css`
  width: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: ${align};
`;

export type TColumn = {
  field: string;
  headerName: string;
  type?: 'number' | 'lineChart' | 'image' | 'tag';
  width?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  customHeaderStyle?: SerializedStyles | Array<SerializedStyles>;
};
export type TRow = {
  [s: string]: any;
};

interface TableDefaultType {
  rows: TRow[];
  columns: TColumn[];
  containerCss?: SerializedStyles;
  headerStyle?: SerializedStyles;
  rowHeight?: number;
  selectable?: boolean;
  perPage?: number;
  actions?: {
    icon: JSX.Element;
    tooltip: string;
    onClick: (event) => void;
  }[];
  infiniteScroll?: boolean;
}

export interface CustomTableProps extends TableDefaultType {
  fetchData?: (perPage: number) => Promise<void>;
}

const CustomTable = ({
  rows,
  columns,
  headerStyle,
  rowHeight,
  selectable,
  perPage = 10,
  fetchData,
  infiniteScroll,
  actions,
}: CustomTableProps) => {
  const [initRows, setInitRows] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [colWidthArr, setColWidthArr] = useState<number[]>();
  const [selectAll, setSelectAll] = useState(false);
  const [checkedObj, setCheckedObj] = useState({});
  const [sortChecked, setSortChecked] = useState<number[]>(new Array(columns.length).fill(0));
  const scrollRef = useRef();
  const intersectRef = useRef();
  const [page, setPage] = useState(0);
  const [infiniteStart, setInfiniteStart] = useState(false);

  const resetSortChecked = useCallback(() => {
    setSortChecked(new Array(columns.length).fill(0));
  }, [columns.length]);

  useEffect(() => {
    const _rows = rows.map((row, i) => ({ ...row, id: i }));
    setInitRows(_rows);
    setTableRows(_rows);
    console.log('오리진 바뀔때', _rows);
    resetSortChecked();
  }, [rows, resetSortChecked]);

  const handleSelectAll = (flag: boolean) => {
    setSelectAll(flag);
    const tempCheckedObj = {};
    tableRows.forEach((el) => {
      tempCheckedObj[el.id] = flag;
    });

    setCheckedObj(tempCheckedObj);
  };

  useEffect(() => {
    if (!infiniteScroll) return;
    setInfiniteStart(true);
    if (page * perPage !== rows.length) return;
    if (page < 1) return;
    fetchData(page);
  }, [page, perPage, fetchData, infiniteScroll, rows.length]);

  useEffect(() => {
    if (!infiniteScroll) return;
    if (infiniteStart) {
      const observer = new IntersectionObserver(
        (entries) => {
          const target = entries[0];
          if (target.isIntersecting) {
            console.log('is InterSecting');
            setPage((prev) => prev + 1);
          }
        },
        {
          root: scrollRef?.current,
          rootMargin: `${rowHeight * perPage}px 0px 0px 0px`,
          threshold: 1.0,
        }
      );
      observer.observe(intersectRef.current);
      return () => observer.disconnect();
    }
  }, [infiniteScroll, infiniteStart, rowHeight, perPage]);

  useEffect(() => {
    const _checkedArr = Object.values(checkedObj).filter((el) => el);
    if (_checkedArr.filter((el) => el).length === tableRows.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [checkedObj, tableRows]);

  useEffect(() => {
    const resizeColWidth = () => {
      const _colWidthArr = columns.map(
        (col, i) => document.getElementById(`header-${col.field}-${i}`).getBoundingClientRect().width
      );
      setColWidthArr(_colWidthArr);
    };
    const debounceResizeColWidth = debounce(resizeColWidth, 100);
    resizeColWidth();

    window.addEventListener('resize', debounceResizeColWidth);
    return () => {
      window.removeEventListener('resize', debounceResizeColWidth);
    };
  }, [columns]);

  const handleRowSelect = (id: number) => {
    setCheckedObj((prev) => ({
      ...prev,
      [id]: checkedObj[id] === undefined ? true : !checkedObj[id],
    }));
  };

  const fetchChartData = async (chartData: any[]) => {
    return await new Promise((resolve, _) => {
      resolve([{ data: [chartData[0]] }, { data: chartData }, { data: [chartData[chartData.length - 1]] }]);
    });
  };

  const handleSort = (field: string, type: string) => {
    const getValueOfKeyAsc = (arr: any[], key: string) => {
      const _arr = [...arr];
      return _arr.sort(function (a, b) {
        const valueOfKeyA = a[key].toUpperCase();
        const valueOfKeyB = b[key].toUpperCase();
        return valueOfKeyA.localeCompare(valueOfKeyB, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });
    };
    const getValueOfKeyDesc = (arr: any[], key: string) => {
      const _arr = [...arr];
      return _arr.sort(function (a, b) {
        const valueOfKeyA = a[key].toUpperCase();
        const valueOfKeyB = b[key].toUpperCase();
        return valueOfKeyB.localeCompare(valueOfKeyA, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });
    };

    // 여기서 type은 버튼 누르기 이전의 type이 들어온다.
    // type의 순서는 다음과 같다. ["init", "asc", "desc"]
    let newArr = initRows;

    switch (type) {
      case 'init':
        newArr = getValueOfKeyAsc(tableRows, field);
        break;
      case 'asc':
        newArr = getValueOfKeyDesc(tableRows, field);
        break;
      default:
        newArr = initRows;
    }

    setTableRows(newArr);
  };

  return (
    <div css={tableContainerStyle(columns.length)}>
      <div css={[headerContainerStyle, baseHeaderTextStyle, headerStyle]}>
        {selectable && <CheckBox checked={selectAll} onChange={() => handleSelectAll(!selectAll)} />}

        {columns.map((col, i) => {
          let type = 'init';
          switch (sortChecked[i] % 3) {
            case 1:
              type = 'asc';
              break;
            case 2:
              type = 'desc';
              break;
            default:
              type = 'init';
          }

          return (
            <div
              id={`header-${col.field}-${i}`}
              key={`${col.field}-${i}`}
              css={[baseHeaderStyle, col.customHeaderStyle, col.width && fixedWidthColumnStyle(col.width)]}
            >
              <span
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 5px;
                `}
              >
                <span css={textEllipsisStyle({})}>{col.headerName}</span>
                <span
                  css={css`
                    height: 20px;
                    cursor: pointer;
                  `}
                  onClick={() => {
                    col.sortable && handleSort(col.field, type);
                    setSortChecked((prev) => {
                      const temp = [...prev];
                      const temp2 = new Array(columns.length).fill(0);
                      temp2[i] = temp[i] + 1;
                      return temp2;
                    });
                  }}
                >
                  {col.sortable && (
                    <div
                      css={css`
                        width: 17px;
                        height: 17px;
                        background-color: ${type === 'init' ? '#9DA6AD' : '#525F68'};
                        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
                        border-radius: 2px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      `}
                    >
                      <Image width={13} height={13} src={`/img/taehyun/bx-sort-${type}.png`} alt="sort_icon" />
                    </div>
                  )}
                </span>
              </span>
            </div>
          );
        })}

        {actions?.map((act, i) => (
          <div
            id={`header-${act.tooltip}-${i}`}
            key={`${act.tooltip}`}
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <span
              css={css`
                width: 100px;
              `}
            >
              {act.tooltip}
            </span>
          </div>
        ))}
      </div>

      {colWidthArr && (
        <div
          ref={scrollRef}
          css={css`
            height: ${rowHeight * perPage}px;
            overflow-y: scroll;
            /* padding-right: 50px; // Todo 스크롤바 스타일링 하고 변경 headerContainerStyle 패딩도 함께 조절해야함 */
          `}
        >
          <div>
            {tableRows.map((row, i) => {
              return (
                <div key={i} css={[rowContainerStyle(rowHeight)]}>
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      border-bottom: 1px solid #ced9e1;
                    `}
                  >
                    {selectable && (
                      <CheckBox checked={checkedObj[row.id] || false} onChange={() => handleRowSelect(row.id)} />
                    )}
                  </div>
                  {columns.map((col, i) => {
                    return (
                      <div
                        css={[
                          baseRowStyle({
                            width: colWidthArr[i],
                          }),
                          baseRowTextStyle,
                          col.width && fixedWidthColumnStyle(col.width),
                        ]}
                        key={col.field + i}
                      >
                        <div css={textEllipsisStyle({ align: col.align })}>
                          {col.field === 'Performance' ? (
                            <THLineChart
                              color={['#2E3B43']}
                              animation={false}
                              fetchFn={() => fetchChartData(row[col.field])}
                              showSymbol={true}
                              containerCss={css`
                                width: 100%;
                                height: ${rowHeight * 0.8}px;
                              `}
                              customOptions={{
                                xAxis: [
                                  {
                                    type: 'category',
                                    show: false,
                                    data: new Array(row['Performance'].length).fill(0).map((_, i) => i),
                                  },
                                  {
                                    type: 'category',
                                    show: false,
                                    data: new Array(row['Performance'].length).fill(0).map((_, i) => i),
                                  },
                                  {
                                    type: 'category',
                                    show: false,
                                    data: new Array(row['Performance'].length).fill(0).map((_, i) => i),
                                    inverse: true,
                                  },
                                ],
                              }}
                            />
                          ) : (
                            row[col.field]
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {actions?.map((act, i) => (
                    <div
                      css={[
                        baseRowStyle({
                          width: 100,
                        }),
                        css`
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        `,
                      ]}
                      key={act.tooltip + i}
                    >
                      <div
                        css={css`
                          width: 23px;
                          height: 23px;
                          cursor: pointer;
                        `}
                        onClick={act.onClick}
                      >
                        {act.icon}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            <div
              ref={intersectRef}
              css={css`
                height: 1px;
              `}
            />
          </div>
        </div>
      )}

      <div css={tableFooterStyle}>
        <div
          css={css`
            margin-top: 6px;
            padding-left: 7px;
          `}
        >
          {`${Object.values(checkedObj).filter((el) => el).length} of ${tableRows.length} selected`}
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
