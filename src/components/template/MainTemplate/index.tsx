import { css, useTheme } from "@emotion/react";
import { useCallback, useState } from "react";
import MainHeader from "../../organisms/MainHeader/index";
import React from "react";
import { MAIN_HEADER_HEIGHT } from "src/config/constants/index";
import { safeMarginTop } from "@styles";
import { useUserValue } from "@recoil/hooks/useUser";
import { GetServerSideProps, NextPage, NextPageContext } from "next";
import TestTemplate from "@tempComponents/v2/TestTemplate";

/**
 * Test Template 위 경로에서 각자 이름을 바꿔주면 됨
 *  "@alvinComponents/*": ["src/components/temp/alvin/*"],
 *  "@alvinComponents": ["src/components/temp/alvin"],
 *  "@lucianComponents/*": ["src/components/temp/lucian/*"],
 *  "@lucianComponents": ["src/components/temp/lucian"],
 *  "@taehyunComponents/*": ["src/components/temp/taehyun/*"],
 *  "@taehyunComponents": ["src/components/temp/taehyun"],
 */

const mainContainerWrap = css`
  ${safeMarginTop(MAIN_HEADER_HEIGHT)}
`;
const MainTemplate = (props) => {
  return (
    <>
      <MainHeader />
      <div className={"container-md"} css={mainContainerWrap}>
        <TestTemplate />
      </div>
    </>
  );
};

export default MainTemplate;
