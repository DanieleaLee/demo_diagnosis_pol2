import React from "react";
import { css } from "@emotion/react";
import { TinyBg } from "@lucian2Components/atoms/Button/TextButtonTinyWithBg";
import ProgressBarBody from "@lucian2Components/atoms/ProgressBarBody";
import Colors from "@styles/colors";

const MRTimeBarBodyCss = css`
  border: 1px solid blue;
  width: 868px;
  height: 63px;
  border-radius: 8px;
  border: 0.5px solid ${Colors.borderPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.backgroundWhite};
`;

const MRStartBtnCss = css`
  border-radius: 8px;
  font-family: "Inter";
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
`;

const MRProgressBarBodyCss = css`
  width: 692px;
  margin-left: 30px;
  margin-right: 10px;
`;

interface Props {
  value: number;
  total: number;
  clickStartBtnHandler?: () => void;
}

// Model Run Time 나타내주고 start 버튼이 포함된 molecules
const MRTimeBar = ({ value, total, clickStartBtnHandler }: Props) => {
  return (
    <div css={MRTimeBarBodyCss}>
      <TinyBg
        title="Start"
        bgTheme="primary"
        height={40}
        css={MRStartBtnCss}
        onClick={clickStartBtnHandler}
      />
      <div css={MRProgressBarBodyCss}>
        <ProgressBarBody
          value={value}
          total={total}
          visibleType={"min"}
          progressVisible={true}
        />
      </div>
    </div>
  );
};

export default MRTimeBar;
