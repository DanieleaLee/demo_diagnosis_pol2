import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { flexColumn, flexRow } from "@styles";
import * as Typography from "@styles/typography";
import * as TextButton from "@components/atoms/TextButton";
import {
  SidebarDataType,
  flexRowStyle
} from "@components/template/OverlayConfigTemplate";
import SidebarSubTitle from "@components/template/OverlayConfigTemplate/customComponents/OverlayConfigSidebar/SidebarSubTitle";
import {
  BiAnalyse,
  BiChart,
  BiCustomize,
  BiGlobe,
  BiTargetLock
} from "react-icons/bi";

const bodyContainerCss = css`
  width: 361px;
  height: 719px;
  background-color: ${Colors.backgroundWhite};
  border: 0.976879px solid ${Colors.primary6};
  border-radius: 8px;
  padding-top: 0;
  padding-right: 13.47px;
  padding-bottom: 28px;
  padding-left: 0;
`;

const bodyInnerWrapCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-top: 13px;
`;

const bodyUpperWrap = css`
  height: 610px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    background: ${Colors.primary6};
    border-radius: 1.46532px;
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1.46532px;
    background: ${Colors.backgroundAccent2};
  }
`;

const contentsWrap = css`
  ${flexColumn};
`;

const customRowWrap = css`
  display: flex;
  justify-content: space-between;
  padding-left: 40.49px;
`;

const customWrap = css`
  ${flexRow};
`;

const iconWrap = css`
  padding-right: 7.9px;
  padding-bottom: 3px;
`;

const btnCss = css`
  margin-right: 12px;
`;

const iconList = [
  {
    icon: <BiChart />
  },
  {
    icon: <BiTargetLock />
  },
  {
    icon: <BiGlobe />
  },
  {
    icon: <BiAnalyse />
  },
  {
    icon: <BiCustomize />
  }
];

interface Props {
  clickedLayer: string;
  onClickLayerHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data: SidebarDataType[];
}

const PfDgSidebar = ({ clickedLayer, onClickLayerHandler, data }: Props) => {
  return (
    <div css={[bodyContainerCss]}>
      <div css={[bodyInnerWrapCss]}>
        <div css={[bodyUpperWrap]}>
          <div css={[contentsWrap]}>
            {data.slice(0, -1).map((j, v) => (
              <SidebarSubTitle
                key={j.id}
                item={j}
                icon={iconList[v].icon}
                onClickLayerHandler={onClickLayerHandler}
                clickedLayer={clickedLayer}
              />
            ))}
          </div>
        </div>
        <div css={[customRowWrap]}>
          <div css={[flexRowStyle]}>
            <div css={[iconWrap]}>{iconList[iconList.length - 1].icon}</div>
            <div css={[customWrap]}>
              <Typography.Body2 color={Colors.selectCategoryAmountBg}>
                {data[data.length - 1]?.title}
              </Typography.Body2>
            </div>
          </div>
          <TextButton.Tiny
            onClick={() => {}}
            title="Build Layer"
            color={Colors.backgroundWhite}
            css={[btnCss]}
          />
        </div>
      </div>
    </div>
  );
};

export default PfDgSidebar;
