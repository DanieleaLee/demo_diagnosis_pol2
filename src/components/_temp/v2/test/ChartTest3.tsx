import React, { useState, useCallback } from 'react';
import { css } from '@emotion/react';
import HorizontalBarChart from '../customCharts/HorizontalBarChart';
import TreemapChartSimple from '../customCharts/TreemapChartSimple';
import RadarChartSimple from '../customCharts/RadarChartSimple';
import SingleScoreChart from '../customCharts/SingleScoreChart';
import TreemapChartGradient from '../customCharts/TreemapChartGradient';
import { obama_budget_2012 } from '../customCharts/TreemapChartGradient/obama_budget_2012';
import { singleSectionData } from '../customCharts/TreemapChartGradient/singleSectionData';
import { convertData } from '../customCharts/TreemapChartGradient/convertData';

const ChartTest3 = () => {
  const [factor3Data, setFactor3Data] = useState(FACTOR3_DATA);

  const gradData = convertData(obama_budget_2012, 2);
  const singleData = convertData(singleSectionData, 1);

  const addData = () => {
    const length = factor3Data.rowData.length;
    const _data = factor3Data.yAxisData.map(() => Math.floor(Math.random() * 9 + 1) / 10);
    const _rowData = { name: 'BM' + length, data: _data };
    setFactor3Data({ ...factor3Data, rowData: [...factor3Data.rowData, _rowData] });
  };

  return (
    <>
      <h4>TreemapChartGradient</h4>
      <TreemapChartGradient
        isLoading={false}
        rowData={singleData}
        visualDimension={2}
        containerCss={css`width: 830px;height: 532px;margin-bottom: 40px; border:1px solid red;`} // prettier-ignore
      />
      <br />

      <TreemapChartGradient
        isLoading={false}
        rowData={gradData}
        visualDimension={3}
        containerCss={css`width: 830px;height: 532px;margin-bottom: 40px; border:1px solid red;`} // prettier-ignore
      />
      <br />

      <h4>SingleScoreChart</h4>
      <div
        css={css`
          display: flex;
          margin-bottom: 40px;
        `}
      >
        <SingleScoreChart
          isLoading={false}
          value={80}
          name={'Inflation'}
          containerCss={css`height: 50px;width: 50px; margin-right:20px;`} // prettier-ignore
        />
        <SingleScoreChart
          isLoading={false}
          value={-80}
          name={'Inflation'}
          containerCss={css`height: 50px;width: 50px;margin-right:20px;`} // prettier-ignore
        />

        <SingleScoreChart
          isLoading={false}
          animation={false}
          value={63}
          name={'Inflation'}
          fontSize={10}
          lineWidth={1.5}
          containerCss={css`height: 26px;width: 26px;margin-right:20px;`} // prettier-ignore
        />
      </div>

      <h4>RadarChartSimple</h4>
      <RadarChartSimple
        isLoading={false}
        rowData={RADAR_DATA.data}
        indicatorOpt={RADAR_DATA.indicator}
        // // color={['#41829E', '#6E308B', '#C69DD9','#AF947A','#9E1A81']}
        containerCss={css`width: 400px;height: 300px;margin-bottom:40px;`} // prettier-ignore
      />

      <h4>TreemapChartSimple</h4>
      <TreemapChartSimple
        isLoading={false}
        rowData={TREEMAP_DATA}
        // color={['#41829E', '#6E308B', '#C69DD9','#AF947A','#9E1A81']}
        containerCss={css`width: 600px;height: 400px;margin-bottom: 40px;`} // prettier-ignore
      />
      <br />

      <h4>HorizontalBarChart</h4>
      <button onClick={addData}>Add Data</button>
      <span>
        selected:
        {factor3Data.rowData
          .map((el) => el.name)
          .filter((el) => el !== 'MY')
          .join(', ')}
      </span>

      <HorizontalBarChart
        color={['#2D5885', '#3B77E6', '#82D2D9', '#3C89C5', '#4BADC4']} // fixed horizontal bar chart color set
        isLoading={false}
        yAxisData={factor3Data.yAxisData}
        rowData={factor3Data.rowData}
        containerCss={css`
          width: 100%;
          height: 400px;
          margin-bottom: 40px;
        `}
      />

      <HorizontalBarChart
        isLoading={false}
        yAxisData={FACTOR5_DATA.yAxisData}
        rowData={FACTOR5_DATA.rowData}
        color={['#2D5885', '#3B77E6', '#82D2D9', '#3C89C5', '#4BADC4']} // fixed horizontal bar chart color set
        containerCss={css`
          width: 100%;
          height: 400px;
          margin-bottom: 40px;
        `}
      />

      <HorizontalBarChart
        isLoading={false}
        yAxisData={SECTOR_DATA.yAxisData}
        rowData={SECTOR_DATA.rowData}
        color={['#2D5885', '#3B77E6', '#82D2D9', '#3C89C5', '#4BADC4']} // fixed horizontal bar chart color set
        containerCss={css`
          width: 100%;
          height: 400px;
          margin-bottom: 40px;
        `}
      />

      <br />
    </>
  );
};

export default ChartTest3;

const FACTOR3_DATA = {
  yAxisData: ['Rm-rf', 'SMB', 'HML'],
  rowData: [
    { name: 'MY', data: [0.8, 0.5, 0.3] },
    { name: 'S&P500', data: [0.7, 0.4, 0.2] },
    { name: 'NASDAQ 100', data: [0.6, 0.2, 0.1] },
  ],
};

const FACTOR5_DATA = {
  yAxisData: ['Rm-rf', 'SMB', 'HML', 'RMW', 'CMA'],
  rowData: [
    { name: 'MY', data: [0.8, 0.5, 0.3, 0.4, 0.7] },
    { name: 'S&P500', data: [0.7, 0.4, 0.2, 0.5, 0.7] },
    { name: 'NASDAQ 100', data: [0.6, 0.2, 0.1, 0.6, 0.7] },
  ],
};

const SECTOR_DATA = {
  yAxisData: [
    'Energy',
    'Materials',
    'Industrials',
    'Consumer Discretionary',
    'Consumer Staples',
    'Healthcare',
    'Finacials',
    'Information Technology',
    'Communication Services',
    'Utilities',
    'Real Estate',
  ],
  rowData: [
    { name: 'MY', data: [0.2, 0.5, 0.2, 0.9, 0.1, 0.7, 0.4, 0.8, 0.1, 0.6, 0.3] },
    { name: 'S&P500', data: [0.9, 0.6, 0.8, 0.3, 0.5, 0.2, 0.4, 0.7, 0.2, 0.1, 0.1] },
  ],
};

const TREEMAP_DATA = [
  { name: 'Energy', value: 100 },
  { name: 'Materials', value: 90 },
  { name: 'Industrials', value: 80 },
  { name: 'Consumer Discretionary', value: 70 },
  { name: 'Consumer Staples', value: 60 },
  { name: 'Healthcare', value: 50 },
  { name: 'Finacials', value: 40 },
  { name: 'Information Technology', value: 30 },
  { name: 'Communication Services', value: 20 },
  { name: 'Utilities', value: 10 },
  { name: 'Real Estate', value: 0 },
];

const RADAR_DATA = {
  indicator: [
    { name: 'Value', max: 5 },
    { name: 'Dividend', max: 5 },
    { name: 'Momentum', max: 5 },
    { name: 'Volatility', max: 5 },
    { name: 'Growth', max: 5 },
  ],
  data: [
    {
      value: [3.2, 3, 4.5, 2.4, 4.7],
      name: 'Risk Factor Analysis',
    },
  ],
};
