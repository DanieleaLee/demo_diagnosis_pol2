import styled from "@emotion/styled";

const FilterResultBoxContainer = styled.div`
  /* width: 100%; */
  height: 24px;
  background: #525f68;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: #fff;
  cursor: pointer;
  padding: 0 7px 0 11px;
`;

const SelectedCategory = styled.p`
  display: flex;
  padding-bottom: 1px;
`;

const CloseIconWrap = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-left: 11px;
`;

const SelectedCategoryAmount = styled.p`
  width: 33px;
  height: 16px;
  background: #2f3b43;
  border-radius: 12px;
  margin: 0 0 0 7px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
`;

export {
  FilterResultBoxContainer,
  SelectedCategory,
  CloseIconWrap,
  SelectedCategoryAmount,
};
