import {css, Theme, useTheme} from "@emotion/react";
import media from "@styles/media";
import * as Typography from "@styles/typography";
import InputGroup from "@components/molecules/InputGroup";
import * as yup from "yup";
import {emailLoginYup} from "src/config/yup";
import {useYupValidation} from "src/lib/hooks/useYupValidation";
import {useLoadingCallback} from "src/lib/hooks/useLoadingCallback";
import Submit from "@components/atoms/Submit";
import {reqUsersLogin} from "src/api/users";
import {useUser} from "@recoil/hooks/useUser";
import {useRouter} from "next/router";
import {LOCAL_STORAGE} from "src/config/constants";
import {useLocalStorage} from "react-use";
import CheckBox, {useCheckBox} from "@components/atoms/CheckBox";
import Link from "next/link";
import {BsXCircleFill} from "react-icons/bs";
import {backgroundWrap} from "@styles/common";
import {useEffect, useState} from "react";
import {ErrorCode} from "@modules/Amplify/errors";

export type LoginPageParams = { email?: string; redirect?: string };



export type LoginData = {
  email: string,
  password: string;
};

const loginValidationSchema : yup.SchemaOf< LoginData > = yup.object({
  email: emailLoginYup,
  password: yup.string().required("\"Password\" is a required field."),
});

export const loginContainerWrap = css`
  max-width: 701px;
  margin: 0 auto;
  padding: 6.75rem 1.5rem 0 1.5rem;

  ${media.medium} {
    padding-top: 2rem;
  }
  & > div {
      margin-top: 1rem;
  }
  & > form > div {
      margin-bottom: 0.5rem;
  }
`;

const loginFailure = (theme:Theme) =>
  css`
    display: flex;
    height: 56px;
    border-radius: 4px;
    background-color: ${theme.colors.backgroundError};
    padding: 1rem;
    margin-bottom: 0.5rem;
    & p {
      color: ${theme.colors.error};
    }
  `;

const LoginTemplate = ({email: fromEmail, redirect}: LoginPageParams)=>{


  const router = useRouter();
  const theme = useTheme();
  const {setUser} = useUser();
  const [em, setLoginEmail] = useLocalStorage<string>(LOCAL_STORAGE.LOGIN_EMAIL);
  const [loginFailed, setLoginFailed] = useState("");

  useEffect(()=>{
    const {email} = router.query;
    if(!!email)
      setLoginEmail(email.toString());
  },[]);

  const {
    getValues,
    formState:{errors},
    handleSubmit,
    register
  } = useYupValidation<LoginData>(loginValidationSchema);

  useEffect(()=>{
    setLoginFailed(null);
  }, [getValues('email'), getValues('password')]);



  const {callback, isLoading} = useLoadingCallback(async(data: LoginData)=>{

    try{
      const user = await reqUsersLogin(data);
      await setUser(user);
      setLoginEmail(user.email);
      await router.replace(redirect || '/portfoliolib');
    }
    catch(err){
      if (err.code === ErrorCode.NotAuthorizedException)
      {

        if (err.msg === "Incorrect Username or password.")
          setLoginFailed("\"Email\" or \"Password\" is invalid");
        else
          setLoginFailed(err.msg);

      }
      else if(err.code === ErrorCode.UserNotConfirmedException)
      {
        await router.replace(`/register/verify?email=${data.email}`)
      }
      else //
      {
        setLoginFailed(err.msg);
      }
    }

  },[]);


  return(
    <div css={backgroundWrap}>
      <div css={loginContainerWrap}>

        <div css={css`text-align: center; padding-bottom: 30px;`}>
          <Typography.Headline3>Welcome To AI STUDIO</Typography.Headline3>
          <Typography.Subtitle3><b>We make it easy for everyone to invest with ai</b></Typography.Subtitle3>
        </div>


        {loginFailed &&
          <div css={loginFailure}>
            <div css={css`margin: 0px 10px 0 0;`}>
              <BsXCircleFill color={theme.colors.error} />
            </div>
            <Typography.Headline6>
              {loginFailed}
            </Typography.Headline6>
          </div>
        }

        <form onSubmit={handleSubmit(callback)}>
          <InputGroup placeholder = 'Email' error={errors.email?.message}{...register('email')} defaultValue={em || ''}/>
          <InputGroup type='password' placeholder = 'Password' error={errors.password?.message} {...register('password')}/>


          <div css={css`display: flex; padding-bottom: 30px;`}>
            <CheckBox {...useCheckBox(false)}/>
            <div css={css`padding: 5px;`}>
              <Typography.Subtitle3>Remember Me</Typography.Subtitle3>
            </div>

            <div css={css`margin-left: auto`}>
              <Link href={"#"}>
                <a>
                  <Typography.Subtitle3>{'Forgotten Password'}</Typography.Subtitle3>
                </a>
              </Link>
            </div>
          </div>

          <Submit value={'Continue'} loading={isLoading}/>

        </form>

        <div css={css`text-align: center;`}>
          <Typography.Subtitle3>
              {"Don't have an account?  "}
            <Link href={"/register"}>
              <a>
                <b>Create one here.</b>
              </a>
            </Link>
          </Typography.Subtitle3>
        </div>

      </div>
    </div>
  );
};

export default LoginTemplate;