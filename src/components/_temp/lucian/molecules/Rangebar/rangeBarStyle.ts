import styled from "@emotion/styled";

const Container = styled.div`
  border: 0.5px solid #ececec;
  border-radius: 4px;
  width: 197px;
  height: 142.56px;
  display: flex;
  flex-direction: column;
  padding: 26.56px 0 0 20px;
  margin-left: 30px;

  input {
    outline: none;
    border: none;
    background: none;
    width: 100%;
    color: #000;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const Header = styled.header`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.03em;
  color: #919191;
  padding-bottom: 5px;
`;

const RangePercentTextWrap = styled.div`
  display: flex;
  align-items: center;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.03em;
  color: #546a7b;
  padding-bottom: 16px;

  input {
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.03em;
    color: #546a7b;
  }
`;

const Line = styled.span`
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RangeInput = styled.input`
  &.thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    pointer-events: none;
    height: 2px;
    background: #4a5c67;
    border-radius: 2px;
    outline: none;

    &::-webkit-slider-thumb {
      appearance: none;
      -webkit-appearance: none;
    }

    &::-webkit-slider-thumb {
      background-color: #fff;
      border: 1px solid #94a1a9;
      border-radius: 50%;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      height: 12px;
      width: 12px;
      pointer-events: all;
      position: relative;
    }

    &::-moz-range-thumb {
      background-color: #fff;
      border: 1px solid #94a1a9;
      border-radius: 50%;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      height: 12px;
      width: 12px;
      pointer-events: all;
      position: relative;
    }
  }

  &.thumb1 {
    position: relative;

    &::after {
      content: "";
      border: 1px solid #4a5c67;
      height: 10px;
      width: 2px;
      background: #c4c4c4;
      position: absolute;
      right: 0;
      bottom: -4.3px;
    }
  }

  &.thumb2 {
    position: relative;
    &::after {
      content: "";
      border: 1px solid #4a5c67;
      height: 10px;
      width: 2px;
      background: #c4c4c4;
      position: absolute;
      left: 0;
      bottom: -4.3px;
    }
  }
`;

const Slider = styled.div`
  width: 147px;
  display: flex;
`;

const SliderLeftVal = styled.div`
  display: inline-flex;
  align-items: center;
`;

const SliderRightVal = styled.div`
  display: inline-flex;
  align-items: center;
`;

const EditButtonWrap = styled.div`
  cursor: pointer;
  margin-left: 2.13px;
  padding-top: 3.2px;
`;

const BarWrap = styled.div`
  padding-bottom: 24px;
`;

const ApplyBtnWrap = styled.button`
  outline: none;
  border: none;
  background: none;
  width: 66px;
  height: 20px;
  border: 0.5px solid #94a1a9;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 9px;
  line-height: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a1a9;
  margin-left: 93px;
`;

const DisabledArea = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}px`};
  height: 2px;
  background: #d8dada;
`;

export {
  Container,
  RangePercentTextWrap,
  Slider,
  DisabledArea,
  SliderLeftVal,
  SliderRightVal,
  RangeInput,
  Header,
  Line,
  EditButtonWrap,
  BarWrap,
  ApplyBtnWrap,
};
