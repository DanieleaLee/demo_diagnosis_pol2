import { css } from "@emotion/react";
import { MAIN_HEADER_HEIGHT } from "src/config/constants/index";
import { safeMarginTop } from "@styles";
import IconList from "@alvinComponents/atoms/Icon";
import ProgressBarTechTree from "@alvinComponents/../../../molecules/ProgressBarTechTree";
import * as Typography from "@styles/typography";
import * as Balloon from "@alvinComponents/atoms/Balloon";
import { tagsDummy, memoContent } from "@alvinComponents/Dummy";

/**
 * Test Template 위 경로에서 각자 이름을 바꿔주면 됨
 *  "@alvinComponents/*": ["src/components/temp/alvin/*"],
 *  "@alvinComponents": ["src/components/temp/alvin"],
 *  "@lucianComponents/*": ["src/components/temp/lucian/*"],
 *  "@lucianComponents": ["src/components/temp/lucian"],
 *  "@taehyunComponents/*": ["src/components/temp/taehyun/*"],
 *  "@taehyunComponents": ["src/components/temp/taehyun"],
 */

const mainContainerWrap = css`
  ${safeMarginTop(MAIN_HEADER_HEIGHT)}
`;

const fontZip = {
  size: ["2.25rem", "2rem", "1.75rem", "1.5rem", "1.25rem", "1rem", "0.75rem"],
  fontWeight: ["800", "700", "600", "500", "400", "300", "200"],
};

const Template_Atoms = (props) => {
  return (
    <>
      <div
        className={"container-md"}
        css={[
          mainContainerWrap,
          css`
            margin-bottom: 100px;
          `,
        ]}
      >
        {/* {fontZip["size"].map((v, i) => {
          return fontZip["fontWeight"].map((k, j) => {
            return (
              <div key={j}>
                <Typography.Temp
                  fontFamilly={"Inter"}
                  fontSize={v}
                  fontWeight={k}
                >
                  Inter :: fontSize {v} :: fontWeight {k}
                </Typography.Temp>
              </div>
            );
          });
        })}

        <span>-------------------------------------------</span>
        {fontZip["size"].map((v, i) => {
          return fontZip["fontWeight"].map((k, j) => {
            return (
              <div key={j}>
                <Typography.Temp
                  fontFamilly={"Titillium Web"}
                  fontSize={v}
                  fontWeight={k}
                >
                  Titillium :: fontSize {v} :: fontWeight {k}
                </Typography.Temp>
              </div>
            );
          });
        })} */}

        <span>-------------------------------------------</span>
        {/* <Typography.Headline1 lineHeight={1} color={"red"}>
          Headline1! : // 700 40 Titillium
        </Typography.Headline1>
        <Typography.Headline2 lineHeight={1}>
          Headline1! : // 600 35 Titillium
        </Typography.Headline2>
        <Typography.Headline3 lineHeight={1}>
          Headline3! : // 600 25 Titillium
        </Typography.Headline3>
        <Typography.Headline3 lineHeight={1}>
          Headline3! : // 600 22 Titillium
        </Typography.Headline3>

        <Typography.Title1 lineHeight={1}>
          Title1! : // 700 18 Inter
        </Typography.Title1>
        <Typography.Title2 lineHeight={1}>
          Title2! : // 500 18 Inter
        </Typography.Title2>
        <Typography.Title3 lineHeight={1}>
          Title3! : // 600 18 Inter
        </Typography.Title3>
        <Typography.Title4 lineHeight={1}>
          Title4! : // 700 17 Titillium
        </Typography.Title4>
        <Typography.Title5 lineHeight={1}>
          Title5! : // 600 17 Inter
        </Typography.Title5>
        <Typography.Title6 lineHeight={1}>
          Title6! : // 700 17 Inter
        </Typography.Title6>

        <Typography.Subtitle1 lineHeight={1}>
          Subtitle1! : // 700 15 Inter
        </Typography.Subtitle1>
        <Typography.Subtitle2 lineHeight={1}>
          Subtitle2! : // 600 15 Inter
        </Typography.Subtitle2>
        <Typography.Subtitle3 lineHeight={1}>
          Subtitle3! : // 400 15 Inter
        </Typography.Subtitle3>
        <Typography.Subtitle4 lineHeight={1}>
          Subtitle4! : // 600 14 Inter
        </Typography.Subtitle4>

        <Typography.Body1 lineHeight={1}>
          Body1! : // 600 13 Titillium
        </Typography.Body1>
        <Typography.Body2 lineHeight={1}>
          Body2! : // 600 13 Inter
        </Typography.Body2>
        <Typography.Body3 lineHeight={1}>
          Body3! : // 500 12 Inter
        </Typography.Body3>
        <Typography.Body4 lineHeight={1}>
          Body4! : // 500 11 Inter
        </Typography.Body4>
        <Typography.Body5 lineHeight={1}>
          Body5! : // 400 10 Inter
        </Typography.Body5> */}

        <IconList name={"all"} size={22} color={"black"} />
        <ProgressBarTechTree label={"포켓몬"} currentPercent={60} />
        <span>{`<Balloon.Box width={100} height={100} arrowPosition={'left'} arrowAlign={'end'}>hi</Balloon.Box>`}</span>
        <Balloon.Box
          width={100}
          height={100}
          arrowPosition={"left"}
          arrowAlign={"end"}
        >
          hi
        </Balloon.Box>
        <span>{`<Balloon.Memo width={200} height={300} title={'타이틀'} tags={[...tagsDummy]}>{memoContent}</Balloon.Memo>`}</span>
        <Balloon.Memo
          width={200}
          height={300}
          title={"타이틀"}
          tags={[...tagsDummy]}
        >
          {memoContent}
        </Balloon.Memo>
      </div>
    </>
  );
};

export default Template_Atoms;
