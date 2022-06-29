import BodyContainer from "@components/containers/BodyContainer";
import {GetServerSideProps} from "next";
import {common} from "src/config/ssr";
import PortfolioLibTemplate from "@components/template/PortfolioLib";


const PortfolioLib = () => {
  return(
    <BodyContainer header={true} subHeader={true} appToolBox={false} maxWidth={'1600px'}>
      <PortfolioLibTemplate/>
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


export default PortfolioLib;
