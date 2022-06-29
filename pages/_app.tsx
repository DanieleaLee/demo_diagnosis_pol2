import '../styles/globals.css'
import { AppProps } from 'next/app';
import "@styles/css/global.scss";
import {useCallback} from "react";
import {RecoilRoot} from "recoil";
import {Atoms} from "@recoil/constants";
import "src/config/init";


function MyApp({ Component, pageProps }: AppProps) {

  const initializeState = useCallback(async({set}) => {
    set({key: Atoms.User}, pageProps.user);
  }, []);

  return (
    <RecoilRoot initializeState={initializeState}>
      <Component {...pageProps}/>
    </RecoilRoot>
  );
}

export default MyApp
