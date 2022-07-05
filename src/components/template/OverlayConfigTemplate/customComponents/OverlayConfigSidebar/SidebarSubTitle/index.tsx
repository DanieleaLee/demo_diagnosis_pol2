import React, { useState } from "react";
import { css } from "@emotion/react";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexRow, flexRowBetween } from "@styles";
import RadioSelection from "@components/template/OverlayConfigTemplate/customComponents/OverlayConfigSidebar/RadioSelection";
import {SidebarDataType,flexRowStyle} from "@components/template/OverlayConfigTemplate";
import SingleScoreChart from "@components/customCharts/SingleScoreChart";

const triangleArrowCss = (clicked: boolean) => css`
  width: 0;
  height: 0;
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
  border-left: 8px solid
    ${clicked ? Colors.diagnosisSidebarArrow : Colors.button2};
  border-right: 5px solid transparent;
  transform: ${clicked ? "rotate(90deg)" : "rotate(0deg)"};
  margin: ${clicked ? "7px 8px 0 -15px" : "0 4px 0 -11px"};
`;

const bodyContainerCss = css`
  padding-left: 15px;
  cursor: pointer;
`;

const bodyUpperWrapCss = css`
  ${flexRow};
  justify-content: space-between;
  padding: 0px 0 10px 20px;
`;

const titleWrapCss = css`
  ${flexRow};
`;

const iconWrap = css`
  ${flexRow};
  padding-right: 7.9px;
`;

const subContentsBodyWrap = css`
  ${flexRow};
  padding-right: 12px;
`;

const subContentsWrap = css`
  ${flexRowBetween};
  width: 100%;

  p {
    padding-top: 2px;
  }

  &.active {
    background: ${Colors.overlaySidebarActiveBg};
    border-radius: 3.90751px;

    p {
      color: ${Colors.overlaySidebarActiveTxt};
    }
  }
`;

interface Props {
  item: SidebarDataType;
  onClickLayerHandler: any;
  clickedLayer: string;
  icon: EmotionJSX.Element;
}

const SidebarSubTitle = ({
  item,
  onClickLayerHandler,
  clickedLayer,
  icon
}: Props) => {
  const [subNav, setSubNav] = useState(
    item.title === "Traditional Layers" ? false : true
  );
  const showSubNav = () => setSubNav(!subNav);

  return (
    <div
      css={[
        bodyContainerCss,
        item.title !== "Macro Layers" &&
          css`
            padding-top: 10px;
          `
      ]}
    >
      <div css={[bodyUpperWrapCss]}>
        <div css={[titleWrapCss]} onClick={showSubNav}>
          {item.lists && subNav ? (
            <div css={[triangleArrowCss(true)]} />
          ) : item.lists ? (
            <div css={[triangleArrowCss(subNav)]} />
          ) : (
            <div
              css={css`
                padding-right: 5.9px;
              `}
            ></div>
          )}
          <div css={[iconWrap]}>{icon}</div>
          <Typography.Body2 color={Colors.selectCategoryAmountBg}>
            {item.title}
          </Typography.Body2>
        </div>
      </div>
      {subNav &&
        Array.isArray(item.lists) &&
        item.lists.map((i, v) => (
          <div
            key={i.id}
            css={[subContentsBodyWrap]}
            id={String(i.id)}
            onClick={onClickLayerHandler}
          >
            <div
              css={[subContentsWrap]}
              className={clickedLayer === String(i.id) ? "active" : ""}
            >
              <div css={[flexRowStyle]}>
                <SingleScoreChart
                  isLoading={false}
                  animation={true}
                  value={i.value}
                  fontSize={8}
                  lineWidth={1.5}
                  containerCss={css`
                    height: 20px;
                    width: 20px;
                    margin: 4px 8px 4px 24px;
                  `}
                />
                <Typography.Body5
                  color={Colors.buttonSubmit}
                  css={css`
                    margin-bottom: 3px;
                  `}
                >
                  {i.name}
                </Typography.Body5>
              </div>
              <div>
                <RadioSelection
                  key={i.id}
                  id={String(i.id)}
                  name="subtitle_radio"
                  value={i.name}
                  checked={clickedLayer === String(i.id)}
                  handleChange={onClickLayerHandler}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SidebarSubTitle;
