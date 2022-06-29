import styled from "@emotion/styled";
import { FilterTemplateType } from "./filterTemplateType";

const FilterTemplateContainer = styled.div<
  Pick<FilterTemplateType, "width" | "showCategories">
>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  height: auto;
  background: #fff;
  border-radius: ${(props) => (props.showCategories === true ? "0" : "4px")};
  box-shadow: ${(props) =>
    props.showCategories === true ? "0" : "0 0 4px rgba(0, 0, 0, 0.15)"};
  padding: 16px 15px 15px 18px;
`;

const FilterIconWithText = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #b9c1c7;
  display: inline-flex;
  align-items: center;
  width: 75px;
`;

const FilterContainerWrap = styled.div`
  display: flex;
  padding-bottom: 15px;
`;

const Text = styled.p`
  padding-top: 2px;
`;

const FilteredWrap = styled.div`
  display: flex;
  padding-right: 8px;
  margin: 3px 0;
`;

const FiltersWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

// max-width?? 고려? flex-wrap도?
const FilterResultWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1320px;
  width: 100%;
`;

const ApplyBtn = styled.button`
  width: 109px;
  height: 26px;
  background: #2f3b43;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  FilterTemplateContainer,
  FilterIconWithText,
  FilterContainerWrap,
  Text,
  FilterResultWrap,
  FilteredWrap,
  FiltersWrap,
  ApplyBtn,
};
