import React from "react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexColumn, flexRow } from "@styles";
import { css } from "@emotion/react";
import MethodImportRadioBtn from "@lucian2Components/atoms/PortfolioRadioSelection";
import Card from "@lucian2Components/atoms/Card";

const CardsBodyCss = () => css`
  padding: 85px 114px 50px 114px;
  ${flexRow};
  & > div {
    margin-right: 36px;
  }
`;

const CardsIconWrapCss = () => css`
  margin: 48px auto 28.42px auto;
`;

const CardsTextWrapCss = () => css`
  ${flexColumn};
  align-items: center;
`;

const CardsSubTitleTextCss = () => css`
  text-align: center;
  white-space: pre-wrap;
`;

type CardDataType = Array<{
  id: string;
  icon: React.ReactNode;
  title: string;
  subTitle?: string;
  selected: string;
  type: string;
}>;

interface Props {
  cardData: CardDataType;
  selectedCard: string;
  selectCardHandler: (card: string) => void;
}

export type SelectedCardType = "portfolio" | "csv" | "manual" | "";

const Cards = ({ cardData, selectedCard, selectCardHandler }: Props) => {
  const cardContents = (id: number) => (
    <>
      <div css={CardsIconWrapCss}>{cardData[id].icon}</div>
      <div css={CardsTextWrapCss}>
        <Typography.Headline3 color={Colors.button3Text}>
          {cardData[id].title}
        </Typography.Headline3>
        {cardData[id].type === "text" && (
          <Typography.Subtitle2 color={Colors.hint} css={CardsSubTitleTextCss}>
            {cardData[id].subTitle}
          </Typography.Subtitle2>
        )}
        {cardData[id].type === "radio" && (
          <div>
            <MethodImportRadioBtn
              id={cardData[id].id}
              name={cardData[id].selected}
              label="Asset - Weighting Form"
            />
            <MethodImportRadioBtn
              id={cardData[id].id}
              name={cardData[id].selected}
              label="Transaction Form"
            />
          </div>
        )}
      </div>
    </>
  );

  return (
    <div css={CardsBodyCss}>
      {cardData.map((card) => (
        <Card
          key={card.id}
          onClick={() => selectCardHandler(card.selected as SelectedCardType)}
          clicked={selectedCard === card.selected}
        >
          {cardContents(+card.id - 1)}
        </Card>
      ))}
    </div>
  );
};

export default Cards;
