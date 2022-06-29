import React, { useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useEffect } from 'react';
import Colors from '../../../styles/colors';

const inputRangeStyle = (disabled: boolean) => css`
  &[type='range'] {
    width: 100%;
  }
  &[type='range'],
  &[type='range']::-webkit-slider-runnable-track,
  &[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &[type='range']::-webkit-slider-runnable-track {
    /* margin: 5px 0; */
    height: 2px;
    width: 100%;
    background: ${disabled ? '#dbdada' : 'linear-gradient(to right, #4a5c67, #4a5c67), #dbdada'};
    background-size: var(--background-size, 0%) 100%;
    background-repeat: no-repeat;
    border-radius: 2px;
  }

  &[type='range']::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    background: white;
    border: 1px solid #4a5c67;
    border-radius: 50%;
    margin-top: -5px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
  }
`;

const GaugeFooterStyle = css`
  display: flex;
  justify-content: end;
`;
const ProgressVisibleStyle = css`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 11px;
  letter-spacing: -0.03em;
  color: ${Colors.primary4};
`;

export type RangeBar1Props = {
  min?: number;
  max?: number;
  value?: number | string;
  setValue?: React.Dispatch<React.SetStateAction<number | string>>;
  visibleType?: 'percentage' | 'value';
  demicalPoint?: number;
  disabled?: boolean;
  onSubmit?: (rangeData: any) => void;
};
/**
 * 
 * @property {function} onSubmit - value가 선택 되었을 때 input value pop
 */
const RangeBarSingle = ({
  min,
  max,
  value,
  setValue,
  visibleType = 'value',
  demicalPoint = 0,
  disabled,
  onSubmit
}: RangeBar1Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const [_value, _setValue] = useState(String(value) || '');
  const tenDemicalPoint = 10 ** demicalPoint;
  const _min = min ? (Math.ceil(min * tenDemicalPoint) / tenDemicalPoint) * tenDemicalPoint : 0;
  const _max = max ? (Math.floor(max * tenDemicalPoint) / tenDemicalPoint) * tenDemicalPoint : 100;

  const getProgressText = (value) => {
    if (visibleType === 'percentage') {
      if (max <= 1) return (value * 100) / tenDemicalPoint + '%';
      return value / tenDemicalPoint + '%';
    }
    return (value / tenDemicalPoint).toFixed(demicalPoint);
  };

  useEffect(() => {
    const input = inputRef.current;

    function setBackgroundSize(input: HTMLInputElement) {
      if (setValue) setValue(Number(input.value) / tenDemicalPoint);
      _setValue(input.value);
      input.style.setProperty('--background-size', `${getBackgroundSize(input)}%`);
    }
    function getBackgroundSize(input: HTMLInputElement) {
      const min = +input.min || 0;
      const max = +input.max || 100;
      const value = +input.value;
      const size = ((value - min) / (max - min)) * 100;
      return size;
    }

    const getSubmitValue = (value) => {
      if (visibleType === 'percentage') {
        if (max <= 1) return (value * 100) / tenDemicalPoint;
        return value / tenDemicalPoint;
      }
      return (value / tenDemicalPoint).toFixed(demicalPoint);
    };

    setBackgroundSize(input);
    input.addEventListener('input', () => setBackgroundSize(input));
    onSubmit && input.addEventListener('change', () => onSubmit(getSubmitValue(input.value)));

    return () => {
      input.removeEventListener('input', () => setBackgroundSize(input));
      onSubmit && input.removeEventListener('change', () => onSubmit(getSubmitValue(input.value)));
    };
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="range"
        min={_min}
        max={_max}
        disabled={disabled}
        css={() => inputRangeStyle(disabled)}
      />
      <div css={GaugeFooterStyle}>
        <span css={ProgressVisibleStyle}>{getProgressText(_value)}</span>
      </div>
    </div>
  );
};

export default RangeBarSingle;
