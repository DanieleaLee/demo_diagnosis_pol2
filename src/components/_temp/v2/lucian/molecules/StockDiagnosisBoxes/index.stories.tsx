import StackDiagnosisBoxes from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucian2Components/helper";
import {
  BiChip,
  BiDollarCircle,
  BiDonateHeart,
  BiHealth,
  BiLineChart,
  BiPieChart,
  BiShuffle,
  BiStreetView,
  BiUserVoice,
} from "react-icons/bi";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Molecules",
  "StackDiagnosisBoxes"
);

export default {
  title: storyBookTitle,
  component: StackDiagnosisBoxes,
} as ComponentMeta<typeof StackDiagnosisBoxes>;

const Template: ComponentStory<typeof StackDiagnosisBoxes> = (args) => (
  <StackDiagnosisBoxes {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      id: 1,
      subject: "Technology",
      subData: [
        {
          id: 1,
          title: "APPL",
          subTitle: "Apple Inc.",
        },
        {
          id: 2,
          title: "MSFT",
          subTitle: "Microsoft Corporation",
        },
        {
          id: 3,
          title: "NVDA",
          subTitle: "NVIDIA Corporation",
        },
      ],
    },
    {
      id: 2,
      subject: "Finance",
      subData: [
        {
          id: 1,
          title: "V",
          subTitle: "Visa Inc.",
        },
        {
          id: 2,
          title: "MA",
          subTitle: "Mastercard Incorporated",
        },
        {
          id: 3,
          title: "JPM",
          subTitle: "JPMorgan Chase & Co.",
        },
      ],
    },
    {
      id: 3,
      subject: "Communication",
      subData: [
        {
          id: 1,
          title: "GOOG",
          subTitle: "Alphabet Inc.",
        },
        {
          id: 2,
          title: "FB",
          subTitle: "Meta Platforms, Inc",
        },
        {
          id: 3,
          title: "DIS",
          subTitle: "The Wwalt Disney Company",
        },
      ],
    },
    {
      id: 4,
      subject: "Healthcare",
      subData: [
        {
          id: 1,
          title: "TICK1",
          subTitle: "Ticker1 Name",
        },
        {
          id: 2,
          title: "TICK2",
          subTitle: "Ticker2 Name",
        },
        {
          id: 3,
          title: "TICK3",
          subTitle: "Ticker3 Name",
        },
      ],
    },
    {
      id: 5,
      subject: `Consumer\nDiscretionary`,
      subData: [
        {
          id: 1,
          title: "TICK1",
          subTitle: "Ticker1 Name",
        },
        {
          id: 2,
          title: "TICK2",
          subTitle: "Ticker2 Name",
        },
        {
          id: 3,
          title: "TICK3",
          subTitle: "Ticker3 Name",
        },
      ],
    },
  ],
};


export const Qraft = Template.bind({});
Qraft.args = {
  data: [
    {
      id: 1,
      subject: "Momentum",
      subData: [
        {
          id: 1,
          title: "APPL",
          subTitle: "Apple Inc.",
        },
        {
          id: 2,
          title: "MSFT",
          subTitle: "Microsoft Corporation",
        },
        {
          id: 3,
          title: "NVDA",
          subTitle: "NVIDIA Corporation",
        },
      ],
    },
    {
      id: 2,
      subject: "Growth",
      subData: [
        {
          id: 1,
          title: "V",
          subTitle: "Visa Inc.",
        },
        {
          id: 2,
          title: "MA",
          subTitle: "Mastercard Incorporated",
        },
        {
          id: 3,
          title: "JPM",
          subTitle: "JPMorgan Chase & Co.",
        },
      ],
    },
    {
      id: 3,
      subject: "Dividend",
      subData: [
        {
          id: 1,
          title: "GOOG",
          subTitle: "Alphabet Inc.",
        },
        {
          id: 2,
          title: "FB",
          subTitle: "Meta Platforms, Inc",
        },
        {
          id: 3,
          title: "DIS",
          subTitle: "The Wwalt Disney Company",
        },
      ],
    },
    {
      id: 4,
      subject: "Volatility",
      subData: [
        {
          id: 1,
          title: "TICK1",
          subTitle: "Ticker1 Name",
        },
        {
          id: 2,
          title: "TICK2",
          subTitle: "Ticker2 Name",
        },
        {
          id: 3,
          title: "TICK3",
          subTitle: "Ticker3 Name",
        },
      ],
    },
    {
      id: 5,
      subject: "Value",
      subData: [
        {
          id: 1,
          title: "TICK1",
          subTitle: "Ticker1 Name",
        },
        {
          id: 2,
          title: "TICK2",
          subTitle: "Ticker2 Name",
        },
        {
          id: 3,
          title: "TICK3",
          subTitle: "Ticker3 Name",
        },
      ],
    },
  ],
};
