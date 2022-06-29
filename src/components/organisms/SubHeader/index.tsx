import Link from "next/link";
import {css, Theme} from "@emotion/react";
import {flexRowBetween} from "@styles";
import * as Typography from "@styles/typography";


const subheaderWrap = (theme:Theme) => css`
  background-color: ${theme.colors.backgroundAccent2};
  color: black;
  padding: 15px 0 15px 0;
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

export const SUB_HEADER_HEIGHT = '54px';

const SubHeader = () => {

  return(
    <div css={subheaderWrap}>
      <nav css={navWrap}>

        <Link href={`#`}>
          <a>
            <Typography.Subtitle2 css={css`color: white;`}>{'ASSET ALLOCATION'}</Typography.Subtitle2>
          </a>
        </Link>
        <Link href={`#`}>
          <a>
            <Typography.Subtitle2 css={css`color: white;`}>{'PROJECT'}</Typography.Subtitle2>
          </a>
        </Link>
        <Link href={`#`}>
          <a>
            <Typography.Subtitle2 css={css`color: white;`}>{'HELP'}</Typography.Subtitle2>
          </a>
        </Link>
      </nav>


    </div>
  );
};

export default SubHeader;