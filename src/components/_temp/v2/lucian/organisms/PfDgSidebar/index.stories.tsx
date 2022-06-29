import PfDgSidebar from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { makeStorybookTitle } from "@lucianComponents/helper";

const storyBookTitle = makeStorybookTitle(
  "V2",
  "Lucian",
  "Organisms",
  "PfDgSidebar"
);

export default {
  title: storyBookTitle,
  component: PfDgSidebar,
} as ComponentMeta<typeof PfDgSidebar>;

const Template: ComponentStory<typeof PfDgSidebar> = (args) => (
  <PfDgSidebar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data:[
    {
      "id": 1,
      "title": "Macro Layers",
      "lists": [
        {
          "id": 1,
          "name": "Inflation",
          "value": 25
        },
        {
          "id": 2,
          "name": "Deflation",
          "value": 59
        },
        {
          "id": 3,
          "name": "Stagflation",
          "value": 32
        },
        {
          "id": 4,
          "name": "Goldilocks",
          "value": 73
        },
        {
          "id": 5,
          "name": "Monetary Policy",
          "value": 68
        },
        {
          "id": 6,
          "name": "Yield Curve Flattening",
          "value": 42
        },
        {
          "id": 7,
          "name": "Yield Curve Steepening",
          "value": 54
        },
        {
          "id": 8,
          "name": "Oil Price",
          "value": 38
        }
      ]
    },
    {
      "id": 2,
      "title": "Thematic Layers",
      "lists": [
        {
          "id": 1,
          "name": "Metaverse",
          "value": 59
        },
        {
          "id": 2,
          "name": "New Tech & Value",
          "value": 62
        },
        {
          "id": 3,
          "name": "Blockchain",
          "value": 61
        }
      ]
    },
    {
      "id": 3,
      "title": "ESG Layers",
      "lists": ""
    },
    {
      "id": 4,
      "title": "Traditional Layers",
      "lists": [
        {
          "id": 1,
          "name": "Metaverse",
          "value": 59
        },
        {
          "id": 2,
          "name": "New Tech & Value",
          "value": 62
        },
        {
          "id": 3,
          "name": "Blockchain",
          "value": 61
        }
      ]
    },
    {
      "id": 5,
      "title": "Custom Layers",
      "lists": ""
    }
  ]
};
