import BodyContainer from "@components/containers/BodyContainer";
import WelcomeTemplate from "@components/template/WelcomeTemplate";
import {GetServerSideProps} from "next";
import {compact} from "src/lib/util";

export type WelcomePageParams = {
  email: string;
}

const RegisterSuccess = (props:WelcomePageParams) => {
  return (
    <BodyContainer header={true}>
      <WelcomeTemplate {...props}/>
    </BodyContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { email, redirect } = context.query;
  return { props: compact({ email, redirect }) };
};

export default RegisterSuccess;