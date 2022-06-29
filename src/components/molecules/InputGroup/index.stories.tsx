import InputGroup from "./index";
import React from "react";

export default {
  title: "Molecules/InputGroup",
  component: InputGroup,
  argTypes:{
    title: {
      control: {type: "text"},
      defaultValue: "title"
    },
    description :{
      control: {type: "text"},
      defaultValue: "desc"
    },
    inputCss: {},
    containerCss:{},
    error:{
      control: {type: "text"},
      defaultValue: "",
    }

  }
};

export const Basic = (args) => <InputGroup {...args} />;
