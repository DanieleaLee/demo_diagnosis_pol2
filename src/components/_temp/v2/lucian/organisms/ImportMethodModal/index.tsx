import React, { useState } from "react";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import { flexRow } from "@styles";
import Colors from "@styles/colors";
import Modal from "@tempComponents/v2/molecules/Modal";
import * as TextButton from "@components/atoms/TextButton";
import SearchBar from "@components/molecules/SearchBar";
import UploadCsv from "@lucian2Components/atoms/Icons/UploadCsv";
import FromPFIcon from "@lucian2Components/atoms/Icons/FromPFIcon";
import EnterManualIcon from "@lucian2Components/atoms/Icons/EnterManualIcon";
import Cards from "@lucian2Components/molecules/Cards";
import MyPortfolioTable from "@lucian2Components/molecules/PfMyTable";
import { SelectedCardType } from "@lucian2Components/molecules/Cards/index";
import { fakeType } from "@lucian2Components/molecules/Table";

const IMModalBodyCss = (width: number, height: number) => css`
  width: ${width}px;
  height: ${height}px;
  background: ${Colors.backgroundWhite};
  padding: 32px 0 28px 66px;
`;

const IMNormalBtnWrapCss = () => css`
  ${flexRow};
  justify-content: flex-end;
  padding: 34px 67px 0 0;

  & > button {
    margin-left: 10px;
  }
`;

const IMModalSecondStepBodyCss = () => css`
  padding-right: 67px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const IMModalSearchBarWrapCss = () => css`
  padding: 15px 0 12px 0;
`;

interface Props {
  width?: number;
  height?: number;
  closeModal: () => void;
  addTbToListActionImportBtn: () => void;
  selectTable: Array<fakeType>;
  setSelectTable: React.Dispatch<React.SetStateAction<fakeType[]>>;
}

const cardData = [
  {
    id: "1",
    icon: <FromPFIcon />,
    title: "From Portfolio Generation",
    subTitle: `You can import model portfolio\nfrom My Portfolios`,
    selected: "portfolio",
    type: "text",
  },
  {
    id: "2",
    icon: <UploadCsv />,
    title: "Up Load CSV file",
    selected: "csv",
    type: "radio",
  },
  {
    id: "3",
    icon: <EnterManualIcon />,
    title: "Enter Manually",
    selected: "manual",
    type: "radio",
  },
];

const ImportMethodModal = ({
  width,
  height,
  closeModal,
  addTbToListActionImportBtn,
  selectTable,
  setSelectTable,
}: Props) => {
  const [step, setStep] = useState(0);
  const [selectedCard, setSelectedCard] = useState<SelectedCardType>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pfImportTableData, setPfImportTableData] = useState<fakeType[]>([]);

  const filteredPfImportTableData = pfImportTableData.filter((el) => {
    return el.portfolio_name
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const searchTermHandler = (value: string) => {
    setSearchTerm(value);
  };

  const selectCardHandler = (card: SelectedCardType) => {
    setSelectedCard(card);
  };

  const goToNextPage = (e) => {
    e.preventDefault();
    if (selectedCard === "portfolio") {
      if (e.target.innerText === "Import") {
        closeModal();
        addTbToListActionImportBtn();
        return;
      }
      setStep((prev) => prev + 1);
    } else if (selectedCard === "csv" || selectedCard === "manual") {
      alert("Import Methods not yet prepared");
    }
  };

  const goToPrevPage = (e) => {
    e.preventDefault();
    if (step === 0 && e.target.innerText === "Prev") {
      closeModal();
      return;
    }
    setStep((prev) => prev - 1);
  };

  const firstStepCardContents = () => (
    <Cards
      cardData={cardData}
      selectedCard={selectedCard}
      selectCardHandler={selectCardHandler}
    />
  );

  const secondStepTableContents = () => (
    <div css={IMModalSecondStepBodyCss}>
      <div css={IMModalSearchBarWrapCss}>
        <SearchBar width={601} onChange={searchTermHandler} />
      </div>
      <MyPortfolioTable
        selectTable={selectTable}
        setSelectTable={setSelectTable}
        pfImportTableData={filteredPfImportTableData}
        setPfImportTableData={setPfImportTableData}
      />
    </div>
  );

  return (
    <Modal closeModal={closeModal}>
      <div css={[IMModalBodyCss(width, height)]}>
        <Typography.Title2 color={Colors.buttonSubmit}>
          {step === 0
            ? "Import Method"
            : "My Porfolios (or Portfolio lists by Portfolio Generation)"}
        </Typography.Title2>
        {step === 0 && firstStepCardContents()}
        {step === 1 &&
          selectedCard === "portfolio" &&
          secondStepTableContents()}
        <div css={IMNormalBtnWrapCss}>
          <TextButton.Normal
            bgTheme="common"
            title="Prev"
            onClick={goToPrevPage}
          />
          <TextButton.Normal
            bgTheme="accent"
            title={step === 1 ? "Import" : "Next"}
            onClick={goToNextPage}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ImportMethodModal;
