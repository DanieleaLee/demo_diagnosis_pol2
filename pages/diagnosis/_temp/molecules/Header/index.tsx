import Link from "next/link";
import { useRouter } from "next/router";
import { css, Theme, useTheme } from "@emotion/react";
import { flexRowBetween, flexRow, popupShadowStyle, zIndex } from "@styles";
import Logo from "@components/atoms/Logo";
import { LogoWidth } from "@components/atoms/Logo";
import TextLink from "@components/atoms/TextLink";
import TextButton from "@components/atoms/TextButton";
import * as Typography from "@styles/typography";
import { useUser, useUserValue } from "@recoil/hooks/useUser";
import { useCallback } from "react";
import { reqUsersLogout } from "src/api/users";
import { bl } from "../../helper"; // 0512
import { HEADER_HEIGHT } from "../../config/constants";// 0512

const headerContainerWrap = css`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${zIndex.header};
`;

const headerWrap = (theme: Theme) => css`
  background-color: white;
  color: black;
  ${flexRowBetween}
  /* padding: 5px 0 5px 0; */
  padding-left: 32px; // 0512
  height: ${HEADER_HEIGHT}; // 0512
`;

const logoWrap = css`
  flex-basis: ${LogoWidth + 100}px;
  /* margin-top: 0.5rem; */
  margin-top: 1.7rem; // 0512
  ${flexRow}
`;

const navWrap = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px; // 0512
  margin-right: 2%; // 0512

  & > a,
  div {
    /* width: 11rem; */
    /* width: 7rem; */
    /* width: 7%; */
    min-width: 4rem;
    padding-left: 17px;
    padding-right: 17px;
    text-align: center;
  }
`;

const dropdownMenuWrap = css`
  cursor: pointer;
  &:hover {
    > div {
      display: block;
    }
  }
`;

const dropdownBodyWrap = (theme: any) => css`
  position: absolute;
  display: none; // none;
  padding-top: 1.25rem;
  /* width: 100%; */

  & > div {
    padding: 1.25rem 1.5rem 1.5rem 1.5rem;
    ${popupShadowStyle};
    /* background-color: ${theme.colors.backgroundPrimary1}; */
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
  }
`;

const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const basePath = router.pathname;

  const user = useUserValue();
  const { logout } = useUser();

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
    <header css={[headerContainerWrap]}>
      <div css={[headerWrap(theme as any), bl("#fff")]}>
        <div css={[logoWrap, bl("#fff")]}>
          <Logo href={"/diagnosis"} />
        </div>

        {/** Navigation Bar */}
        <nav css={[navWrap, bl("#fff")]}>
          <div css={dropdownMenuWrap}>
            <Typography.Subtitle2
              css={css`
                color: black;
              `}
            >
              {"Solution"}
            </Typography.Subtitle2>
{/* 0512
            <div css={dropdownBodyWrap}>
              <div>
                <ul>
                  <li>
                    <TextLink
                      color="black"
                      href={"/solution/aiportfolio"}
                      title={"AI Portfolio"}
                    />
                  </li>
                  <li>
                    <TextLink
                      color="black"
                      href={"/solution/portfolio_diag"}
                      title={"Portfolio 진단"}
                    />
                  </li>
                  <li>
                    <TextLink
                      color="black"
                      href={"/solution/direct_indexing"}
                      title={"Direct Indexing"}
                    />
                  </li>
                  <li>
                    <TextLink
                      color="black"
                      href={"/solution/order_exec"}
                      title={"Order Execution"}
                    />
                  </li>
                </ul>
              </div>
            </div> */}
          </div>

          <Link href={`/pricing`}>
            <a>
              <Typography.Subtitle2
                css={css`
                  color: black;
                `}
              >
                {"Pricing"}
              </Typography.Subtitle2>
            </a>
          </Link>

          {!user && (
            <Link href={`/login`} data-test={"test-login-button"}>
              <a>
                {/* <div data-test="test-login-button" /> */}
                <Typography.Subtitle2
                  css={css`
                    color: ${theme.colors.accent2};
                  `}
                >
                  Login
                </Typography.Subtitle2>
              </a>
            </Link>
          )}
        </nav>

        {/** User Status Bar*/}
        <nav>
          {user && (
            <div css={userStatusWrap}>
              <Typography.Subtitle2
                css={css`
                  color: black;
                  text-align: center;
                `}
              >
                {user.first_name}
              </Typography.Subtitle2>

              <div css={dropdownBodyWrap}>
                <div>
                  <ul>
                    <li>
                      <TextLink color="black" href={"#"} title={"Settings"} />
                    </li>
                    <li>
                      <TextButton
                        tabIndex={-1}
                        title={"Log Out"}
                        color={"black"}
                        onClick={onClickLogout}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
