import Toggle, {ToggleProps} from "./index";
import {Story} from "@storybook/react";

export default {
  title: "Atoms/Toggle",
  argTypes: {
    // checkedIcon: {
    //   control: {type: "boolean"},
    //   defaultValue: false,
    // },

    // uncheckedIcon: {
    //   control: {type: "boolean"},
    //   defaultValue: false,
    // },

    checked: {
      control: {type: "boolean"},
      defaultValue: false,
    },

    onChange: {
      control: { action: "clicked" },
    },

    onColor: {
      control: {type: "text"},
      defaultValue: "#546A78"
    },

    disabled: {
      control: { type: "boolean" },
      defaultValue: true,
    },

  }
}
export const Basic: Story<ToggleProps> = (args) => <Toggle {...args}/>;

