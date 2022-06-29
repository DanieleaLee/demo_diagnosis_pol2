import { css } from "@emotion/react";
import { ReactElement } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
import Image from "next/image";

const goals = [
    'Maximize Sharpe Ratio', 
    'Minimize Volatility', 
    'Minimize Annual Volatility',
    'Maximize Annual Return',
]

const TechTreeItemRow = ({ type, value, spaceWidth, onClick }) => {
  const [leftSpaceWidth, middleSpaceWidth, rightSpaceWidth] = spaceWidth;

  const TechTreeItemCss = css`
    // Item
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    color: #fff;
    font-weight: 600;
    font-size: 11px; //
    font-family: "Inter";
    font-style: normal;
  `;

  const leftSpace = (width) => css`
    width: ${width}%; // Item left Width - Props
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 12px;
    /* border: 1px solid white; */
  `;
  const middleSpace = (width) => css`
    width: ${width}%; // Item middle Width - Props
    /* border: 1px solid white; */
  `;
  const rightSpace = (width) => css`
    width: ${width}%; // Item right Width - Props
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 12px;
  `;

  const connectLine = css`
    display: inline-block;
    width: 100%; // 양쪽 Line Width - Props
    height: 2px;
    background-color: #b2bfc0;
  `;

  const titleCss = css`
    width: 100%;
    height: 26px; // 높이
    /* line-height: 10px; */
    /* padding-top: 2px; */
  `;

  const labelCss = css`
    border: 2px solid #b2bfc0;
    -webkit-border-radius: 5px/4px;
    -moz-border-radius: 5px/4px;
    background: #4a5c67;
    border-radius: 5px/4px;
    width: 100%;
    height: 26px; // 높이
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;

  const weightTitleCss = css`
    width: 100%;
    height: 26px; // 높이
    font-size: 10px;
    /* line-height: 10px; */
    padding-top: 5px;
  `;

  const weightBarOutlineCss = css`
    border: 2px solid #94a1a9;
    -webkit-border-radius: 6px/3px;
    -moz-border-radius: 6px/3px;
    width: 100%;
    height: 12px; // 높이
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1.3px;
    padding-right: 1.3px;
    padding-top: 1.3px;
    padding-bottom: 1.3px;
  `;

  const weightBarInlineCss = (weight) => css`
    background-color: #fff;
    border-radius: 3px;
    opacity: 0.7;
    width: ${weight}%;
    height: 100%;
  `;

  const weightBarLabelCss = css`
    padding-top: 2px;
    font-size: 10px;
    text-align: right;
    padding-bottom: 5px;
  `;

  const imgCss = css`
    padding-top: 4px;
    text-align: center;
  `;

  const configCss = css`
    width: 191px;
    height: 150px;
    position: relative;
    /* border: 1px solid white; */

    > div {
      height: 100%;
      top: 0;
      position: absolute;
      padding-top: 15px;
      padding-left: 10px;
      box-sizing: border-box;
      color: #fff;
      font-size: 10px;
    }

    .In_sample {
      height: 38px;
    }

    .Constraints {
      height: 38px;
    }

    .Goal {
      height: 25px;
    }

    .In_sample,
    .Constraints,
    .Goal {
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;
    }

    .In_sample > span,
    .Constraints > span,
    .Goal > span {
      line-height: 1.3;
    }

    .mc_sub_content {
      padding-left: 6px;
    }
  `;

  const HTMLinMiddleSpace = (type, value) => {
    if (type == "title") {
      return (
        <div css={[titleCss]} onClick={onClick}>
          {value}
        </div>
      );
    } else if (type == "label" && value) {
      return (
        <div css={[labelCss]} onClick={onClick}>
          {value[0]} {value[1] ? " : " + value[1] : ""}
        </div>
      );
    } else if (type == "weightTitle" && value) {
      return (
        <div css={[weightTitleCss]} onClick={onClick}>
          {value}
        </div>
      );
    } else if (type == "weight" && value) {
      return Object.entries(value).map(([name, weight], k) => {
        return (
          <div key={k} onClick={onClick}>
            <div css={[weightBarOutlineCss]}>
              <div css={[weightBarInlineCss(weight)]}></div>
            </div>
            <div css={[weightBarLabelCss]}>
              <span>{name} </span>
              <span>{weight}%</span>
            </div>
          </div>
        );
      });
    } else if (type == "img" && value) {
      return (
        <div css={[imgCss]} onClick={onClick}>
          <Image
            src={value[0]}
            width={value[1]}
            height={value[2]}
            alt={"regoin"}
          />
        </div>
      );
    } else if (type == "config" && value) {
      const {
        samplePeriod,
        constraintsIU,
        constrainsAssetClass,
        optimizationGoal,
      } = value;

      console.log("TECH samplePeriod :", samplePeriod);

      return (
        <div css={[configCss]}>
          <div>
            <div className="In_sample">
              <span className="mc_sub_title">In Sample</span>
              <span className="mc_sub_content">
                Period: {samplePeriod["start"]}~{samplePeriod["end"]}
              </span>
              {/* <span className="mc_sub_content">Frequency: Monthly</span> */}
            </div>
            <div className="Constraints">
              <span className="mc_sub_title">Constraints</span>
              <span className="mc_sub_content">
                Investment Universe: {constraintsIU ? "Yes" : "no"}
              </span>
              <span className="mc_sub_content">
                Asset Class: {constrainsAssetClass ? "Yes" : "no"}
              </span>
            </div>
            <div className="Goal">
              <span className="mc_sub_title">Goal</span>
              <span className="mc_sub_content">{goals[optimizationGoal]}</span>
            </div>
          </div>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M1 0 v90 l14 9 h83 v-82 l-14 -9 h-40 l-8 -7 H1z"
              fill="#4A5C67"
              stroke="#B2BFC0"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      );
    }
  };

  return (
    <div css={[TechTreeItemCss]}>
      <div css={[leftSpace(leftSpaceWidth)]}>
        {type == "label" || type == "config" ? (
          <span css={[connectLine]}></span>
        ) : (
          ""
        )}
      </div>
      <div css={[middleSpace(middleSpaceWidth)]}>
        {HTMLinMiddleSpace(type, value)}
      </div>
      <div css={[rightSpace(rightSpaceWidth)]}>
        {type == "label" ? <span css={[connectLine]}></span> : ""}
      </div>
    </div>
  );
};

export default TechTreeItemRow;
