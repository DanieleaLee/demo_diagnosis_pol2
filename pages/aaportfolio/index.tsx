import {GetServerSideProps} from "next";
import {common} from "src/config/ssr";
import BodyContainer from "@components/containers/BodyContainer";
import AAPortfolioPipelineTemplate, {AAPortfolioPipelinePageProps} from "@components/template/AAPortfolioPipelineTemplate";


const PortfolioLib = (props:AAPortfolioPipelinePageProps) => {
  return(
    <BodyContainer header={true} subHeader={true} appToolBox={false} maxWidth={'100%'}>
      <AAPortfolioPipelineTemplate {...props}/>
    </BodyContainer>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseProps = await common(context);

  const {query:{pid}} = context;

  const {
      name: portfolioName,
      process_step:initialStep,
      ..._
  } = await new Promise((resolve, reject) => {
    setInterval(()=>{
      resolve({
        id: "006e38d2-52bd-46bb-9e90-78d80bd96a9c",
        owner: "f089c09a-c9ae-4bbe-80c9-6913f0cafedc",
        name: "new ports",
        note: null,
        process_step: "investment_universe",
        last_update: 1649827030433,
        created_time: 1649827030433
      });
    }, 100);

  });

  return {
    props: {
      ...baseProps,
      portfolioName,
      initialStep,
    },
  };
};


export default PortfolioLib;