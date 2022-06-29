import TextLink, { TextLinkProps } from "./index";
import TextButtonStory from "@components/atoms/TextButton/index.stories";
import { Story } from "@storybook/react";
import React from "react";

export default {
  title: "Atoms/TextLink",
  component: TextLink,
  argTypes: {
    ...TextButtonStory.argTypes,
    ...{
      href: {
        control: { type: "text" },
        defaultValue: "/",
      },
      as: {
        control: { disable: true },
      },
      replace: {
        control: { type: "boolean" },
      },
    },
  },
};

export const Basic: Story<TextLinkProps> = (args) =>
  <TextLink {...args} href={"/"} />;
