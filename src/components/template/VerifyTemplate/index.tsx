import {backgroundWrap} from "@styles/common";
import {css, Theme} from "@emotion/react";
import * as Typography from "@styles/typography";
import DigitInputGroup, {useDigitInputGroup} from "@components/molecules/DigitInputGroup";
import Buttonable from "@components/atoms/Buttonable";
import Submit from "@components/atoms/Submit";
import Link from "next/link";
import {LegacyRef, useRef, useState, useCallback, RefObject} from "react";
import {BsXCircleFill} from "react-icons/bs";
import Colors from "@styles/colors";
import {reqVerify} from "src/api/verify";
import {useRouter} from "next/router";
import PromptContainer from "@components/containers/PromptContainer";


export type VerifyData = {
  email: string;
  vCode: string;
}

export type VerifyPageParams= {
  email: string;
  redirect: string;
}


const verifyFailure = (theme:Theme) =>
  css`
    display: flex;
    width: 100%;
    border-radius: 4px;
    background-color: ${theme.colors.backgroundError};
    padding: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    & p {
      color: ${theme.colors.error};
    }
  `;

const verifyFormStyle = css`
  display: flex;
  flex-direction: column;
  align-items:center;
`;

const VerifyTemplate = ({email, redirect}: VerifyPageParams) => {

  const router = useRouter();

  const [verifyFailed, setVerifyFailed] = useState(false);
  const [loading, setLoading] = useState(false);


  const completeFocus : RefObject<HTMLInputElement> = useRef(null);
  const {digits:vCode, nodes}  = useDigitInputGroup(6, completeFocus);

  const onSubmit = useCallback( async (e)=>{
    /**
     * Mocked action.
     * */
    e.preventDefault();

    const resp = await reqVerify({email, vCode});

    if(resp.success){
      await router.replace(redirect || `/register/success?email=${email}`);
    }
    else{
      setVerifyFailed(true);
    }
  }, [vCode]);

  console.log(vCode);
  return(
    <PromptContainer>

        <Typography.Headline3 >
          Enter your verification code
        </Typography.Headline3>

        <Typography.Subtitle2>
          We send a verification code to:<br/>
          <b css={css`color: black;`}>{email}</b>
        </Typography.Subtitle2>


        <Typography.Subtitle2 css={css`margin: 1rem;`}>
          Please enter the verification code you received
        </Typography.Subtitle2>

        <form css={verifyFormStyle} onSubmit={onSubmit}>
          <DigitInputGroup>
            {nodes}
          </DigitInputGroup>

          <Buttonable containerCss={css`color: #5DBDFF; margin-top: 10px;`} onClick={()=>{}}>
            Resend code
          </Buttonable>

          {verifyFailed &&
            <div css={verifyFailure}>
              <div css={css`margin: 0px 10px 0 0;`}>
                <BsXCircleFill color={Colors.error} />
              </div>
              <Typography.Headline6>
                <b>{"Your verification code is invalid"}</b>
              </Typography.Headline6>
            </div>
          }

          <Submit containerCss={css`margin-top: 0.5rem; width:106px; border-radius: 8px;`} value={'Submit'}
            fwdRef={completeFocus} loading={loading} />
        </form>


        <Typography.Subtitle3 css={css`margin-top: 1.5rem;`}>
          <Link href={"#"}>
              {'Log in'}
          </Link>
          / Need help?
          <Link href={"#"}>
            {'Contact Us'}
          </Link>


        </Typography.Subtitle3>

    </PromptContainer>
  );
};

export default VerifyTemplate;
