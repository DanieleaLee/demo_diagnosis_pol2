import {ChartProps} from "@components/molecules/Echarts/Base";
import {ClipLoader} from "react-spinners";
import {css} from "@emotion/react";
import EchartBase from "@components/molecules/Echarts/Base";
import {useLoadingCallback} from "src/lib/hooks/useLoadingCallback";
import {useEffect, useState} from "react";
import {EChartsOption} from "echarts/types/dist/echarts";
import {AAPortfolioStep} from "@interfaces/model";
import {reqListAAModelPortfolio} from "src/api/mp";
import {ConventionalAAPortfolio} from "@components/template/PortfolioLib";

export type FlowStatusBarChartProps = ChartProps & {

}


const emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.3)'
  }
};

const containerWrapper = css`
  display:flex;
  justify-content: center;
  align-items: center;
`;

const AAPortfolioSteps = Object.keys(AAPortfolioStep).filter(it=>isNaN(Number(it)));

const mapper = (data: Array<ConventionalAAPortfolio>)=>{

  const dataByProcessStep = [
    {
      name:'',
      data: [...Array(AAPortfolioSteps.length).keys()]
        .map(i=> data.filter(d=>d.gflow.currentStep === (i+1) ).length ),
    }
  ];

  return [...dataByProcessStep.map(({name, data}, k)=>({
    name: name,
    type: 'bar',
    stack: 'one',
    emphasis: emphasisStyle,
    color: [
      // '#063C62',
      // '#CEE4F2',
      '#0A79C1'
    ][k],
    data,

  }))];

};


const FlowStatusBarChart = ({isLoading, ...props}: FlowStatusBarChartProps) => {

  const defaultOpt :EChartsOption= {
    legend: {
      data: [],
      left: 'center',
      top: '85%'
    },
    top: '10%',
    barWidth: 30,
    width: '400px',
    height: '170px',
    tooltip: {},
    xAxis: {
      data: AAPortfolioSteps.map(as=>as.replace (/_/g, "\n")),
      name: '',
      show: true,
      axisLine: { onZero: true, show:false},
      splitLine: { show: false },
      splitArea: { show: false },
      axisTick: {
        show:false,
      },
      axisLabel:{
        show:true,
        fontSize: 10,
        margin: 5,
      }
    },
    yAxis: {
      // axisLabel: {
      //   formatter: (value, index) => index>0? `${value/1000}K`:"",
      // },
      splitLine: { show: true },
      splitArea: { show: false },
      axisTick: {show:false},
      // min: value => (Math.floor(value.min/5000)-1)*5000,
      // max: value => Math.ceil(value.max/5000)*5000,
      minInterval: 1, // no decimal value.
    },
    grid: {
      bottom: 100
    },
    series: []

  };

  const [opt, setOpt] = useState(defaultOpt);

  useEffect(()=>{
    if(props.data.length){
      const data = mapper(props.data);

      setOpt({
        ...opt,
        legend:{
          ...opt.legend,
          data: data.map(d=>d.name)
        },
        series: (data as any),

      });

    }
    // const data = fetchFlowStatusData(opt);
  }, [props.data]);


  return (
    <div css={[containerWrapper, props.containerCss]}>
      {!!isLoading && <ClipLoader css={css`background: red;`}/>}
      {!isLoading && <EchartBase option={opt}/>}
    </div>
  );
};

export default FlowStatusBarChart;