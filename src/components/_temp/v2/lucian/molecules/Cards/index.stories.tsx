import Cards from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";
import UploadCsv from "@lucian2Components/atoms/Icons/UploadCsv";
import FromPFIcon from "@lucian2Components/atoms/Icons/FromPFIcon";
import EnterManualIcon from "@lucian2Components/atoms/Icons/EnterManualIcon";

const storyBookTitle = makeStorybookTitle("V2", "Lucian", "Molecules", "Cards");

export default {
  title: storyBookTitle,
  component: Cards,
} as ComponentMeta<typeof Cards>;

const Template: ComponentStory<typeof Cards> = (args) => <Cards {...args} />;

export const Default = Template.bind({});
Default.args = {
  cardData: [
    {
      id: "1",
      icon: <FromPFIcon />,
      title: "From Portfolio Generation",
      subTitle: `You can import model portfolio\nfrom My Portfolios`,
      selected: "portfolio",
      type: "text",
    },
    {
      id: "2",
      icon: <UploadCsv />,
      title: "Up Load CSV file",
      selected: "csv",
      type: "radio",
    },
    {
      id: "3",
      icon: <EnterManualIcon />,
      title: "Enter Manually",
      selected: "manual",
      type: "radio",
    },
  ],
  selectedCard: "portfolio",
};
