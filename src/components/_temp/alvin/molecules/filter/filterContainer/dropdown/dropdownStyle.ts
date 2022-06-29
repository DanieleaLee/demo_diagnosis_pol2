import styled from "@emotion/styled";
import { DropdownType } from "./dropdownType";

// Dropdown style
const Container = styled.div<Pick<DropdownType, "width">>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  height: auto;
  margin-right: 10px;
  position: relative;
`;

const Title = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #2f3b43;
  padding-bottom: 3px;
`;

const DropdownLowerContents = styled.div`
  position: absolute;
  width: 100%;
  top: 58px;
  background: #fff;
  z-index: 100;
`;

const ClearSelection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 19px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  font-size: 8px;
  line-height: 10px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 0.5px solid #9da6ad;
  border-top: 0;
  padding-left: 7px;
  cursor: pointer;
`;

// Dropdown Upper Button style
const DropdownUpperBtnContainer = styled.div`
  border: 0.5px solid #9da6ad;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  width: 100%;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &.active {
    border-bottom: none;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 16px;
`;

const FirstCheckedText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: #5b6266;
`;

const RemoveBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
`;

const IconWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 13px;
`;

// Search Container style
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10.33px;
  font-size: 12px;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  color: #5b6266;
  line-height: 15px;
  letter-spacing: -0.03em;
  padding-right: 13px;
`;

const SearchInput = styled.input`
  flex: 1;
  color: #000;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  width: 100%;
  padding-left: 7.96px;
`;

// MultiCheckbox style
const MultiCheckboxContainer = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: #cecece;
  border: 0.5px solid #9da6ad;
  margin: 0;
  padding-right: 17px;
  width: 100%;
`;

const Wrap = styled.ul`
  max-height: 142px;
  overflow-y: overlay;
  overflow-x: hidden;
  margin: 9px 0 8px 0;

  &::-webkit-scrollbar {
    background: #ececec;
    border-radius: 1.5px;
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
    background: #2f3b43;
  }
`;

const NotIncluded = styled.div`
  padding-left: 20px;
`;

const SingleCheckboxList = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;

  &:hover {
    background: rgba(196, 196, 196, 0.15);
    color: #5b6266;
    font-weight: 500;
  }

  &.active {
    background: rgba(196, 196, 196, 0.15);
    color: #5b6266;
    font-weight: 600;
  }
`;

const Label = styled.label`
  cursor: pointer;
`;

export {
  Container,
  Title,
  DropdownLowerContents,
  ClearSelection,
  DropdownUpperBtnContainer,
  TextWrap,
  FirstCheckedText,
  RemoveBtn,
  IconWrap,
  SearchContainer,
  SearchInput,
  MultiCheckboxContainer,
  Wrap,
  NotIncluded,
  SingleCheckboxList,
  Label
};
