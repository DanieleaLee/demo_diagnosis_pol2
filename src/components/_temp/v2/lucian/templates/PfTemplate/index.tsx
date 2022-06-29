import React, { useState } from "react";
import { css } from "@emotion/react";
import { MdError } from "react-icons/md";
import Colors from "@styles/colors";
import { fakeType } from "@lucian2Components/molecules/Table";
import PfComparison from "@lucian2Components/organisms/PfComparison";
import PfList from "@lucian2Components/organisms/PfList";

const PfTemplateBodyCss = css`
  width: 100%;
  margin: 0 auto;
  padding: 52px 82px 30px 66px;
  background: ${Colors.primary1};
`;

export type pfResultType = {
  element: Array<string | number>;
};

export const errorMessage = (message: string) => (
  <>
    <span>
      <MdError color={Colors.error} />
    </span>
    <span
      css={css`
        color: ${Colors.error};
      `}
    >
      {message}
    </span>
  </>
);

const PfTemplate = () => {
  // 선택된 테이블 리스트
  const [selectedTableArr, setSelectedTableArr] = useState<Array<fakeType>>([]);
  // Compared Result 리스트
  const [portfolioList, setPortfolioList] = useState<Array<pfResultType>>([]);

  const selectedTANotUndefined = selectedTableArr.filter(
    (el) => el !== undefined
  );

  const removeComparedPortfolio = (idx: number) => {
    setPortfolioList(portfolioList.filter((el, i) => i !== idx));
    setSelectedTableArr(selectedTANotUndefined.filter((el, i) => i !== idx));
  };

  const removePfListActionDeleteBtn = () => {
    setPortfolioList((prev) => {
      const temp = selectedTANotUndefined.map((el) => el.id);
      return prev.filter((el) => !temp.includes(String(el.element[0])));
    });
  };

  const addSelectedTable = () => {
    setPortfolioList(
      selectedTANotUndefined.map((el) => {
        if (el) {
          return {
            element: [
              el.id,
              el.portfolio_name,
              el.portfolio_type,
              el.source,
              el.underlaying_assets,
              el.holdings,
              el.initial_date,
              el.end_date,
            ],
          };
        }
      })
    );
  };

  return (
    <div css={PfTemplateBodyCss}>
      <PfComparison
        portfolioList={portfolioList}
        removeComparedPortfolio={removeComparedPortfolio}
      />
      <PfList
        selectedTANotUndefined={selectedTANotUndefined}
        setSelectedTableArr={setSelectedTableArr}
        portfolioList={portfolioList}
        removePfListActionDeleteBtn={removePfListActionDeleteBtn}
        addSelectedTable={addSelectedTable}
      />
    </div>
  );
};

export default PfTemplate;
