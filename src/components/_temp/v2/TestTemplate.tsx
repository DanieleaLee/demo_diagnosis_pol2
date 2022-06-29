import { css, keyframes } from "@emotion/react";
import { useState } from "react";
import Template_Atoms from "src/components/_temp/v2/test/_atoms";
import Template_Asd_304 from "src/components/_temp/v2/test/_304";
import Template_Molecules from "src/components/_temp/v2/test/_molecures";
import Template_Organisms from "src/components/_temp/v2/test/_organisms";
import ChartTest from "./test/ChartTest";
import ChartTest2 from "./test/ChartTest2";
import ChartTest3 from "./test/ChartTest3";
import PfDiagnosis from "./test/PfDiagnosis";
import PfOverlay from "./test/PfOverlay";
import PfOverlayResult from "./test/PfOverlayResult";

/**
 * Test Template 위 경로에서 각자 이름을 바꿔주면 됨
 *  "@alvinComponents/*": ["src/components/temp/alvin/*"],
 *  "@alvinComponents": ["src/components/temp/alvin"],
 *  "@lucianComponents/*": ["src/components/temp/lucian/*"],
 *  "@lucianComponents": ["src/components/temp/lucian"],
 *  "@taehyunComponents/*": ["src/components/temp/taehyun/*"],
 *  "@taehyunComponents": ["src/components/temp/taehyun"],
 */

const buttonListCss = css`
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 15px;
  > button {
    background-color: #a6b5be; /* Green */
    border: none;
    color: white;
    padding: 5px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin-left: 8px;
    border-radius: 4px;
  }
  > button:hover {
    box-shadow: 0 1px 2px 0 #5a5a5a3d, 0 2px 6px 1px #50505030;
  }
`;

const checkedStyle = {
  boxShadow: `3px 2px 6px 4px #2929293b`,
};

const menuListObj = {
  CHART_TEST3: <ChartTest3 />,
  CHART_TEST2: <ChartTest2 />,
  ATOMS: <Template_Atoms />,
  ASD_304: <Template_Asd_304 />,
  MOLUCURES: <Template_Molecules />,
  ORGANISMS: <Template_Organisms />,
  CHART_TEST: <ChartTest />,
  PF_DIAGNOSIS: <PfDiagnosis />,
  PF_OVERLAY: <PfOverlay />,
  PF_OVERLAY_RESULT: <PfOverlayResult />,
};
const keys = Object.keys({ ...menuListObj });

const TestTemplate = (props) => {
  const [template, setTemplate] = useState("ORGANISMS");
  const routingHandler = (e) => {
    const currentStepName = e.currentTarget.innerText;
    if (e.currentTarget.innerText == "NEXT") {
      const currentIndex = keys.indexOf(template);
      const nextIndex = (currentIndex + 1) % keys.length;
      setTemplate(keys[nextIndex]);
    } else {
      setTemplate(currentStepName);
    }
  };

  return (
    <>
      <div css={[buttonListCss]}>
        {[...keys, "NEXT"].map((ts, k) => {
          return (
            <button
              key={k}
              style={ts == template ? checkedStyle : null}
              onClick={(e) => {
                routingHandler(e);
              }}
            >
              {ts}
            </button>
          );
        })}
      </div>
      {menuListObj[template]}
    </>
  );
};

export default TestTemplate;
