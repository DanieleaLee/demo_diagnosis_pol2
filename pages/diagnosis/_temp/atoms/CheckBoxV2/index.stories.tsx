import CheckBox, {useCheckBox} from "./index";
import React from "react";

export default {
  title: "Atoms/CheckBox",
  component: CheckBox,
  argTypes: {
    checked: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    onChange: {
      control: { action: "clicked" },
    },
    containerCss: {
      control: { disable: true },
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: true,
    },
  },
};

export const Basic = (args) => <CheckBox {...args} control={null}/>;
