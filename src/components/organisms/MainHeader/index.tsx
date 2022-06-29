import {css, Theme, useTheme} from "@emotion/react";
import {zIndex, flexRowBetween, flexRow, popupShadowStyle} from "@styles";
import Link from "next/link";
import {useRouter} from "next/router";
import * as Typography from "@styles/typography";
import Logo, {LogoWidth} from "@components/atoms/Logo";
import TextLink from "@components/atoms/TextLink";
import React, {useCallback} from "react";
import {useUser, useUserValue} from "@recoil/hooks/useUser";
import {userStatusWrap} from "@components/organisms/Header";
import TextButton from "@components/atoms/TextButton";
import {reqUsersLogout} from "src/api/users";


const mainHeaderContainerWrap = css`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${zIndex.header};
`;

const headerWrap = (theme: Theme) => css`
  background-color: ${theme.colors.backgroundPrimary1};
  color: ${theme.colors.accent2};
  ${flexRowBetween}
  padding: 5px 0 5px 0;
`;

const logoWrap = css`
  flex-basis: ${LogoWidth+100}px;
  margin-top: 0.5rem;
  ${flexRow}
`;

const navWrap = css`
  flex:1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right:  0.5rem 0 0.5rem;
  
  
  & > a, div{
    width: 8rem;
    text-align: center;
  }
  
  
`;

const dropdownMenuWrap = css`
  cursor: pointer;
  &:hover {
      > div {
        display: block;
      }
  };
`;

const dropdownBodyWrap = (theme: Theme)=> css`
  position: absolute;
  display: none;
  padding-top: 0.7rem;
  & > div {
    padding: 1.25rem 1.5rem 1.5rem 1.5rem;
    ${popupShadowStyle};
    background-color: ${theme.colors.backgroundPrimary1};
    width: 100%;
  }

  ul > li:not(:first-of-type) {
    margin-top: 1.5rem;
  }
  ul > li p {
    line-height: 1.5;
  }
`;


const MainHeader = ()=>{

  const router = useRouter();
  const basePath = router.pathname;
  const theme = useTheme();

  const user = useUserValue();
  const {logout} = useUser();

  const onClickLogout = useCallback(async () => {
    try {
      await reqUsersLogout();
    } catch (e) {
      console.error(e);
    } finally {
      window.location.replace("/logout");
      logout();
    }
  }, [logout]);

  return (
    <header css={mainHeaderContainerWrap}>
      <div css={headerWrap}>

        <div css={logoWrap}>
          <Logo href={'/'}/>
        </div>

        <nav css={navWrap}>

          <div css={dropdownMenuWrap}>
            <Typography.Subtitle2 css={css`color:${theme.colors.accent2};`}>
              About AI Studio
            </Typography.Subtitle2>

            <div css={dropdownBodyWrap}>
              <div>
                <ul>
                  <li>
                    <TextLink color={theme.colors.accent2} onClick={()=>{}} href={'/clients'} title={'Clients'} />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Link href={`/pricing`}>
            <a>
              <Typography.Subtitle2 css={css`color:${theme.colors.accent2};`}>
                Pricing
              </Typography.Subtitle2>
            </a>
          </Link>

          {!user &&
          <Link href={`/login`} data-test={'test-login-button'}>
            <a>
              <div data-test="test-login-button"/>
              <Typography.Subtitle2 css={css`color:${theme.colors.accent2};`}>
                Login
              </Typography.Subtitle2>
            </a>
          </Link>
          }

          {user &&
          <div css={userStatusWrap}>
            <Typography.Subtitle2 css={css`color: black; text-align: center;`}>
              {user.first_name}
            </Typography.Subtitle2>



            <div css={dropdownBodyWrap}>
              <div>
                <ul>
                  <li>
                    <TextLink color='black' href={'/main'} title={"Console"}/>
                  </li>
                  <li>
                    <TextButton tabIndex={-1} title={"Log Out"} color={'black'} onClick={onClickLogout} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          }





        </nav>
      </div>
    </header>
  );
};

export default MainHeader;