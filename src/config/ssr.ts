import { NextApiRequestWithSession } from "@interfaces/model";
import {GetServerSidePropsContext, NextApiResponse} from "next";
import { destroyCookie, parseCookies } from "nookies";
import client from "src/api/client";
import { reqUsersMeSsr } from "src/api/users";
import sessionStore from "src/config/session";
import { compact } from "src/lib/util";
import {serialize} from "cookie";

/**
 * 모든 페이지에서 SSR 해야 하는 기본
 *  1. 쿠키에 오는 Flash 처리
 *  2. 유저 세션 처리
 *  3. 언어 파일 public/locales 폴더에 있는 json 언어 파일을 SSR 한다.
 *  해당 내용을 init 에 넣으면 에러 발생
 */
export const common = async (
  context: GetServerSidePropsContext,
) => {
  const req = context.req as NextApiRequestWithSession;
  const cookie = parseCookies(context);

  req.session = {};
  let sessionId = cookie?.sid;
  const store = sessionStore();
  if (sessionId) {
    // 레디스에서 세션키로 유저정보 가져온다.
    console.log('get userinfo from sessionId', sessionId);
    req.session.user = await store.get(`sess:${sessionId}`);

    if (!req.session.user)
      console.error(`Unknown sid, ${sessionId}`);
  }


  if (cookie?.user_token && !req.session?.user) {
    // client web 에서 요청해온 헤더를 SSR Rails API 로 그대로 전달한다.
    client.defaults.headers["accept-language"] = req.headers["accept-language"];
    client.defaults.headers["user-agent"] = req.headers["user-agent"];
    client.defaults.headers["Authorization"] = 'auth';
    // 쿠키 정보를 전달해야 인증이 된다.
    client.defaults.headers.Cookie = req.headers.cookie;
    const user = await reqUsersMeSsr();

    sessionId = Buffer.from(JSON.stringify(user)).toString("base64");

    req.session.user = user;
    context.res.setHeader('Set-Cookie', serialize('sid', sessionId, { path: '/', maxAge: 3600, httpOnly:true, secure:true  }));

    // 레디스에 저장
    store.set(`sess:${sessionId}`, user);
    // @CHECK usersMe 에서 오는 Set-Cookie 처리 안됨
    // 토큰 변경시에 싱크 해줘야 하나?
    // 성능 하향이 있고 따로 얻어지는 장점은 없음, 향후 토큰 변경되게 할때 고려

  }
  return compact({
    user: req.session?.user,
  });
};
