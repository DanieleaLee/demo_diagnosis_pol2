import {useRef, useEffect} from "react";
import {init, getInstanceByDom} from "echarts";
import {EChartsOption, SetOptionOpts} from "echarts";
import {css} from "@emotion/react";
import {SerializedStyles} from "@emotion/serialize";


const ContainerWrapper = css`
  width: 100%;
  height: 100%;
`;

export interface EchartsProps {
  option: EChartsOption;
  containerCss?: SerializedStyles;
  setting?: SetOptionOpts;
  loading?: boolean;
}

type SeriesData = Array<any>;

export type ChartProps = {
  title?: string;
  subtitle?: string;
  containerCss?: SerializedStyles;
  data: Array<any>;
  isLoading: boolean;
}


const EchartBase = ({containerCss, option, setting, loading, ...props}: EchartsProps) => {

  const chartRef = useRef(null);
  useEffect(()=>{
    let chart;
    if(chartRef.current !== null){
      chart = init(chartRef.current, null, {renderer:'svg'});
    }

    function resizeChart(){
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart)

    return ()=>{
      window.removeEventListener("resize", resizeChart) // body resize시 warning message가 발생하여 추가
      chart?.dispose();
    }

  },[]);

  useEffect(()=>{
    if(chartRef !== null){
      const chart = getInstanceByDom(chartRef.current);
      chart.setOption(option, setting);
    }

  }, [option, setting]);


  return(
    <div css={[ContainerWrapper, containerCss]} ref={chartRef}/>
  );
};

export default EchartBase;
