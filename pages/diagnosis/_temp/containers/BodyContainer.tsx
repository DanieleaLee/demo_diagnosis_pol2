import Router from "next/router";
import RootContainer from "@components/containers/RootContainer";
import Header from "../molecules/Header"; // 0512
// import Header from "@components/organisms/Header";
import React,{useEffect} from "react";
import { css } from "@emotion/react";
import { HEADER_HEIGHT, SUB_HEADER_HEIGHT, BODY_BUTTONS_HEIGHT } from "../config/constants";
import Colors from "@styles/colors";
import { safePaddingBottom, safePaddingTop } from "@styles";
import SubHeader from "../molecules/SubHeader"; // 0512
// import SubHeader, {SUB_HEADER_HEIGHT} from "@components/organisms/SubHeader";
import { bl } from "../helper"; // 0512
import AppToolBox from "@components/organisms/AppToolBox";
import PfTemplate from "../template/PfTemplate";


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
          
          {/*<div css={css`flex:1; padding: 0.5rem;`} className={props.header? "container-md":"container"}>*/}
            {/* {props.step == 1 && (
                  <div css={[css`height: ${BODY_BUTTONS_HEIGHT};`, bl('blue')]}>
                  <p>BBB</p>
                  <p>BBB</p>
                </div>
            )
            }

            <main className={'container-xl'} css={[bodyMainWrap, props.maxWidth && css`max-width:${props.maxWidth};`, bl('red')]}>
              {children}
            </main> */}
        </div>

      </div>
    </RootContainer>
  );
};

export default BodyContainer;