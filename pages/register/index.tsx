import BodyContainer from "@components/containers/BodyContainer";
import RegisterTemplate, {RegisterProps} from "@components/template/RegisterTemplate";
import {GetServerSideProps} from "next";
import {common} from "src/config/ssr";


const Register = (props:RegisterProps) => {

  return(
    <BodyContainer header={true}>
      <RegisterTemplate {...props}/>
    </BodyContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseProps = await common(context);

  if (baseProps.user){
    return {
      redirect: {
        permananet: false,
        destination: 'main'
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


export default Register;