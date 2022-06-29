import Buttonable from "./index";
import React from "react";
import { css, useTheme } from "@emotion/react";
import Colors from "@styles/colors";
import { action } from "@storybook/addon-actions";
import IconList from "./index";
import { makeStorybookTitle } from "@alvinComponents/helper";

const storyBookTitle = makeStorybookTitle("Alvin", "Atoms", "IconList");

export default {
  title: storyBookTitle,
  component: IconList,
  argTypes: {
    name: {
      control: { type: "text" },
      defaultValue: "all",
      description: "Enter the Icon Name",
    },
    size: {
      control: { type: "number" },
      defaultValue: 17,
    },
    color: {
      control: { type: "color" },
      defaultValue: Colors.primary2,
    },
  },
};

export const Basic = (args) => <IconList {...args} />;