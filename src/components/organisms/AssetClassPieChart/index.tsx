import {ChartProps} from "@components/molecules/Echarts/Base";
import {ClipLoader} from "react-spinners";
import {css} from "@emotion/react";
import EchartBase from "@components/molecules/Echarts/Base";
import {useLoadingCallback} from "src/lib/hooks/useLoadingCallback";
import {useState, useEffect} from "react";
import {EChartsOption} from "echarts/types/dist/echarts";
import Colors from "@styles/colors";

export type AssetClassPieChartProps = ChartProps & {

}

const containerWrapper = css`
  display:flex;
  justify-content: center;
  align-items: center;
`;


const fetchAssetClassData = async(opt: EChartsOption)=> {
  const {data} = await new Promise((resolve, _)=>{
    setTimeout(()=>{
      resolve( { data: [
          { value: 0.25, name: 'Equity, U.S\nLarge CAp(VTI)'},
          { value: 0.60, name: 'Bond U.S\nLong-Term(TLT)'},
          { value: 0.15, name: 'Commodity,\nBroad\nDiversified (GSG)'},
        ] } )
    }, 1000);
  });

  return data;
};


const AssetClassPieChart = ({...props}: AssetClassPieChartProps) => {

  const defaultOpt :EChartsOption= {
    backgroundColor: 'rgba(111,111,111,0)',
    color: [
      Colors.semanticGraph1,
      Colors.semanticGraph2,
      Colors.semanticGraph3,
    ],
    title: {
      text: "Asset Class",
      right:'0',
      textStyle:{
        color:"white",
        fontSize: 12,
      }

    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: true,
      orient: 'horizontal',
      left: 'right',
      top:'bottom',
      itemGap: 6,
      formatter: name => `${name.split('\n')[0]}`,
      textStyle: {
        color: 'white',
        fontSize:8,
      },
      width: '20%'
    },
    series: [
      {
        name: 'Asset Class',
        type: 'pie',
        radius: ['25%', '40%'],
        data: [ ],
        label:{
          show: true,
          color: "white",
          fontSize: 8,
          fontWeight: 'bold',
          alignTo: 'edge',
          edgeDistance: 50,
          formatter: '{d}%\n{b}',
          overflow: 'truncate',
          // width: 'auto',
          // lineStyle:{color:'white'}
        },
        labelLayout:{
          // align: 'left'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const [opt, setOpt] = useState(defaultOpt);
  const {callback: loadChart, isLoading} = useLoadingCallback(async() => {
    const data = await fetchAssetClassData(opt);
    setOpt({
      ...opt,
      series:[
        {
          ...(opt.series[0]),
          data,
        }
      ]
    });
  }, []);

  useEffect(()=>{
    loadChart();
  }, []);

  return (
    <div css={[containerWrapper, props.containerCss]}>
      {!!isLoading && <ClipLoader css={css`background: red;`}/>}
      {!isLoading && <EchartBase option={opt}/>}
    </div>
  );
};

export default AssetClassPieChart;