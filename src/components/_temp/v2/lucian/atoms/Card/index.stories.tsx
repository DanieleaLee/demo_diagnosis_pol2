import Card from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle("V2", "Lucian", "Atoms", "Card");

export default {
  title: storyBookTitle,
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 300,
  height: 300,
  clicked: false,
  children: (
    <div style={{ display: "flex", justifyContent: "center" }}>aaa</div>
  ),
};
