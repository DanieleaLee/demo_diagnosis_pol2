import NewTechBox from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Atoms",
  "NewTechBox"
);

export default {
  title: storyBookTitle,
  component: NewTechBox,
} as ComponentMeta<typeof NewTechBox>;

const Template: ComponentStory<typeof NewTechBox> = (args) => (
  <NewTechBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
    title:"Yours",
    subTitle:["Sensor","Contactless","Awareness"]
};
