import {dataFromGraphql} from './rawDataFromGraphql'

const zipTwoArray = (arrX, arrY)=>arrX.map((v,i)=>[v,arrY[i]])
const fixDecimal = (decimalPoint, arr)=>arr.map((v,i)=>v.toFixed(decimalPoint))
const getValueFromObj = (ticker, obj)=> {
  return obj.filter((v,i)=> v['key'] === ticker).map((j,k)=>j['value'])[0]
}
const getTickerXYvalue = (arrX, arrY) => {
  return arrX.reduce(
    (acc, cur) => {
      const ticker = cur['key']
      const [_xValue, _yValue] = [cur['value'], getValueFromObj(ticker ,arrY)]
      return [...acc, [_xValue, _yValue, ticker]]
    },[]
  );
}

export const getData = (data)=>{
  let data_;

  if ( data && data.getMPTPortfolio && 
    Object.keys(data.getMPTPortfolio).filter((v)=>['return_statistics','samples'].includes(v)))
  {
    console.log('yesss')
    data_ =  data.getMPTPortfolio
  } else {
    console.log('noooo')
    data_ = dataFromGraphql['data']['getMPTPortfolio']
  }
  
  const { return_statistics, samples } = data_
  // MiniMap
  const { return: miniPointY, volatility: miniPointX, correlation_matrix: correlation_matrix } = return_statistics
  console.log('miniPointY', miniPointY)
  console.log('miniPointX', miniPointX)
  const return_statistics_Tickers = miniPointY.map((v,i)=>v['key'])
  console.log('return_statistics_Tickers : ', return_statistics_Tickers)
  console.log('return_statistics_Tickers : ', return_statistics_Tickers)
  const yValue = getValueFromObj(return_statistics_Tickers[0], miniPointY)
  console.log('yValue : ', yValue)
  const xValue = getValueFromObj(return_statistics_Tickers[0], miniPointX)
  console.log('xValue : ', xValue)
  const tickersXYvalues = getTickerXYvalue(miniPointX, miniPointY)
  console.log('xValue : ', xValue)

  //---- EFPoint (Efficient Frontier Chart)
  const { returns: efPointY, stds: efPointX, sharpes, efficient_frontier_line } = samples
  const efPointYMaxValue = Math.max.apply(null, efPointY).toFixed(2)
  const efPointYMinValue = Math.min.apply(null, efPointY).toFixed(2)
  const efPointXMaxValue = Math.max.apply(null, efPointX).toFixed(2)
  const efPointXMinValue = Math.min.apply(null, efPointX).toFixed(2)
  const efPointData = zipTwoArray(efPointX, efPointY) 

  ////---- EFLine (Efficient Frontier Chart)
  const { mus: efLineY , stds: efLineX } = efficient_frontier_line
  const efPointWithSharpes = efPointData.map((v,i)=>[...v, sharpes[i]])
  const efLineData = zipTwoArray(efLineX, efLineY);

  // Sharpes 데이터
  const maxValueSharpes = Math.max.apply(null, sharpes);
  const minValueSharpes = Math.min.apply(null, sharpes);

  //Headmap 데이터
  const heatmapData = correlation_matrix.map((r,i) => {
    const row = r['row']
    const y = row.length - 1 - i
    return row.map((v,x) => [y , x, v])
  }).flat()

  const yAxisName = return_statistics_Tickers;
  const xAxisName = return_statistics_Tickers.reverse();


  return {
    miniMap: {
      miniPointY,
      miniPointX,
      return_statistics_Tickers,
      yValue,
      xValue,
      tickersXYvalues
    },
    efPoint : {
      efPointY,
      efPointX,
      sharpes,
      efficient_frontier_line,
      efPointYMaxValue,
      efPointYMinValue,
      efPointXMaxValue,
      efPointXMinValue,
      efPointData,
    },
    efLine : {
      efLineY,
      efLineX,
      efPointWithSharpes,
      efLineData
    },
    sharpes: {
      maxValueSharpes,
      minValueSharpes
    },
    heatmapData: {
      heatmapData,
      yAxisName,
      xAxisName
    }
  }
}

