import React from "react";
import { css, useTheme } from "@emotion/react";
import Colors from "@styles/colors";
import { action } from "@storybook/addon-actions";
import { makeStorybookTitle } from "@alvinComponents/helper";
import * as Balloon from "./";

const storyBookTitle = makeStorybookTitle("Alvin", "Atoms", "Balloon");

const _story = {
  title: storyBookTitle,
  component: Balloon.Box,
  argTypes: {
    width: {
      control: { type: "number" },
      defaultValue: "150",
      description: "Enter the Label Name",
    },
    height: {
      control: { type: "number" },
      defaultValue: "250",
      description: "Enter the Label Name",
    },
    arrowPosition: {
      options: ["left", "right", "top", "bottom"],
      control: { type: "select" },
    },
    arrowAlign: {
      options: ["start", "center", "end"],
      control: { type: "select" },
    },
  },
};

export default _story;

const Box_ = (args) => <Balloon.Box {...args}>children</Balloon.Box>;
export const Box = Box_.bind({});
Box.args = {
  width: 200,
  height: 200,
  arrowPosition: "left",
  arrowAlign: "end",
};

export const Memo_ = (args) => (
  <Balloon.Memo {...args}>{console.log(args)}children</Balloon.Memo>
);
export const Memo = Memo_.bind({});
Memo.args = {
  title: "타이틀",
  tags: ["#1", "#2", "#3"],
};
