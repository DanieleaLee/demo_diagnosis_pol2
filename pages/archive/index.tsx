import React from "react";
import { GetServerSideProps } from "next";
import { common } from "src/config/ssr";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { BODY_BUTTONS_HEIGHT } from "src/config/constants";
import BodyContainer from "@components/template/ArchiveTemplate/customComponents/BodyContainer";
import DiagnosisFullTemplate from "@components/template/DiagnosisFullTemplate";

export const bodyHeadWrap = css`
  height: ${BODY_BUTTONS_HEIGHT};
`;

// 전체 wrap red
export const bodyMainWrap = css`
  background-color: ${Colors.backgroundPrimary1};
  /* height: calc(100% - ${BODY_BUTTONS_HEIGHT.split("px")[0]}px); */
  height: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  overflow: hidden;
  /* border: 3px solid red; */
`;

const Archive = (props) => {

  return (
    <BodyContainer header={true} subHeader={true} appToolBox={false} maxWidth={"100%"}>
        <DiagnosisFullTemplate/>
    </BodyContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseProps = await common(context);
  return {
    props: {},
  };
};

export default Archive;
