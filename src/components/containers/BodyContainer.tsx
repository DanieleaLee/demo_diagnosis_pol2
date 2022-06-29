import Router from "next/router";
import {useEffect} from "react";
import RootContainer from "@components/containers/RootContainer";
import Header from "@components/organisms/Header";
import React from "react";
import {css} from "@emotion/react";
import {HEADER_HEIGHT} from "src/config/constants";
import Colors from "@styles/colors"
import {
  safePaddingBottom,
  safePaddingTop,
} from "@styles";
import SubHeader, {SUB_HEADER_HEIGHT} from "@components/organisms/SubHeader";
import AppToolBox from "@components/organisms/AppToolBox";


const bodyContainerWrap = (header?: boolean, subHeader?: boolean, appToolbox?: boolean) => css`
  width: 100%;
  height: calc(100vh - ${header ? HEADER_HEIGHT : "0px"} - ${header ? SUB_HEADER_HEIGHT : "0px"});
  ${safePaddingTop()}
  ${safePaddingBottom()}

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
  height:100%;
  padding: 0.5rem;
  overflow: scroll;
  
  -ms-overflow-style:none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display:none;
  }
`;

interface Props {
  children: React.ReactNode;
  header?: boolean;
  subHeader?: boolean;
  appToolBox?: boolean;
  footerPaddingBottom?: string;
  showFooter?: boolean;
  maxWidth?: string;
}

const BodyContainer = ({children, ...props}: Props) => {

  const routerChange = ()=>{
    console.log('router change');
  };

  useEffect(()=>{
    Router.events.on('routeChangeStart', routerChange);
    return ()=>{
      Router.events.off('routeChangeStart', routerChange);
    }
  });

  return (
    <RootContainer>
      {props.header && <Header/>}
      <div css={[props.header && headerSafepaddingWrap, css`background-color:${Colors.backgroundPrimary1}`]}>
        {props.subHeader && <SubHeader/>}
        <div css={bodyContainerWrap(props.header, props.subHeader, props.appToolBox)}>
          {props.appToolBox && <AppToolBox/> }
          {/*<div css={css`flex:1; padding: 0.5rem;`} className={props.header? "container-md":"container"}>*/}
            <main className={'container-xl'} css={[bodyMainWrap, props.maxWidth && css`max-width:${props.maxWidth}`]}>
              {children}
            </main>
          {/*</div>*/}
        </div>

      </div>
    </RootContainer>
  );
};

export default BodyContainer;