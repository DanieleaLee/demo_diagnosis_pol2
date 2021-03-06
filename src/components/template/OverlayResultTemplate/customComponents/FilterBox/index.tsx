import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { css } from "@emotion/react";
import { BiHelpCircle } from "react-icons/bi";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import { flexCenter, flexRow, flexColumn } from "@styles";
import Dropdown from "./Dropdown";
import SelectPeriod from "./SelectPeriod";
import * as TextButton from "@components/atoms/TextButton";
import { flexRowStyle } from "@components/template/OverlayConfigTemplate";

const flexColumnStyle = css`
  ${flexColumn};
`;

const PfOlFilterBoxContainerCss = css`
  width: 978px;
  height: 99px;
  padding: 10px 0 0 26px;
  border: 1px solid ${Colors.primary6};
  border-radius: 8px;
  background: ${Colors.backgroundWhite};
`;

const PfOlFilterBoxLeftWrapCss = css`
  padding-right: 25px;
`;

const PfOlFilterBoxCostWrapCss = css`
  ${flexRow};
  padding-bottom: 8px;
`;

const PfOlFilterBoxBenchmarkWrapTxtCss = css`
  ${flexRow};
  padding-top: 12px;
`;

const PfOlFilterBoxTxtCss = css`
  ${flexRow};
  min-width: 210px;

  p {
    padding: 0 5.17px 2px 0;
  }
`;

const PfOlFilterBoxRebalancingWrapCss = css`
  ${flexRow};
  padding-top: 2px;
`;

const PfOlFilterBoxCostInputWrapCss = css`
  ${flexRow};

  input {
    margin-right: 6px;
  }
`;

const PfOlFilterBoxCostInputCss = css`
  width: 80px;
  height: 27px;
  border-radius: 4px;
  border: 1px solid ${Colors.hint};
  background: ${Colors.backgroundWhite};
  font-family: "Inter";
  font-size: 13px;
  line-height: 16px;
  color: ${Colors.buttonSubmit};
  text-align: center;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const PfOlFilterBoxSimulateBtnCss = css`
  ${flexCenter};
  margin-left: 37px;
`;

export type ContentsType = {
  period: {
    startDate: string;
    endDate: string;
  };
  cost: string;
  benchmark: string;
  rebalancing: string;
};

interface Props {
  data: any[];
  contents: ContentsType;
  setContents: React.Dispatch<React.SetStateAction<ContentsType>>;
  showChart?: boolean;
  showChartHandler?: () => void;
}

const FilterBox = ({
  data,
  contents,
  setContents,
  showChart,
  showChartHandler,
}: Props) => {
  const BENCHMARK_DATA = data.filter((el) => el.type === "benchmark")[0]?.name;
  const REBALANCING_DATA = data.filter((el) => el.type !== "benchmark")[0]
    ?.rebalancing_frequency;
  const [costValue, setCostValue] = useState("");

  // Transaction Cost?????? ???????????? ?????????
  const handleChangeCost = (event: ChangeEvent<HTMLInputElement>) => {
    setCostValue(event.currentTarget.value);
  };

  // ????????? benchmark ?????? ???????????? ?????????
  const handleChangeBenchmark = (event: ChangeEvent<HTMLInputElement>) => {
    setContents({
      ...contents,
      benchmark: event.currentTarget.value,
    });
  };
  // ????????? rebalancing ?????? ???????????? ?????????
  const handleChangeRebalancing = (event: ChangeEvent<HTMLInputElement>) => {
    setContents({
      ...contents,
      rebalancing: event.currentTarget.value,
    });
  };

  // ?????????, ????????? ?????? ????????? ???????????? ?????????
  const updateDate = (startDate: string, endDate: string) => {
    setContents({
      ...contents,
      period: {
        startDate,
        endDate,
      },
    });
  };

  // Simulate ?????? ?????? ??? ?????? ???????????? ?????????
  const onSimulateHandler = useCallback(async () => {
    // const response = await axios.post(
    //   "http://localhost:8080/api/",
    //   JSON.stringify(contents),
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     withCredentials: true,
    //   }
    // );
    // console.log("response", response);
    // await showChartHandler();
  }, [costValue, contents]);

  useEffect(() => {
    setContents({
      ...contents,
      cost: costValue,
    });
  }, [costValue]);

  return (
    <div css={PfOlFilterBoxContainerCss}>
      <div css={flexRowStyle}>
        <div css={[flexColumnStyle, PfOlFilterBoxLeftWrapCss]}>
          <SelectPeriod updateDate={updateDate} />
          <div css={PfOlFilterBoxBenchmarkWrapTxtCss}>
            {/* prettier-ignore */}
            <Typography.Subtitle2 css={css`min-width:168px;padding-top:5px;`} color={Colors.buttonSubmit}>
               Benchmark
            </Typography.Subtitle2>
            <Dropdown
              type="benchmark"
              width={182}
              contents={contents}
              handleChangeBenchmark={handleChangeBenchmark}
              radioData={BENCHMARK_DATA as Array<{ id: number; name: string }>}
            />
          </div>
        </div>
        <div
          css={css`
            padding-bottom: 3px;
          `}
        >
          <div css={PfOlFilterBoxCostWrapCss}>
            <div css={PfOlFilterBoxTxtCss}>
              <Typography.Subtitle2 color={Colors.buttonSubmit}>
                Transaction Cost
              </Typography.Subtitle2>
              <BiHelpCircle size={11.67} color={Colors.buttonSubmit} />
            </div>
            <div css={PfOlFilterBoxCostInputWrapCss}>
              <input
                css={PfOlFilterBoxCostInputCss}
                type="number"
                onChange={handleChangeCost}
                value={costValue}
              />
              <Typography.Subtitle3 color={Colors.buttonSubmit}>
                %
              </Typography.Subtitle3>
            </div>
            <TextButton.Tiny
              title="Simulate"
              onClick={onSimulateHandler}
              color={Colors.overlaySimulateBtnColor}
              css={PfOlFilterBoxSimulateBtnCss}
            />
          </div>
          <div css={PfOlFilterBoxRebalancingWrapCss}>
            <div
              css={[
                PfOlFilterBoxTxtCss,
                css`
                  padding-top: 3px;
                `,
              ]}
            >
              <Typography.Subtitle2 color={Colors.buttonSubmit}>
                Rebalancing Frequency
              </Typography.Subtitle2>
              <BiHelpCircle size={11.67} color={Colors.buttonSubmit} />
            </div>
            <Dropdown
              type="rebalancing"
              width={187}
              contents={contents}
              radioData={
                REBALANCING_DATA as Array<{ id: number; name: string }>
              }
              handleChangeRebalancing={handleChangeRebalancing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
