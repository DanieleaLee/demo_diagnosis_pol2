import {css} from "@emotion/react";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";
import media from "@styles/media";
import InputGroup from "@components/molecules/InputGroup";
import CheckBox from "@components/atoms/CheckBox";
import * as yup from "yup";
import Submit from "@components/atoms/Submit";
import{useYupValidation} from "src/lib/hooks/useYupValidation";
import {emailLoginYup, passwordYup} from "src/config/yup";
import {useLoadingCallback} from "src/lib/hooks/useLoadingCallback";
import {reqUsersCreate} from "src/api/users";
import {useRouter} from "next/router";
import {useState} from "react";
import ErrorBlock from "@components/molecules/ErrorBlock";
import {ErrorCode} from "@modules/Amplify/errors";

export type RegisterProps = {redirect?: string};


export type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
  tou: boolean;
}

const registerValidationSchema : yup.SchemaOf<SignupData> = yup.object({
  firstName: yup.string()
    .matches(/[a-zA-Z-]+$/g,"\"First Name\" may only contain letters.")
    .required("\"First Name\" is a required field."),

  lastName: yup.string()
    .matches(/[a-zA-Z-]+$/g,"\"Last Name\" may only contain letters.")
    .required("\"Last Name\" is a required field."),

  email: emailLoginYup,

  company: yup.string()
    .required("\"Company\" is a required field."),

  password: passwordYup,

  confirmPassword: yup.string()
    .required("Confirm your password.")
    .oneOf([yup.ref('password')],"Please check your password."),
  tou: yup.boolean()
    .test(v=>v)
});

export const registerContainerWrap = css`
  max-width: 701px;
  margin: 0 auto;
  padding: 6.75rem 1.5rem 0 1.5rem;

  ${media.medium} {
    width: 60%;
    padding-top: 2rem;
  }
  & > div {
      margin-top: 1rem;
  }
  & > form > div {
      margin-bottom: 0.5rem;
  }
`;

const RegisterTemplate = ({redirect}: RegisterProps)=>{

  const router = useRouter();
  const [error, setError] = useState("");

  const {
    control,
    formState:{errors},
    getValues,
    handleSubmit,
    register
  } = useYupValidation(registerValidationSchema);

  const {callback, isLoading} = useLoadingCallback(async (data: SignupData)=>{
    try{
      const resp = await reqUsersCreate(data);
      if (!!resp.success){
        await router.replace(redirect || `/register/verify?email=${getValues('email')}`);
      }else{


        const errorMsg = resp.err.code === ErrorCode.UsernameExistsException?
          "A user with this email address alreay exists"
          :
          resp.err.name;

        setError(errorMsg);
      }
    }
    catch{
      alert('Error on Signup. Please Try again.');
      await router.replace(redirect || `/register`);
    }

  },[]);

  return(
      <div css={registerContainerWrap}>

        <div css={css`text-align: center; padding-bottom: 30px;`}>
          <Typography.Headline3>Sign Up for an Account</Typography.Headline3>
          <Typography.Subtitle3><b>{"Let's get all set up so you can start creating your"}</b></Typography.Subtitle3>
          <Typography.Subtitle3><b>first onboarding experience</b></Typography.Subtitle3>
        </div>

        <form onSubmit={handleSubmit(callback)}>
          <div css={css `display: flex; width: 100%; align-items:stretch;`}>
            <InputGroup error={errors.firstName?.message} css={css`flex:1; margin-right:15px;`} placeholder={'First Name'} {...register('firstName')}/>
            <InputGroup error={errors.lastName?.message} css={css`flex:1;`} placeholder={'Last Name'} {...register('lastName')}/>
          </div>

          <InputGroup error={errors.email?.message} placeholder={'Email Address'} {...register('email')}/>
          <InputGroup error={errors.company?.message} placeholder={'Company'} {...register('company')}/>
          <InputGroup error={errors.password?.message} type='password' placeholder={'Password'} {...register('password')}/>
          <InputGroup error={errors.confirmPassword?.message} type='password' placeholder={'Confirm Password'} {...register('confirmPassword')}/>
          <CheckBox error={!!errors.tou} title={'I accept AI Studio\'s Terms & Contiditions'} name='tou' control={control}/>


          {error &&
            <ErrorBlock>
              {error}
            </ErrorBlock>
          }
          <Submit value={'Sign Up'}/>
        </form>
    </div>
  );
};

export default RegisterTemplate;