import { css, Theme } from "@emotion/react";
import * as Typography from "@styles/typography";

const subheaderWrap = (theme: Theme) => css`
  background-color: ${theme.colors.backgroundAccent2};
  color: black;
  padding: 15px 0 15px 0;
  padding-left: 40px; // 0512
`;

const navWrap = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  & > a, div {
    width: 11rem;
    text-align: center;
  }
`;

const SubHeader = () => {

  return (
    <div css={subheaderWrap}>
      <nav css={navWrap}>
        <Typography.Subtitle2 css={css`color: white;`}>{'Portfolio Diagnosis & Overlay'}</Typography.Subtitle2>
      </nav>


    </div>
  );
};

export default SubHeader;