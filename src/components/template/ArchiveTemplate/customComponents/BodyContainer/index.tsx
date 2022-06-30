import Router from "next/router";
import RootContainer from "@components/containers/RootContainer";
import Header from "@components/organisms/Header";
import React,{useEffect} from "react";
import { css } from "@emotion/react";
import { HEADER_HEIGHT, SUB_HEADER_HEIGHT, BODY_BUTTONS_HEIGHT } from "src/config/constants";
import Colors from "@styles/colors";
import { safePaddingBottom, safePaddingTop } from "@styles";
import SubHeader from "@components/organisms/SubHeader";
import AppToolBox from "@components/organisms/AppToolBox";


const bodyContainerWrap = (header?: boolean, subHeader?: boolean, appToolbox?: boolean) => css`
  width: 100%;
  height: calc(100vh - ${header ? HEADER_HEIGHT : "0px"} - ${header ? SUB_HEADER_HEIGHT : "0px"});
  ${safePaddingTop()}
  ${safePaddingBottom()}
  /* padding-left: 34px; // 0512 - 여백 조정
  padding-right: 34px; // 0512 - 여백 조정 */
  overflow-y: hidden;

  ${appToolbox && css`
    display:flex;
    justify-content: stretch;
  `}
`;

export const headerSafepaddingWrap = css`
  ${safePaddingTop(HEADER_HEIGHT)}
`;

export const bodyMainWrap = css`
  background-color:${Colors.backgroundPrimary1};
  height: calc(100% - ${BODY_BUTTONS_HEIGHT.split('px')[0]}px);
  padding: 0.5rem;
  overflow-y: scroll;
`;

interface Props {
  children: React.ReactNode;
  header?: boolean;
  subHeader?: boolean;
  appToolBox?: boolean;
  footerPaddingBottom?: string;
  showFooter?: boolean;
  maxWidth?: string;
  step?: number;
}

const BodyContainer = ({ children, ...props }: Props) => {

  const routerChange = () => {
    console.log('router change');
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', routerChange);
    return () => {
      Router.events.off('routeChangeStart', routerChange);
    }
  });

  return (
    <RootContainer>
      {props.header && <Header />}
      <div css={[props.header && headerSafepaddingWrap, css`background-color:${Colors.backgroundPrimary1};`]}>
        {props.subHeader && <SubHeader />}
        <div css={[bodyContainerWrap(props.header, props.subHeader, props.appToolBox)]}>
          {props.appToolBox && <AppToolBox />}
          {children}
        </div>

      </div>
    </RootContainer>
  );
};

export default BodyContainer;