import ScoreGaugeChart, {GaugeChartProps} from "@components/molecules/Echarts/ScoreGaugeChart";
import Colors from "@styles/colors";
import {AAPortfolio, AAPortfolioStep} from "@interfaces/model";
import {mediaWidths} from "@styles/media";
import {ConventionalAAPortfolio} from "@components/template/PortfolioLib";


export type MpStatusGaugeChartProps = Omit <GaugeChartProps, "dataMapper"> & {

}

const mapper = (data: Array<ConventionalAAPortfolio> )=>{

  const score = data.filter(i=>
    (i.gflow.currentStep === AAPortfolioStep.reporting)).length;

  const outOf = data.length;


  const labelOffsetX = (window.innerWidth > mediaWidths.xlarge)
    ? "140%"
    : "80%";

  const labelOffsetY = (window.innerWidth > mediaWidths.xlarge)
    ? "-10%"
    : "20%";


  return [
    {
      value: 0,
      name: outOf,
      title: {
        offsetCenter: ['-0%', '-10%'],
        fontWeight: 'bolder',
        fontSize: '40px'
      },
      detail: {
        show:false
      }
    },
    /** Score */
    {
      value: (score/outOf) * 100,
      name: "Completed",
      itemStyle:{ color: Colors.semanticGraph1, },
      title: {
        offsetCenter: [`-${labelOffsetX}`, labelOffsetY],
        fontWeight: 'bolder',
        fontSize: '12px',
      },
    },
    /** White Margin */
    {
      value: (score/outOf)*100 + 2,
      itemStyle:{ color:'#ffffff' },
      title: { show:false, },
    },
    /** Out of */
    {
      value: 100,
      name: 'In Progress',
      itemStyle:{ color:'transparent' },
      title: {
        offsetCenter: [labelOffsetX, labelOffsetY],
        fontWeight: 'bolder',
        fontSize: '12px'
      },
      detail: {
        offsetCenter: ['75%', '-10%'],
        formatter: function (value) {
          return outOf - score;
        }
      }
    }

  ];

};

const MpStatusGaugeChart = ({...props}:MpStatusGaugeChartProps) => {
  return(
    <ScoreGaugeChart
      width={50}
      animation={true}
      containerCss={props.containerCss}
      data={props.data}
      dataMapper={mapper}
      isLoading={props.isLoading}
    />

  );
};

export default MpStatusGaugeChart;
