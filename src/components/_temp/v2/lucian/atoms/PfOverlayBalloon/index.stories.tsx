import PfOverlayBalloon from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";
import { css } from "@emotion/react";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "PfOverlayBalloon"
);

export default {
  title: storyBookTitle,
  component: PfOverlayBalloon,
} as ComponentMeta<typeof PfOverlayBalloon>;

const Template: ComponentStory<typeof PfOverlayBalloon> = (args) => (
  <PfOverlayBalloon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 130.1,
  height: 21,
  triangleSize: 8.93,
  children: (
    <div
      css={css`
        color: #fff;
        font-family: "Inter";
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
      `}
    >
      2001.3 ~ 2001.8
    </div>
  ),
};

export const OverlayDateBarBalloon = Template.bind({});
OverlayDateBarBalloon.args = {
  triangleSize: 7,
  children: (
    <div
      css={css`
        width: 100%;
        color: #fff;
        font-family: "Inter";
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <span>aft-allweather</span>
      <span>Y-value : 32</span>
      <span>Date : 2014/03/25</span>
      <span>CAGR : 4.2%</span>
      <span>Vol : 13.2%</span>
      <span>MDD : 16.6%</span>
    </div>
  ),
};
