import React, { useState } from "react";
import { css } from "@emotion/react";
import { flexRow, flexRowBetween } from "@styles";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { fakeType } from "@lucian2Components/molecules/Table";
import { pfResultType } from "@lucian2Components/templates/PfTemplate/index";
import { errorMessage } from "@lucian2Components/templates/PfTemplate/index";
import DeletePortfolioModal from "@lucian2Components/organisms/DeletePortfolioModal";
import ImportMethodModal from "@lucian2Components/organisms/ImportMethodModal";
import Table from "@lucian2Components/molecules/Table";
import * as TextButton from "@components/atoms/TextButton";
import SearchBar from "@components/molecules/SearchBar";

const PfListBodyCss = css`
  width: 100%;
  padding-top: 23px;
`;

const PfListTitleCss = css`
  padding-bottom: 13px;
`;

const PfListUpperContentsCss = css`
  ${flexRowBetween}
  padding-bottom:12px;
`;

const PfListCAnalysisBtnWrapCss = css`
  position: relative;
`;

const PfListCAnalysisErrorMsgCss = css`
  position: absolute;
  bottom: 50px;
  width: 310px;
`;

const pfListWrap = css`
  ${flexRow};
  button {
    margin-right: 8px;
  }
`;

interface Props {
  selectedTANotUndefined: Array<fakeType>;
  setSelectedTableArr: React.Dispatch<React.SetStateAction<fakeType[]>>;
  portfolioList: Array<pfResultType>;
  removePfListActionDeleteBtn: () => void;
  addSelectedTable: () => void;
}
type ModalType = "delete" | "import" | "";

const PfList = ({
  selectedTANotUndefined,
  setSelectedTableArr,
  portfolioList,
  removePfListActionDeleteBtn,
  addSelectedTable,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [pfImportedList, setPfImportedList] = useState<fakeType[]>(
    selectedTANotUndefined
  );
  const [showModal, setShowModal] = useState<ModalType>("");

  const pfImportedListNotUndefined = pfImportedList.filter(
    (el) => el !== undefined
  );

  const searchPfImportedData = pfImportedListNotUndefined.filter((el) => {
    return el.portfolio_name
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const showModalHandler = (value: ModalType) => {
    setShowModal(value);
  };

  const searchTermHandler = (value: string) => {
    setSearchTerm(value);
  };

  const addTbToListActionImportBtn = () => {
    setPfImportedList(selectedTANotUndefined);
  };

  const removeImportListActionDeleteBtn = () => {
    setPfImportedList((prev) => {
      const temp = prev.filter((item) => {
        return !selectedTANotUndefined.includes(item);
      });
      return temp;
    });
  };

  const deleteSelectedTable = () => {
    removeImportListActionDeleteBtn();
    removePfListActionDeleteBtn();
  };

  const btnAndMsgCondition = (val: string): boolean => {
    let flag;

    switch (val) {
      case "delete":
        flag =
          selectedTANotUndefined.length === 0 || pfImportedList.length === 0;
        break;
      case "cAnalysis":
        flag =
          selectedTANotUndefined.length === 0 ||
          selectedTANotUndefined.length > 3 ||
          portfolioList.length === 3 ||
          pfImportedList.length === 0;
        break;
      case "error":
        flag = selectedTANotUndefined.length > 3 && pfImportedList.length !== 0;
        break;
      case "allCheck":
        flag = pfImportedList.length !== 0 && searchPfImportedData.length !== 0;
    }
    return flag;
  };

  const pfListUpperBtnAndSearchBar = () => (
    <div css={PfListUpperContentsCss}>
      <div css={pfListWrap}>
        {/* prettier-ignore */}
        <TextButton.Normal disabled={btnAndMsgCondition("delete")} title="Delete" onClick={() => showModalHandler("delete")} bgTheme="common"/>
        <div css={PfListCAnalysisBtnWrapCss}>
          {btnAndMsgCondition("error") && (
            <div css={PfListCAnalysisErrorMsgCss}>
              {errorMessage("portfolios maximum of 3 must be selected")}
            </div>
          )}
          {/* prettier-ignore */}
          <TextButton.Normal disabled={btnAndMsgCondition("cAnalysis")} title="To Comparison analysis" onClick={addSelectedTable} bgTheme="primary"/>
        </div>
        <SearchBar width={601} onChange={searchTermHandler} />
      </div>
      {/* prettier-ignore */}
      <TextButton.Normal title="Import Portfolio" onClick={() => showModalHandler("import")} bgTheme="accent"/>
    </div>
  );

  return (
    <div css={PfListBodyCss}>
      <Typography.Base
        fontWeight="500"
        fontSize="18px"
        lineHeight="22px"
        color={Colors.selectBoxBorder}
        css={PfListTitleCss}
      >
        Portfolio List
      </Typography.Base>
      {pfListUpperBtnAndSearchBar()}
      <Table
        setSelectTable={setSelectedTableArr}
        selectTable={selectedTANotUndefined}
        filterData={searchPfImportedData}
        allCheckedCondition={btnAndMsgCondition("allCheck")}
      />
      {showModal === "delete" && (
        <DeletePortfolioModal
          closeModal={() => showModalHandler("")}
          deleteSelectedTable={deleteSelectedTable}
        />
      )}
      {showModal === "import" && (
        <ImportMethodModal
          width={1700}
          closeModal={() => showModalHandler("")}
          addTbToListActionImportBtn={addTbToListActionImportBtn}
          selectTable={selectedTANotUndefined}
          setSelectTable={setSelectedTableArr}
        />
      )}
    </div>
  );
};

export default PfList;
