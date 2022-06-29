import styled from "@emotion/styled";
import { SearchBarType } from "./searchbarType";

// Search bar with filter button
const SearchBarWrap = styled.div`
  padding-bottom: 12px;
  display: flex;
  align-items: center;
`;

const ButtonWrap = styled.button`
  outline: none;
  border: none;
  background: #525f68;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 34px;
  margin-left: 8px;

  &:disabled {
    background: gray;
  }
`;

// Search bar
const SearchContainer = styled.div<Pick<SearchBarType, "width" | "height">>`
  display: flex;
  flex-direction: column;
  border: 1px solid #c3ccd2;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  height: ${(props) => (props.height ? `${props.height}px` : "auto")};
  padding-right: 12px;
  background-color: #fff;
  

  &.active {
    height: auto;
  }
`;

// Search bar container
const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIconWrap = styled.div`
  cursor: pointer;
  border-right: 1px solid #c3ccd2;
  padding: 11px 7px 3px 0;
`;

const SearchBarInput = styled.input`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  color: #2f3b43;
  margin-left: 21px;
  flex: auto;
  border: none;

  &::placeholder {
    color: #cecece;
  }
`;

// Search bar history
const HistoryContainer = styled.div`
  padding-left: 85px;
`;

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;

const InputValContainer = styled.li`
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  padding-top: 6px;
`;

const InputVal = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 21px;
  color: #2f3b43;
`;

const AllClearBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  padding-left: 20px;
  // border-left: 1px solid #c3ccd2;
`;

export {
  SearchBarWrap,
  ButtonWrap,
  SearchContainer,
  Wrap,
  SearchIconWrap,
  SearchBarInput,
  HistoryContainer,
  ListContainer,
  InputValContainer,
  RemoveButton,
  InputVal,
  AllClearBtn,
};
