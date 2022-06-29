import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { BiFileFind } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";
import Image from "next/image";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexRow, flexColumn } from "@styles";
import {
  flexRowStyle,
  SidebarDataType
} from "@lucian2Components/templates/PfOverlayTemplate";
import PfOverlayHoldingsTable from "@lucian2Components/molecules/PfOverlayHoldingsTable";
import PfOverlayLayerConfig from "@lucian2Components/molecules/PfOverlayLayerConfig";
import { PFOVERLAY_HOLDINGS_DUMMY_DATA } from "@lucian2Components/Dummy";
import BasicBox from "@components/atoms/BasicBox";
import SingleScoreChart from "../../../customCharts/SingleScoreChart";

const dotStyle = css`
  width: 3.2px;
  height: 3.2px;
  border-radius: 50%;
  background: ${Colors.hint};
  margin-right: 7px;
`;

const PfOlLeftContainerCss = css`
  ${flexColumn};
  padding-right: 9px;
`;

const PfOlUpperLeftCss = css`
  ${flexRow};
  white-space: pre-wrap;
  padding: 8px 0 9px 0;

  & > p {
    padding-right: 14px;
  }
`;

const PfOlScoreTxtCss = css`
  padding-top: 20px;
`;

const sourceTxtStyle = css`
  font-size: 11px;
  font-weight: 500;
  font-family: "Inter";
  color: ${Colors.hint};
`;

const PfOlHoldingsTbContainerCss = css`
  padding-top: 5px;
`;

const PfOlHoldingsTbCss = css`
  max-width: 590px;
  border-radius: 6px;
  background: ${Colors.diagnosisSummaryBg};
  border: 1px solid ${Colors.borderPrimary};
`;

const iconWrapCss = css`
  padding: 0 0 2px 3px;
`;

interface Props {
  data: SidebarDataType[];
}

// Sidebar 목록의 inflation 쪽의 라디오 버튼 클릭 시 보여지는 Layer Implementation
const PfOverlayHighInflation = ({ data }: Props) => {
  return (
    <div>
      <BasicBox
        width={1108}
        height={719}
        borderColor={Colors.primary6}
        paddingTop={12}
        paddingRight={15}
        paddingBottom={16}
        paddingLeft={28}
      >
        <div css={flexRowStyle}>
          {/* prettier-ignore */}
          <div css={PfOlLeftContainerCss}>
          <div css={flexRowStyle}>
            <Typography.Body2 css={css`padding-right: 7px;`} color={Colors.buttonSubmit}>
              High Inflation Protected Layer
            </Typography.Body2>
            <BiFileFind />
          </div>
          <div css={css`width:100%; display:flex;`}>
            <BasicBox width={230} height={212}>
              <div css={PfOlUpperLeftCss}>
                <Typography.Body5 color={Colors.buttonSubmit}>
                  {`Current\nImpact Score`}
                </Typography.Body5>
                <SingleScoreChart 
                   isLoading={false}
                   animation={true}
                   value={data[0]?.lists[0].value}
                   fontSize={15.6667}
                   lineWidth={3}
                   containerCss={css`height: 47px;width: 47px;`}
                 />
              </div>
              <Typography.Body5 color={Colors.hint} css={css`white-space:pre-wrap;line-height:14px;`}>
                {`The main purpose of the layer is to overlay\nfor the existing portfolio to perform better\nin high-inflation period.\nThe score represents how much your\nportfolio is exposed to Inflation movement.\nWhen the score is positive, The higher\nInflation score is, The better your portfolio\nperforms and vice versa.`}
              </Typography.Body5>
              <Typography.Body5 css={PfOlScoreTxtCss} color={Colors.hint}>
                (Score range : -100 , +100)
              </Typography.Body5>
            </BasicBox>

            <BasicBox width={325} paddingTop={13} paddingLeft={20}>
              <div css={css`padding-bottom: 7px;`}>
                <div css={[flexRowStyle,css`padding-bottom: 2px;`]}>
                  <div css={dotStyle} />
                  <Typography.Body5 color={Colors.hint}>
                    Indicator : US CPI (YoY)
                  </Typography.Body5>
                </div>
                <div css={flexRowStyle}>
                  <div css={dotStyle} />
                  <div color={Colors.hint} css={[flexRowStyle,sourceTxtStyle]}>
                     Source : Fred
                    <p css={iconWrapCss}>
                      <AiOutlineLink size={12} />
                    </p>
                  </div>
                </div>
              </div>
              <Image src="/img/lucian/cpi-chart.png" alt="cpi-chart" width={320} height={170}/>
            </BasicBox>
          </div>
          <div css={PfOlHoldingsTbContainerCss}>
            <Typography.Body2 color={Colors.buttonSubmit} css={css`padding-bottom: 9px;`}>
              My Holdings Configuration
            </Typography.Body2>
            <div css={PfOlHoldingsTbCss}>
              <PfOverlayHoldingsTable />
              {/* prettier-ignore */}
              <Typography.Body6 color={Colors.primary4} css={css`padding:8px 0 5px 15px;`}>
                # of Holdings : {PFOVERLAY_HOLDINGS_DUMMY_DATA.length}
              </Typography.Body6>
            </div>
          </div>
        </div>
          <div>
            {/* prettier-ignore */}
            <Typography.Body2 css={css`padding: 2px 0 5px 0;`} color={Colors.buttonSubmit}>
              Layer Configuration
            </Typography.Body2>
            <PfOverlayLayerConfig />
          </div>
        </div>
      </BasicBox>
    </div>
  );
};

export default PfOverlayHighInflation;
