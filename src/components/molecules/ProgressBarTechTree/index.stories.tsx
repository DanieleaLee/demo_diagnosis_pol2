import Buttonable from "./index";
import React from "react";
import { css, useTheme } from "@emotion/react";
import Colors from "../../../styles/colors";
import { action } from "@storybook/addon-actions";
import { makeStorybookTitle } from "../../_temp/v2/helper";
import ProgressBarTechTree from "./index";

const storyBookTitle = makeStorybookTitle("v2", "Atoms", "ProgressBarTechTree");

const _story = {
  title: storyBookTitle,
  component: ProgressBarTechTree,
  argTypes: {
    label: {
      control: { type: "text" },
      defaultValue: "Percent",
      description: "Enter the Label Name",
    },
    currentPercent: {
      control: { type: "number" },
      defaultValue: 17,
    },
  },
};

export const Basic = (args) => <ProgressBarTechTree {...args} />;
export default _story;