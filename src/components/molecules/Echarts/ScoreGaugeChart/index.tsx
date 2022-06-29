import EchartBase, {ChartProps} from "../Base";
import { EChartsOption} from "echarts/types/dist/echarts";
import {css} from "@emotion/react";
import {useEffect, useState} from "react";
import {ClipLoader} from "react-spinners";
import Colors from "@styles/colors";
import media from "@styles/media";

const containerWrapper = css`
  display:flex;
  justify-content: center;
  align-items: center;
`;

const scoreLabelPosition = css`
  position:relative;
  top: 15%;
  left: -68%;
  
  ${media.xlarge} {  //1400
    left: -71%;
  }
  ${media.large} { // 1200
    left: -76%;
  }
  ${media.medium} { // 1024
    left: -80%;
  }
  ${media.small} { // 768
    left: -63%;
  }
  ${media.xsmall} { // 576
    left: -69%;
  }
  @media(max-width: 440px) {
    left: -74%;
  }
  ${media.xxsmall} {
    left: -77%;
  }
  
`;

export interface GaugeChartProps extends ChartProps {
  width?: number;
  animation?: boolean;
  backgroundColor?: string;
  dataMapper: any; //(data:any) => EChartsOption;
}


const ScoreGaugeChart = ({width=150, isLoading, ...props}:GaugeChartProps) => {


  const defaultOpt :EChartsOption= {

    series: [
      {
        radius: '80%',
        center: ['50%', '70%'],
        type: 'gauge',
        animation: !!props.animation,
        axisLine: {
          lineStyle: {
            width: 50, // 굵기
            color:[
              [1, props.backgroundColor || Colors.semanticGraph2],
            ]
          },
        },
        startAngle: 180,
        endAngle: 0,
        markLine: {
          lineStyle: {
            width: 50
          }
        },

        pointer: { show:false, },
        progress: {
          show: true,
          overlap: true,
          roundCap: false, //
          width: 50
        },
        axisTick:{ show:false, },
        axisLabel: { show:false },
        splitLine:{ show:false },
        data: [],
        title: {
          fontSize: 14
        },
        detail: {
          width: 20,
          height: 14,
          fontSize: 20,
          color: '#fff',
          backgroundColor: 'transparent',
          borderRadius: 0,
          formatter: '{value}'
        },

      }
    ]
  };


  const [opt, setOpt] = useState(defaultOpt);
  const [score, setScore] = useState(0);

  useEffect(()=>{

    if(props.data.length){
      const data = props.dataMapper(props.data);

      if (data[1].value == 0)
        data.splice(2,1);

      setOpt({
        series: [{
          ...opt.series[0],
          data,

        }]
      });
    }
  }, [props.data]);

  useEffect(()=>{

    if(opt.series[0].data.length === 4){
      const s = opt.series[0].data[0].name * (opt.series[0].data[1].value / opt.series[0].data[3].value);
      setScore(s);
    }
  },[opt]);


  return(
    <div css={[containerWrapper, props.containerCss]}>
      {!!isLoading && <ClipLoader css={css`background: red;`}/>}
      {!isLoading && <EchartBase option={opt}/>}
      <text css={css`${scoreLabelPosition} color:white; font-size: 20px;
    font-family: sans-serif;
    font-weight: bold;`}>{score}</text>
    </div>
  );


};

export default ScoreGaugeChart;