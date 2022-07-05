import React, { useState, useEffect } from 'react';
import * as TextButton from '@components/atoms/TextButton';
import { css } from '@emotion/react';
import RangeSetBox from './RangeSetBox';
import SelectPeriodBox from './SelectPeriodBox';
import OptimizationGoleBox from './OptimizationGoleBox';
import CheckBox, { useCheckBox } from 'src/components/template/OverlayConfigTemplate/customComponents/NewTechLayer/Checkbox';
import * as Typography from '@styles/typography';
import { BiHelpCircle } from 'react-icons/bi';
import BasicBox from '@components/atoms/BasicBox';
import moment from 'moment';
import { getMPTPortfolio } from './getMPTPortfolio';
import { ClipLoader } from 'react-spinners';
import { useSelectedModelValue } from '@recoil/hooks/useSelectedModel';
import HelpTooltip from '@components/molecules/HelpTooltip';
import EfScatterChart from "@components/customCharts/EfScatterChart";
import { useMPTdata, useMPTdataValue } from "@recoil/hooks/useMPTdata";
import { useModelConfig, useModelConfigValue} from "@recoil/hooks/useModelConfig";

const TECHTREE_HEIGHT = 200;

const RANGE_DATA1 = [
  { id: "snp500", title: "S&P 500" },
  { id: "index1", title: "IndexName1" },
  { id: "index2", title: "IndexName2" },
  { id: "index3", title: "IndexName3" },
];
const RANGE_DATA2 = [
  { id: "equity", title: "Equity" },
  { id: "asset1", title: "Asset Class1" },
  { id: "asset2", title: "Asset Class2" },
  { id: "asset3", title: "Asset Class3" },
];

const containerStyle = css`
  width: 100%;
  height: calc(100% - ${TECHTREE_HEIGHT}px);
  position: relative;
  padding: 34px 11px 90px 40px;
`;
const periodWrapStyle = css`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 13px;
`;

const checkboxTitleStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
const setBoxesWrapStyle = css`
  display: flex;
  gap: 11px;
`;

const buttonWrapStyle = css`
  position: absolute;
  bottom: 24px;
  right: 94px;
  display: flex;
  gap: 7px;
`;

type ModelConfigTemplateProps = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
};
const ModelConfigTemplate = ({ setStep }: ModelConfigTemplateProps) => {
  const { checked: availableIu, onChange: setAvailableIu } = useCheckBox(false);
  const { checked: availableAsset, onChange: setAvailableAsset } = useCheckBox(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState();
  const { modelName, description } = useSelectedModelValue();
  const [isFetched, setFetched] = useState(false);
  const { setMPTdata } = useMPTdata();
  const MPTdata = useMPTdataValue();

  const { setModelConfig } = useModelConfig(); // recoil state 0505
  const modelConfigValue = useModelConfigValue(); // recoil state 0505

  const loadingFetch = async (start, end) => {
    // 0505 recoil 보내기
    console.log("samplePeriod : ", modelConfigValue.samplePeriod);
    setModelConfig({
      ...modelConfigValue,
      samplePeriod: {
        start: start,
        end: end,
      },
    });
    // 0502 날짜 선택시 데이터 페치
    setLoading(true);
    const data = await getMPTPortfolio(start, end);
    // const data = dataFromGraphql['data']
    console.log("fetched data : ", data);
    setData(data); // fetch data 미니맵에 들어갈 data 0502
    setLoading(false);
  };

  useEffect(() => {
    setModelConfig({
      ...modelConfigValue,
      constraintsIU: availableIu,
      constrainsAssetClass: availableAsset
      // availableAsset: availableAsset
    });

    console.log('availableIu : ', availableIu)
    console.log('availableAsset : ', availableAsset)
    console.log('samplePeriod : ', modelConfigValue.samplePeriod)
    console.log('constraintsIU : ', modelConfigValue.constraintsIU)
    console.log('constrainsAssetClass : ', modelConfigValue.constrainsAssetClass)
    console.log('optimizationGoal : ', modelConfigValue.optimizationGoal)
  }, [availableIu, availableAsset]);

  useEffect(() => {
    setFetched(true);
    setMPTdata(data);
    console.log("setMPTdata");
  }, [data]);

  useEffect(() => {
    console.log("MPTdata : ", MPTdata);
  }, [MPTdata]);

  return (
    <div css={containerStyle}>
      <div css={periodWrapStyle}>
        <Typography.Title2 color="#2F3B43">{modelName}</Typography.Title2>
        <HelpTooltip
          size={14}
          title={modelName}
          description={description}
          tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
        />
      </div>
      <SelectPeriodBox
        onSubmit={(start, end) => loadingFetch(start, end)}
        // start={moment().subtract(13, 'years').format('YYYY-MM-DD')}
        // end={moment().subtract(3, 'years').format('YYYY-MM-DD')}
        start={"2019-01-01"}
        end={"2022-03-31"}
        // prettier-ignore
        containerCss={css`margin-bottom: 16px;`}
      />

      <div css={setBoxesWrapStyle}>
        <div>
          <div css={checkboxTitleStyle}>
            <CheckBox checked={availableIu} onChange={setAvailableIu} />
            <Typography.Body2 color="#2F3B43">
              Investment Universe Constraints
            </Typography.Body2>
          </div>
          <RangeSetBox
            rowData={RANGE_DATA1}
            disabled={!availableIu}
            onSubmit={(rangeData) => console.log(rangeData)}
            allRangeSetTitle="Index"
          />
        </div>

        <div>
          <div css={checkboxTitleStyle}>
            <CheckBox checked={availableAsset} onChange={setAvailableAsset} />
            <Typography.Body2 color="#2F3B43">
              Asset Class Constraints
            </Typography.Body2>
          </div>
          <RangeSetBox
            rowData={RANGE_DATA2}
            disabled={!availableAsset}
            onSubmit={(rangeData) => console.log(rangeData)}
            allRangeSetTitle="Asset Class"
          />
        </div>

        <div>
          <div css={[checkboxTitleStyle]}>
            <CheckBox
              containerCss={css`
                visibility: hidden;
              `}
            />
            <Typography.Body2 color="#2F3B43">
              Optimization Goal
            </Typography.Body2>
          </div>
          <OptimizationGoleBox />
        </div>

        <div>
          <div css={[checkboxTitleStyle]}>
            <CheckBox
              containerCss={css`
                visibility: hidden;
              `}
            />
          </div>

          <BasicBox width={498} height={314} borderColor="#CED9E1" isScroll>
            {isLoading && <ClipLoader />}
            {!isLoading && isFetched && (
              <div>
                <div
                  css={css``}
                >
                  <EfScatterChart
                    animation={false}
                    colorSet={[
                      "#9C02FD",
                      "#4E4AC3",
                      "#2CDCC1",
                      "#0C7DC2",
                      "#063E64",
                    ]}
                    lineColor={"#CC6A6A"}
                    data={data}
                    isLoading={isLoading}
                    containerCss={css`
                      padding-top: 10px;
                      width: 460px;
                      height: 270px;
                    `}
                  />
                  <div
                    css={css`
                      position: absolute;
                      bottom: 0%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    `}
                  >
                    <Typography.Body2>Volatility</Typography.Body2>
                  </div>
                  <div
                    css={css`
                      position: absolute;
                      bottom: 50%;
                      right: -20px;
                      transform: rotate(270deg);
                    `}
                  >
                    <Typography.Body2>Sharpe Ratio</Typography.Body2>
                  </div>
                </div>
              </div>
            )}
          </BasicBox>
        </div>
      </div>

      <div css={buttonWrapStyle}>
        <TextButton.Normal
          title="Prev"
          bgTheme="common"
          onClick={() => setStep((prev) => prev - 1)}
        />
        <TextButton.Normal title="Next" bgTheme="accent" onClick={() => {}} />
      </div>
    </div>
  );
};

export default ModelConfigTemplate;
