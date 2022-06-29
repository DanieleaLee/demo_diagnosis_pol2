import React,{useState, useEffect} from 'react';
import { css } from '@emotion/react';
import NewTechRangeBtn from '@lucian2Components/molecules/NewTechRangeBtn';

type RangeType = {[s:string] :{min:number; max:number}};
type RangeBoxProps = {
    disabled?: boolean;
    rowData: { id: string }[];
    rowId: string;
    onSubmit?: (rangeData: any) => void;
    openBox?: boolean;
};

const NewTechRangeBar = ({disabled, rowData, rowId, openBox = true}:RangeBoxProps) => {
  const [data, setData] = useState(rowData);
  const [ranges,setRanges] = useState<RangeType>();
  const [totalRanges, setTotalRanges] = useState({min:0, max:50});
  const [sums, setSums] = useState<{minSum:number; maxSum:number}>();

console.log('rowd',rowId);

  useEffect(() => {
      if(!ranges)return;
      const minMaxValues = Object.values(ranges);
      const _sums = minMaxValues.reduce((prev,curr) => {
          return {
            minSum: prev.minSum + curr.min,
            maxSum: prev.maxSum + curr.max,
          }
      },{minSum:0, maxSum:0});
      setSums(_sums);
  },[ranges]);

  useEffect(() => {
     if(!data) return;
     const temp = {};
     data.forEach((el) => {
         temp[el.id] = {min:0, max:50};
     });
     setRanges(temp);
  },[data]);

  useEffect(() => {
    if (!ranges) return;
    const _ranges = { ...ranges };
    for (let k in _ranges) {
      _ranges[k] = { min: totalRanges.min, max: totalRanges.max };
    }
    setRanges(_ranges);
  }, [totalRanges]);

  const applyHandler = (props:{id:string; min:number; max:number}) => {
    const {id, min, max} = props;
    setRanges((prev) => ({...prev, [id]: {min:min, max:max}}));
  }

  return (
    <div>
      {ranges && <NewTechRangeBtn key={rowId} rowId={rowId} minLimit={50} maxLimit={0} minValue ={ranges[rowId].min} maxValue ={ranges[rowId].max} onApply={applyHandler} disabled={disabled} openBox={openBox}/>}
    </div>
  )
}

export default NewTechRangeBar