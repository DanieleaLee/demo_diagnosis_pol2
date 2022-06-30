import React, { useState } from "react";
import { css } from "@emotion/react";
import { MdError } from "react-icons/md";
import Colors from "@styles/colors";
import { fakeType } from "./customComponents/Table";
import Table from "./customComponents/Table";
import { BODY_BUTTONS_HEIGHT } from "src/config/constants";
import SearchBar from '@components/molecules/SearchBar';
import * as TextButton from "@components/atoms/TextButton";
import portfolioList from "../../../data/portfolio_list/Portfolio_table.json"

// 알맹이 wrap 그린
export const bodyContainerWrap = (width, height, bgColor, blColor) => css`
  width: ${width};
  height: ${height};
  background-color: ${bgColor};
  /* border: 1px solid ${blColor}; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow-x: auto;
  @media (max-width: 1852px) {
      align-items: flex-start;
      /* background-color: blue; */
    }
`;

export const bodyHeadWrap = (width) => css`
  width: ${width};
  height: ${BODY_BUTTONS_HEIGHT};
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  > p {
    padding-bottom: 30px; // SubTitle : Overlay
  }
`;

export const bodyHeadIcon = (width) => css`
  width: ${width};
  /* background-color: red; */
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 3px; // 버튼들 살짝 띄우기
`;

// 옐로 - 스크롤
export const bodyMainWrap = (
  width = '100%',
  height = '100%',
  bgColor,
  blColor,
  paddingTop = '0px',
  paddingRight = '0px',
  paddingBottom = '0px',
  paddingLeft = '0px'
) => css`
  width: ${width};
  height: ${height};
  min-width: 1852px;
  background-color: ${bgColor};
  /* border:1px solid ${blColor}; */
  padding-top: ${paddingTop};
  padding-right: ${paddingRight};
  padding-bottom: ${paddingBottom};
  padding-left: ${paddingLeft};
  display: flex;
  flex-direction: row;
  justify-content: center; // 이놈이 문제
  overflow-y: auto;
  overflow-x: hidden;
  /* overflow-x: hidden; */
  @media (max-width: 1852px) {
    justify-content: flex-start;
    /* background-color: blue; */
  }
  /* overflow-x: scroll; */
`

export const bodyMain = (width) => css`
  width: ${width};
  display: flex; 
  flex-direction: row; 
  /* border: 1px solid purple; */
  `

export const bodyItem = (width) => css`
  width: ${width};
  position: relative;
  /* overflow-y: scroll; */
`

export type pfResultType = {
  element: Array<string | number>;
};

export const errorMessage = (message: string) => (
  <>
    <span><MdError color={Colors.error}/></span>
    <span css={css`color: ${Colors.error};`}>{message}</span>
  </>
);

const portfolioList_ = portfolioList.map((el) => {
  return {
    id: el.id,
    portfolio_name: el.portfolio_name,
    underlaying_assets: el.underlaying_assets,
    holdings: el.holdings,
    source: el.source,
  };
})


const ArchiveTemplate = ({ 
  dataDiagnosis, 
  setDataDiagnosis,
  selectedPortfolioName,
  setSelectedPortfolioName
}) => {
  // 테이블에 들어가는 데이터
  const [pfImportTableData, setPfImportTableData] = useState([...portfolioList_]);
  
  // (여기선 x) Compared Result 리스트로 올리기 
  const [portfolioList, setPortfolioList] = useState<Array<pfResultType>>([]);

  // 선택된 테이블 리스트, Checkbox 관련
  const [selectedTableArr, setSelectedTableArr] = useState<Array<fakeType>>([]);

  // Checkboxed list pre-processed 
  const selectedTANotUndefined = selectedTableArr.filter(
    (el) => el !== undefined
  );

  // Checkboxed list add flag
  const btnAndMsgCondition = (val: string): boolean => {
    let flag;
    switch (val) {
      case "delete":
        flag =
          selectedTANotUndefined.length === 0 || pfImportedList.length === 0;
        break;
      case "cAnalysis":
        flag =
          selectedTANotUndefined.length === 0 ||
          selectedTANotUndefined.length > 3 ||
          portfolioList.length === 3 ||
          pfImportedList.length === 0;
        break;
      case "error":
        flag = selectedTANotUndefined.length > 3 && pfImportedList.length !== 0;
        break;
      case "allCheck":
        flag = pfImportedList.length !== 0
    }
    return flag;
  };


  // (여기선 x) Compared Result 리스트로 올리기 
  const addSelectedTable = () => {
    // setShowPfComparison(true);
    setPortfolioList(
      selectedTANotUndefined.map((el) => {
        if (el) {
          return {
            element: [
              el.id,
              el.portfolio_name,
              el.portfolio_type,
              el.source,
              el.underlaying_assets,
              el.holdings,
              el.initial_date,
              el.end_date,
            ],
          };
        }
      })
    );
  };

  // (여기선 x)  Table Search 로직
  const [pfImportedList, setPfImportedList] = useState<fakeType[]>(
    selectedTANotUndefined
  );

  return (

    <div css={bodyContainerWrap('100%', '100%', Colors.backgroundPrimary1, '')}>

      <div css={[bodyHeadWrap('1852px')]}>
        <div css={[bodyHeadIcon('500px')]}>
          <TextButton.Small title="Delete" disabled={false} bgTheme="accent" onClick={() => { }} />
          <div css={[css`width: 450px; padding-bottom: 4px; > div {height:38px;}`]}>
            <SearchBar value={''} onChange={() => { }} onSearch={() => console.log('Search for ')} />
          </div>
        </div>

        <div css={[bodyHeadIcon('440px')]}>
          <TextButton.Small title="Import Portfolio" disabled={false} bgTheme="accent" onClick={() => {}}/>
        </div>
      </div>

      <div css={[bodyMainWrap('100%', '100%', '', '')]}>
        <div css={[bodyMain('1852px')]}>
          <div css={[bodyItem('1852px')]} >
            <Table
              selectTable={selectedTANotUndefined} // checkBox
              setSelectTable={setSelectedTableArr} // checkBox
              // filterData={searchPfImportedData} //react table Method 던져줌
              allCheckedCondition={btnAndMsgCondition("allCheck")}
              pfImportTableData={pfImportTableData} // 테이블에 표시되는 데이터
              setPfImportTableData={setPfImportTableData} // 테이블에 표시되는 데이터 설정
              dataDiagnosis={dataDiagnosis} // diagnosis data -> useEffect로 동기화 처리를 위해 받음
              setDataDiagnosis={setDataDiagnosis} // diagnosis data 설정
              selectedPortfolioName={selectedPortfolioName}
              setSelectedPortfolioName={setSelectedPortfolioName}
            />
          </div>
        </div>
      </div>

    </div>

  );
};

export default ArchiveTemplate;
