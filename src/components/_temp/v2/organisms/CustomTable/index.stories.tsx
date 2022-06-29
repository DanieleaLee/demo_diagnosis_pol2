import CustomTable from './index';
import { makeStorybookTitle } from '@tempComponents/v2/helper';

const storyBookTitle = makeStorybookTitle('v2', 'Organisms', 'CustomTable');

const _columns = [
  {
    field: 'indexName',
    headerName: 'Index Name',
    // align: "left",
  },
  {
    field: 'assetClass',
    headerName: 'Asset Class',
  },
  {
    field: 'leverageInverse',
    headerName: 'Leverage/\nInverse',
  },
  {
    field: 'size',
    headerName: 'Size',
  },
  {
    field: 'economicDevelopment',
    headerName: 'Economic\nDevelopment',
    // align: "right",
  },
  {
    field: 'region',
    headerName: 'Region',
  },
];

const _rows = [
  {
    indexName: 'S&P 500',
    assetClass: 'Equity',
    leverageInverse: 'None',
    size: 'Total Market',
    economicDevelopment: 'Developed\nMarket',
    region: 'North\nArmerica',
  },
  {
    indexName: 'KOSPI',
    assetClass: 'Equity',
    leverageInverse: 'None',
    size: 'Large Cap',
    economicDevelopment: 'Emerging\nMarket',
    region: 'North\nArmerica',
  },
  {
    indexName: 'S&P 500',
    assetClass: 'Equity',
    leverageInverse: 'None',
    size: 'Total Market',
    economicDevelopment: 'Developed\nMarket',
    region: 'Asia',
  },
  {
    indexName: 'KOSPI',
    assetClass: 'Equity',
    leverageInverse: 'None',
    size: 'Large Cap',
    economicDevelopment: 'Emerging\nMarket',
    region: 'North\nArmerica',
  },
];

export default {
  title: storyBookTitle,
  component: CustomTable,
  argTypes: {
    rows: {
      control: { type: 'array', required: true },
      defaultValue: [..._rows],
    },
    columns: {
      control: { type: 'array', required: true },
      defaultValue: [..._columns],
    },
    selectable: {
      control: { type: 'boolean', required: true },
      defaultValue: true,
    },
  },
};

export const Basic = (args) => <CustomTable {...args} />;
