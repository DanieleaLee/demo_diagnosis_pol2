import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";
import React from "react";
import sessionStore from "src/config/session";
import BodyContainer from "@components/containers/BodyContainer";
import LoginTemplate from "@components/template/Login/LoginTemplate";
import * as Typography from "@styles/typography";
import {css} from "@emotion/react";

const Logout = () => {
  return(
    <BodyContainer header={true}>
      <div css={css`display: flex; flex-direction: column; justify-content:center; height:100%;`}>
        <Typography.Headline2 css={css`text-align:center`}>Logout successful</Typography.Headline2>
        <Typography.Subtitle2 css={css`text-align:center`}>{'You hav successfully logged out'}</Typography.Subtitle2>
      </div>
    </BodyContainer>
  );
};

/**
 * 로그아웃 처리
 *  1. sid 쿠키값 지우기
 *  2. user_token 쿠키값 지우기
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = parseCookies(context);
  const sessionId = cookie?.sid;
  if (sessionId) {
    const store = sessionStore();
    store.del(`sess:${sessionId}`);
  }
  destroyCookie(context, "sid");
  destroyCookie(context, "user_token");

  return {
    props: { },
  };
};

export default Logout;