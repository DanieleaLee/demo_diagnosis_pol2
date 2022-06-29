import Link from "next/link";
import { useRouter } from "next/router";
import { css, Theme, useTheme } from "@emotion/react";
import {flexRowBetween, flexRow, popupShadowStyle, zIndex} from "@styles";
import Logo from "@components/atoms/Logo";
import {LogoWidth} from "@components/atoms/Logo";
import TextLink from "@components/atoms/TextLink";
import TextButton from "@components/atoms/TextButton";
import * as Typography from "@styles/typography";
import {useUser, useUserValue} from "@recoil/hooks/useUser";
import {useCallback} from "react";
import {reqUsersLogout} from "src/api/users";

const headerContainerWrap = css`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${zIndex.header};
`;

const headerWrap = (theme:Theme) => css`
  background-color: white;
  color: black;
  ${flexRowBetween}
  padding: 5px 0 5px 0;
`;


const logoWrap = css`
  flex-basis: ${LogoWidth+100}px;
  margin-top: 0.5rem;
  ${flexRow}
`;

const navWrap = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  & > a, div {
    width: 11rem;
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
  display: none; // none;
  padding-top: 1.25rem;
  width: 100%;
  
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

export const userStatusWrap = css`
  padding-left: 2rem;
  width: 200px;
  cursor: pointer;
  &:hover {
      > div {
        display: block;
      }
  };
`;


const Header = ()=>{

  const theme = useTheme();
  const router = useRouter();
  const basePath = router.pathname;

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


  return(
    <header css={headerContainerWrap}>
      <div css={headerWrap}>

        <div css={logoWrap}>
          <Logo href={'/'}/>
        </div>

        {/** Navigation Bar */}
        <nav css={navWrap}>

            <div css={dropdownMenuWrap}>
              <Typography.Subtitle2 css={css`color: black;`}>
                {"Solution"}
              </Typography.Subtitle2>

              <div css={dropdownBodyWrap}>
                <div>
                  <ul>
                    <li>
                      <TextLink color='black' href={'/solution/aiportfolio'} title={"AI Portfolio"}/>
                    </li>
                    <li>
                      <TextLink color='black' href={'/solution/portfolio_diag'} title={"Portfolio 진단"}/>
                    </li>
                    <li>
                      <TextLink color='black' href={'/solution/direct_indexing'} title={"Direct Indexing"}/>
                    </li>
                    <li>
                      <TextLink color='black' href={'/solution/order_exec'} title={"Order Execution"}/>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href={`/pricing`}>
              <a>
                <Typography.Subtitle2 css={css`color: black;`}>{'Pricing'}</Typography.Subtitle2>
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
        </nav>

        {/** User Status Bar*/}
        <nav>
          {user &&
            <div css={userStatusWrap}>
              <Typography.Subtitle2 css={css`color: black; text-align: center;`}>
                {user.first_name}
              </Typography.Subtitle2>



              <div css={dropdownBodyWrap}>
                <div>
                  <ul>
                    <li>
                      <TextLink color='black' href={'#'} title={"Settings"}/>
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


export default Header;