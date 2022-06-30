import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { MAIN_HEADER_HEIGHT } from "src/config/constants/index";
import { safeMarginTop } from "@styles";
import ModelConfigBox from "@tempComponents/v2/organisms/ModelConfigBox";
import ModelSelection from "@tempComponents/v2/organisms/ModelSelection";
import { modelData } from "@tempComponents/v2/organisms/ModelSelection/mockData";
import SearchFilter from "@tempComponents/v2/organisms/SearchFilter";
import fakeData from "@tempComponents/v2/organisms/SearchFilter/db.json";
import SelectPeriodBox from "../organisms/SelectPeriodBox";
import DiagnosisSummary from "@components/thWorkingDirectory/DiganosisSummary";
import ComparisonAnalysis from "@components/thWorkingDirectory/ComparisonAnaylsis";

const DATA = [
  { id: "snp500", title: "S&P 500" },
  { id: "index1", title: "IndexName1" },
  { id: "index2", title: "IndexName2" },
  { id: "index3", title: "IndexName3" },

  { id: "index4", title: "IndexName4" },
  { id: "index5", title: "IndexName5" },
  { id: "index6", title: "IndexName6" },
  { id: "index7", title: "IndexName7" },
  { id: "index8", title: "IndexName8" },
  { id: "index9", title: "IndexName9" },
  { id: "index10", title: "IndexName10" },
];
const mainContainerWrap = css`
  ${safeMarginTop(MAIN_HEADER_HEIGHT)}
`;

const Template_Atoms = () => {
  const [disabledModelConfig, setDisabledModelConfig] = useState(false);

  const [isReset, setIsReset] = useState(false);
  useEffect(() => {
    if (isReset) {
      localStorage.clear();
      setIsReset(false);
    }
  }, [isReset]);
  return (
    <div
      className={"container-md"}
      css={[
        mainContainerWrap,
        css`
          margin-bottom: 100px;
        `,
      ]}
    >
      <br />
      <ComparisonAnalysis />
      <br />
      <DiagnosisSummary />

      <hr />
      <div>
        <h4>ModelConfigBox</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >{`
        <ModelConfigBox rowData={{id: string; title: string;}[]} disabled={boolean}  onSubmit={(rangeData) => console.log(rangeData)} />
        range data를 전달 하는 방법 미정의, 현재 range를 변경 할때 마다 onSubmit함수로 전체 range data를 가져올수 있음
        `}</code>
        <p>disabledModelConfig: {`${disabledModelConfig}`}</p>
        <button onClick={() => setDisabledModelConfig(!disabledModelConfig)}>
          Toggle Disabled
        </button>
        <ModelConfigBox
          rowData={DATA}
          disabled={disabledModelConfig}
          onSubmit={(rangeData) => console.log(rangeData)}
        />
      </div>

      <hr />
      <div>
        <p>
          <button onClick={() => setIsReset(!isReset)}>go reset</button>
        </p>
        <p>
          모델을 선택하고 페이지 이동 후 다시 해당 페이지로 돌아오면 선택된
          모델이 첫번째카드로 배치 된다.
        </p>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >{`
        주의) 내부 적으로 모델 카드의 이미지를 modelData.modelId 와 매핑하여 사용합니다.(각 모델의 이미지를 어떻게 가져올 것 인지 고민 필요)
         <Image width={24} height={24} src={'/img/taehyun/model_{modelId}.png'} alt={'model_{modelId}'} />
        `}</code>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >{`
        <ModelSelection
          modelData={{modelId: string; title: string;description: string;}[]}
          isReset={isReset}
          onSubmit={(selectedModelId: string) => {
            localStorage.setItem('selectedModelId', selectedModelId); // recoil state로 변경 필요
            console.log(selectedModelId);
          }}
        />        
        `}</code>
        <ModelSelection
          modelData={modelData}
          isReset={isReset}
          onSubmit={(selectedModelId: string) => {
            localStorage.setItem("selectedModelId", selectedModelId); // recoil state로 변경 필요
            console.log(selectedModelId);
          }}
        />
      </div>

      <hr />
      <div>
        <h4>SearchFilter</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >{`
        <SearchFilter filterLists={fakeData} onApply={(searchData) => console.log(searchData)} />
        SearchBar에서 keypress enter or click search icon or filterContainer에서 click Apply button 시 onApply 함수 동작
        `}</code>
        <SearchFilter
          filterLists={fakeData}
          onApply={(data) => console.log(data)}
        />
      </div>

      <hr />
      <div>
        <h4>SelectPeriodBox</h4>
        <code
          css={css`
            white-space: pre-wrap;
          `}
        >{`내부 상태 전달 방법 정의 필요`}</code>
        <SelectPeriodBox />
      </div>
    </div>
  );
};

export default Template_Atoms;
