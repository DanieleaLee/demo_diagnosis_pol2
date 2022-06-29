import React from "react";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import BasicBox from "@components/atoms/BasicBox";
import { flexRowStyle } from "@lucian2Components/templates/PfOverlayTemplate";
import { SubDataType } from "@lucian2Components/molecules/StockDiagnosisBoxes";
import {
  BiBattery,
  BiCubeAlt,
  BiBuildings,
  BiStreetView,
  BiCoffee,
  BiHealth,
  BiDollarCircle,
  BiChip,
  BiUserVoice,
  BiDirections,
  BiHome,
  BiTrendingUp,
  BiLineChart,
  BiShuffle,
  BiDonateHeart,
} from "react-icons/bi";
import Momemtum from "./Icons/Momemtum";

const containerCss = css`
  display: flex;
  align-items: flex-start;
  height: 100%;
`;

const boxLeftWrapCss = css`
  min-width: 178px;
  display: flex;
  height: 100%;
  background: #fcfdfe;
  border-radius: 4px 0px 0px 4px;
  padding: 10px 0 0 14px;
  margin-right: 25px;

  & > p {
    padding-left: 9px;
  }
`;

const boxRightWrapCss = css`
  padding-top: 13px;
`;

const tickerCss = css`
  width: 46px;
  border-right: 0.5px solid #2f3b43;
  margin-right: 9px;
`;

interface Props {
  subData?: SubDataType[];
  subject?: string;
  width?: number;
  height?: number;
}

const iconList = {
  Energy: <BiBattery size={22} color="#484848" />,
  Materials: <BiCubeAlt size={22} color="#484848" />,
  Industrials: <BiBuildings size={22} color="#484848" />,
  "Consumer Discretionary": <BiStreetView size={22} color="#484848" />,
  "Consumer Staples": <BiCoffee size={22} color="#484848" />,
  "Health Care": <BiHealth size={22} color="#484848" />,
  Financials: <BiDollarCircle size={22} color="#484848" />,
  "Information Technology": <BiChip size={22} color="#484848" />,
  "Communication Services": <BiUserVoice size={22} color="#484848" />,
  Utilities: <BiDirections size={22} color="#484848" />,
  "Real estate": <BiHome size={22} color="#484848" />,
  Momentum: <Momemtum />,
  Growth: <BiLineChart size={22} color="#484848" />,
  Profitability: <BiTrendingUp size={22} color="#484848" />,
  Volatility: <BiShuffle size={22} color="#484848" />,
  Value: <BiDonateHeart size={22} color="#484848" />,
};

const StockDiagnosisBox = ({ width, height, subData, subject }: Props) => {
  return (
    <BasicBox width={width} height={height} borderColor={Colors.borderPrimary} borderRadius={4}>
      <div css={containerCss}>
        <div css={boxLeftWrapCss}>
          {iconList[subject]}
          <Typography.Subtitle2
            color={Colors.buttonSubmit}
            css={css`
              width: 178px;
              white-space: pre-wrap;
            `}
          >
            {subject}
          </Typography.Subtitle2>
        </div>
        <div css={boxRightWrapCss}>
          {subData?.map((s) => (
            <div key={s.id} css={flexRowStyle}>
              <Typography.Body2 color={Colors.button2} css={tickerCss}>
                {s.title}
              </Typography.Body2>
              <Typography.Body3 color={Colors.button2}>{s.subTitle}</Typography.Body3>
            </div>
          ))}
        </div>
      </div>
    </BasicBox>
  );
};

export default StockDiagnosisBox;
