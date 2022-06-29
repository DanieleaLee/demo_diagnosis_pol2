import BodyContainer from "@components/containers/BodyContainer";
import LoginTemplate from "@components/template/Login/LoginTemplate";
import {LoginPageParams} from "@components/template/Login/LoginTemplate";
import {GetServerSideProps} from "next";
import {common} from "src/config/ssr";


const Login = (props: LoginPageParams) => {

  return(
    <BodyContainer header={true}>
      <LoginTemplate {...props}/>
    </BodyContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseProps = await common(context);


  // 로그인 되어 있으면 main 화면으로 이동.
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


export default Login;