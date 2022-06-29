import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import { flexRow } from "@styles";
import PfDgSidebar from "@lucian2Components/organisms/PfDgSidebar";
import { PFDGSIDEBAR_DUMMY_DATA } from "@lucian2Components/Dummy";
import PfOverlayHighInflation from "@lucian2Components/organisms/PfOverlayHighInflation";

export const flexRowStyle = css`
  ${flexRow}
`;

const PfOlTemplateTitleCss = css`
  padding-bottom: 10px;
`;

export type SidebarDataType = {
  id: number;
  title: string;
  lists: {
    id: number;
    name: string;
    value: number;
    lists: {
      id: number;
      name: string;
    }[];
  }[];
};

type Dummy = {
  id: number;
  component: any;
};

const PfOverlay = () => {
  const [_data, setData] = useState<SidebarDataType[]>([]);
  const [clickedLayer, setClickedLayer] = useState("");

  const PFOVERLAY_PAGE_DUMMY_DATA: Dummy[] = [
    {
      id: 1,
      component: <>Index Name 1</>,
    },
    {
      id: 19,
      component: <PfOverlayHighInflation data={_data} />,
    },
    {
      id: 20,
      component: <>Index Name 20</>,
    },
  ];

  const onClickLayerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.currentTarget;
    setClickedLayer(id);
  };

  useEffect(() => {
    setData(PFDGSIDEBAR_DUMMY_DATA);
  }, []);

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
      {PFOVERLAY_PAGE_DUMMY_DATA.map(
        (el) =>
          el.id === +clickedLayer &&
          el.component !== undefined && <div key={el.id}>{el.component}</div>
      )}
    </div>
  );
};

export default PfOverlay;
