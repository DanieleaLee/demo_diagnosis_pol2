import Input from "./index";
import React from "react";

export default {
  title: "Atoms/Input",
  component: Input,
  argTypes: {
    error: {
      control: { type: "boolean" },
      defaultValue: true,
    },
    icon: {
      control: { type: "text" },
    },
    css: {
      control: { disable: true },
    },
  },
};

export const Basic = (args) => <Input {...args} />;