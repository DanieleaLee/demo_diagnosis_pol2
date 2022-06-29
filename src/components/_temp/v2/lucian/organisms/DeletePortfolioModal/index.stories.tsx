import DeletePortfolioModal from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Organisms",
  "DeletePortfolioModal"
);

export default {
  title: storyBookTitle,
  component: DeletePortfolioModal,
} as ComponentMeta<typeof DeletePortfolioModal>;

const Template: ComponentStory<typeof DeletePortfolioModal> = (args) => (
  <DeletePortfolioModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 479,
  deleteSelectedTable: () => {},
  closeModal: () => {},
};
