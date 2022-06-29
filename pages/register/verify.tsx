import { GetServerSideProps } from "next";
import VerifyTemplate, {VerifyPageParams} from "@components/template/VerifyTemplate";
import BodyContainer from "@components/containers/BodyContainer";
import { compact } from "src/lib/util";

const Verify = (props: VerifyPageParams) => {
  return(
    <BodyContainer header={true}>
      <VerifyTemplate {...props}/>
    </BodyContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { email, redirect } = context.query;
  console.log(compact({email}));
  return { props: compact({ email, redirect }) };
};

export default Verify;
