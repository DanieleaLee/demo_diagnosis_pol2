import Buttonable from "./index";
import React from "react";
import {css, useTheme} from "@emotion/react";
import Colors from "@styles/colors";
import {action} from "@storybook/addon-actions";

export default {
  title: "Atoms/Buttonable",
  component: Buttonable,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    containerCss: {
      control: { disable: true },
    },
    onClick: {
      action: "onClick",
    },
  },
};

export const Basic = (args) => <Buttonable {...args}>버튼</Buttonable>;

export const Primary = Basic.bind({});
Primary.args = {
  containerCss: css`
    height: 3.5rem;
    padding: 0 1.5rem;
    background-color: ${Colors.primary2};
    color:white;
    font-weight: bold;
    `
};
