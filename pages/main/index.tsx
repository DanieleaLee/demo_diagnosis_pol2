import BodyContainer from "@components/containers/BodyContainer";
import {GetServerSideProps, NextApiResponse} from "next";
import { common } from "src/config/ssr";
import {css} from "@emotion/react";

const Main = () => {
  return (
    <BodyContainer header={true} subHeader={true} appToolBox={true} >

      <div css={css` background-color: blue; height: 3000px; `}>
        user main page
      </div>

    </BodyContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseProps = await common(context);

  if (!Object.keys(baseProps).includes('user')){
    return {
      redirect: {
        permananet: false,
        destination: 'login'
      },
      props:{}
    };
  }

  return {
    props: {
      ...baseProps,
    },
  };
};

export default Main;