import PromptContainer from "@components/containers/PromptContainer";
import {WelcomePageParams} from "@pages/register/success";
import * as Typography from "@styles/typography";
import Buttonable from "@components/atoms/Buttonable";
import {css} from "@emotion/react";
import Colors from "@styles/colors";
import {useRouter} from "next/router";
import {useCallback} from "react";

const LoginButtonStyle = css`
  background-color: ${Colors.button1};
  width: 106px;
  height: 46px;
  border-radius: 8px;
  margin-top: 20px;
  color: white;
  text-align: center;
`;


const emailFontStyle = css`
  font-family: Inter;
  font-size: 17px;
`;

const WelcomeTemplate = ({email}:WelcomePageParams) => {

  const router = useRouter();

  const onClickLogin = useCallback(async()=>{
    await router.replace(`/login?email=${email}`)
  }, []);


  return (
    <PromptContainer>
      <Typography.Headline2>
        Welcome!
      </Typography.Headline2>


      <Typography.Subtitle2>
        Your verification process has completed.
      </Typography.Subtitle2>

      <Typography.Subtitle2 css={css`margin-top: 20px;`}>
        Please log in with your email address
      </Typography.Subtitle2>

      <b css={emailFontStyle}>{email}</b>

      <div>
        <Buttonable containerCss={LoginButtonStyle} onClick={onClickLogin}>
          Log in
        </Buttonable>
      </div>

    </PromptContainer>
  );
};



export default WelcomeTemplate;