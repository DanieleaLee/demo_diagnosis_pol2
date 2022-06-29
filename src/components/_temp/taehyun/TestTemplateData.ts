import { css } from "@emotion/react";
import { TColumn } from "./molecules/CustomTable";

const customColCss = css`
  color: red;
  /* font-weight: 500;
  font-size: 14px;
  line-height: 17px; */
`;

export const getColumns = (): TColumn[] => {
  return [
    {
      field: "indexName",
      headerName: "Index Name",
      // width: 200,
      // align: "left",
      sortable: true,
    },
    {
      field: "assetClass",
      headerName: "Asset Class",
      sortable: true,
    },
    {
      field: "leverageInverse",
      headerName: "Leverage/\nInverse",
      customHeaderStyle: customColCss,
    },
    {
      field: "size",
      headerName: "Size",
    },
    {
      field: "economicDevelopment",
      headerName: "Economic\nDevelopment",
      customHeaderStyle: customColCss,
      // align: "right",
      // width: 100,
    },
  ];
};

export const getRows = () => {
  return [
    {
      indexName: "S&P 10",
      assetClass: "A_Equity",
      leverageInverse: "A_None",
      size: "A_Total Market",
      economicDevelopment: "A_Developed\nMarket",
    },
    {
      indexName: "S&P 2",
      assetClass: "C_Equity",
      leverageInverse: "C_None",
      size: "C_Large Cap",
      economicDevelopment: "C_Emerging\nMarket",
    },
    {
      indexName: "S&P 1",
      assetClass: "D_Equity",
      leverageInverse: "D_None",
      size: "D_Total Market",
      economicDevelopment: "D_Developed\nMarket",
    },
    {
      indexName: "S&P 12",
      assetClass: "B_Equity",
      leverageInverse: "B_None",
      size: "B_Large Cap",
      economicDevelopment: "B_Emerging\nMarket",
    },
    {
      indexName: "A_S&P 1",
      assetClass: "B_Equity",
      leverageInverse: "B_None",
      size: "B_Large Cap",
      economicDevelopment: "B_Emerging\nMarket",
    },
    {
      indexName: "A_S&P 10",
      assetClass: "B_Equity",
      leverageInverse: "B_None",
      size: "B_Large Cap",
      economicDevelopment: "B_Emerging\nMarket",
    },
    {
      indexName: "A_S&P 2",
      assetClass: "B_Equity",
      leverageInverse: "B_None",
      size: "B_Large Cap",
      economicDevelopment: "B_Emerging\nMarket",
    },
  ];
};
