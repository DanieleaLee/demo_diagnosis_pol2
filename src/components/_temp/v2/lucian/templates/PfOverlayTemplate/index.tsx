import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexRow } from "@styles";
import PfDgSidebar from "@lucian2Components/organisms/PfDgSidebar";
import PfOverlayHighInflation from "@lucian2Components/organisms/PfOverlayHighInflation";
import { PFDGSIDEBAR_DUMMY_DATA } from "@lucian2Components/Dummy";
import NewTechTemplate from "../NewTechTemplate";

export const flexRowStyle = css`
  ${flexRow}
`;

const PfOlTemplateTitleCss = css`
  padding-bottom: 10px;
`;

export type SidebarDataType = {
  id: number;
  title: string;
  lists: Array<{
    id: number;
    name: string;
    value: number;
  }> | string ;
};

type Dummy = {
  id: number;
  component: any;
};


// Overlay Template
const PfOverlayTemplate = () => {
  // Sidebar data 담고있는 state
  const [_data, setData] = useState<SidebarDataType[]>([]);
  // Sidebar 라디오 버튼 클릭된 목록 담고있는 state
  const [clickedLayer, setClickedLayer] = useState("");


 

  const onClickLayerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.currentTarget;
    setClickedLayer(value);
 };


  useEffect(() => {
    setData(PFDGSIDEBAR_DUMMY_DATA);    
  }, [clickedLayer]);

  return (
    <div css={flexRowStyle}>
      <div>
        <Typography.Subtitle4
          css={PfOlTemplateTitleCss}
          color={Colors.buttonSubmit}
        >
          Layer Candidates
        </Typography.Subtitle4>
        <PfDgSidebar
          data={_data}
          clickedLayer={clickedLayer}
          onClickLayerHandler={onClickLayerHandler}
        />
      </div>     

    </div>
  );
};

export default PfOverlayTemplate;
