import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import PfOverlayChartPerformance from "@lucian2Components/organisms/PfOverlayChartPerformance";
import PfOverlayFilterBox from "@lucian2Components/organisms/PfOverlayFilterBox/index";
import { ContentsType } from "@lucian2Components/organisms/PfOverlayFilterBox/index";
import { PFOVERLAY_DUMMAY_DATA } from "@lucian2Components/Dummy";

const PfOverlayTemplateCss = css`
  max-width: 978px;
  width: 100%;
  margin: 0 auto;
`;

type PeriodType = {
  id: number;
  name: string;
  periods: Array<{
    id: number;
    start_date: string;
    end_date: string;
    cagr: string;
    volatility: string;
    mdd: string;
    sharpe: string;
    var: string;
    beta: string;
    chart: number;
  }>;
};

export interface PfOverlayResultProps {
  id: number;
  type: string;
  name: string | Array<{ id: number; name: string }>;
  backTesting_period: {
    start_date: string;
    end_date: string;
  };
  transaction_cost: number;
  rebalancing_frequency: Array<{ id: number; name: string }>;
  period_type: PeriodType[];
}

const PfOverlayResultTemplate = () => {
  // Performance Anaylsis에서 사용되는 더미 데이터
  const [data, setData] = useState<PfOverlayResultProps[]>([]);
  // Performance Analysis에서 선택하고 입력한 값을 담아주기 위한 state
  const [contents, setContents] = useState<ContentsType>({
    period: {
      startDate: "",
      endDate: "",
    },
    cost: "",
    benchmark: "Benchmark",
    rebalancing: "",
  });

  useEffect(() => {
    setData(PFOVERLAY_DUMMAY_DATA);
  }, []);

  return (
    <div css={PfOverlayTemplateCss}>
      <PfOverlayFilterBox
        data={data}
        contents={contents}
        setContents={setContents}
      />
      {/* prettier-ignore */}
      <PfOverlayChartPerformance data={data} contents={contents}  />
    </div>
  );
};

export default PfOverlayResultTemplate;
