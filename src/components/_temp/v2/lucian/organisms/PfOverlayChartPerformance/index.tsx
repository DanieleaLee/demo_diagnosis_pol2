import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { flexColumn } from "@styles";
import * as Typography from "@styles/typography";
import PCLineChart2 from "@components/customCharts/PCLine2Chart";
import PfOverlayPerformanceTable from "@lucian2Components/molecules/PfOverlayPerformanceTable";
import { ContentsType } from "@lucian2Components/organisms/PfOverlayFilterBox";
import { PfOverlayResultProps } from "@lucian2Components/templates/PfOverlayResultTemplate";
import { flexRowStyle } from "@lucian2Components/templates/PfOverlayTemplate";
import { PFOLPERFORMANCE_DUMMY_DATA } from "@lucian2Components/Dummy";
import PfOverlayPeriodAxis from "@lucian2Components/molecules/PfOverlayPeriodAxis";
import PfOverlayDateBar from "@lucian2Components/molecules/PfOverlayDateBar";



const flexColumnStyle = css`
  ${flexColumn}
`;

const PfOlChartPmContainerCss = css`
  width: 100%;
  max-width: 978px;
  height: auto;
`;

const PfOlChartPmUpperWrapCss = css`
  ${flexColumn};
  width: 100%;
  height: auto;
  background: ${Colors.backgroundWhite};
  border: 1.20514px solid ${Colors.primary6};
  border-radius: 8px;
  position: relative;
  margin: 10px 0;
`;

const chartTitleCss = css`
  padding: 20px 0 0 26px;
`;

const periodWrapCss = css`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
`;


const periodLeftWrapCss = css`
  width: 150px;
  height:100%;
  text-align: right;
  padding-right: 16px;
`;

const periodRightWrapCss = css`
  width: 805px;
  height:100%;
  /* border: 1px solid green; */
`;


const peformanceTableWrapCss = css`
  width: 978px;
  height: 250.81px;
  background: ${Colors.backgroundWhite};
  border: 1.20514px solid ${Colors.primary6};
  border-radius: 8px;
`;

interface Props {
  data: PfOverlayResultProps[];
  linechartData: any;
  tableData_: any;
  contents: ContentsType;
  showChart?: boolean;
}

export type TableDataType = {
  id: number;
  hip?: string;
  cagr: string;
  volatility: string;
  mdd: string;
  sharpe: string;
  var: string;
  beta: string;
  chart: number;
};

export interface PeriodData extends TableDataType {
  start_date: string;
  end_date: string;
}

export type DataType = {
  id: number;
  name: string;
  tb_data: TableDataType[];
};

const getAxisList = (obj_)=>{
  return [...obj_].filter((el, i)=>el.name == 'Whole').map((v,i)=> {
    const start_year = Number(v["start_date"].split('-')[0])
    const end_year = Number(v["end_date"].split('-')[0])
    let axislist = []
    for (let i = start_year; i <= end_year; i++) {
      axislist.push(i)
    }
    return axislist
  })[0]
}

// 라인차트와 datebar 구현하기 위한 컴포넌트
// 전반적으로 수정 필요.
const PfOverlayChartPerformance = ({ data, linechartData, tableData_, contents, showChart }: Props) => {

  const [lineData, setLineData] = useState('')
  const [tableData, setTableData] = useState<any>('');
  const [selectedId, setSelectedId] = useState(1);
  const [axisList, setAxisList] = useState<any>('')

  useEffect(() => {
    setTableData(tableData_);
    setLineData(linechartData);
    setAxisList(getAxisList(tableData_))
  }, []);

  // inflation bar에서 select 함
  const onSelectDatebarHandler = (selectedId) => {
    const isTbData =  (tableData_.filter((el,i)=>el.id == selectedId && el.tb_data).length) ? true : false
    if (isTbData) setSelectedId(selectedId)
  };

  return (
    
    <div css={PfOlChartPmContainerCss}>
      <div css={PfOlChartPmUpperWrapCss}>
        <div css={flexColumnStyle}>
          <Typography.Subtitle4 color={Colors.buttonSubmit} css={chartTitleCss}>
            Portfolios Historical Chart
          </Typography.Subtitle4>
          <div css={css` width: 953px; height: 225px;`}>
            {lineData && (
              <PCLineChart2
                animation={true}
                color={["#9E72FA","#294B70","#4A74BE","#4C86E7","#5CC9BB","#A6A6A6",]}
                lineWidth={[1.2, 1.2, 1.2, 1.2, 1.2, 1.2]}
                rowData={[
                  {rowData: lineData["Original Portfolio"],name: "Original Portfolio",},
                  {rowData: lineData["Benchmark"],name: "Benchmark",},
                  {rowData: lineData["Overlaid Portfolio1"],name: "Overlaid Portfolio1",},
                  {rowData: lineData["Overlaid Portfolio2"],name: "Overlaid Portfolio2",},
                  {rowData: lineData["Overlaid Portfolio3"],name: "Overlaid Portfolio3",},
                  {rowData: lineData["Overlaid Portfolio4"],name: "Overlaid Portfolio4",},
                ]}
                isLoading={false}
                containerCss={css`width: 100%;height: 100%;`}
              />
            )}
          </div>
          <div css={css` width: 975.61px; height: 80.98px;`}>
            {axisList && (
              <div css={periodWrapCss}>

                <div css={[css`height: 19px; display: flex; flex-direction: row;`]}>
                  <div css={periodLeftWrapCss}>
                    <Typography.Body4>Inflation Period</Typography.Body4>
                  </div>
                  <div css={[periodRightWrapCss, css`padding-top: 5px;`]}>
                  <PfOverlayDateBar
                    axisList={axisList} 
                    name={"inflation period"}
                    wholeMonths={184}
                    wholeWidth={805}
                    data={tableData_.slice(1)}
                    onSelectDatebar={onSelectDatebarHandler}
                  />
                  </div>
                </div>

                <div css={[css`height: 15px; display: flex; flex-direction: row;`]}>
                  <div css={periodLeftWrapCss}>  
                    <Typography.Body4>Whole Period</Typography.Body4>
                  </div>
                  <div css={[periodRightWrapCss, css`padding-top: 5px;`]}>
                  <PfOverlayDateBar
                    axisList={axisList} 
                    name={"whole period"}
                    wholeMonths={184}
                    wholeWidth={805}
                    data={tableData_.slice(0,1)}
                    onSelectDatebar={onSelectDatebarHandler}
                  />
                  </div>
                </div>

                <div css={[css`display: flex; flex-direction: row;`]}>
                  <div css={[periodLeftWrapCss, css`padding-top: 3px;`]}>
                  </div>
                  <div css={periodRightWrapCss}>
                    <PfOverlayPeriodAxis 
                      axisList={axisList} 
                      wholeMonths={184}
                      wholeWidth={805}
                    />
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
      <div css={peformanceTableWrapCss}> 
        {tableData && tableData
          .filter((el,i)=>el.id == selectedId)
          .map((el, idx) => (
            <PfOverlayPerformanceTable
              key={el.id}
              filterSelectedbar={el}
              contents={contents}
              showChart={showChart}
              tableData={el.tb_data}
            />
          )
        )}
      </div>
    </div>
  );
};

export default PfOverlayChartPerformance;
