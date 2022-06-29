import { adjustHue, darken, desaturate, lighten } from "polished";
import { compose } from "ramda";

export interface ThemeColors {
  primary1: string;
  primary2: string;
  primary3: string;
  primary4: string;
  primary5: string;
  primary6: string;
  primary7: string;

  accent1: string;
  accent2: string;

  semanticGraph1: string;
  semanticGraph2: string;
  semanticGraph3: string;

  backgroundWhite: string;
  backgroundPrimary1: string;
  backgroundAccent2: string;
  backgroundError: string;

  button1: string;
  button2: string;
  button3: string;

  hint: string;
  borderPrimary: string;
  divider: string;
  error: string;
  disabled: string;
}

const toPrimaryDark = compose(adjustHue(10), desaturate(0.31), lighten(0.05));
const toPrimaryLight = compose(adjustHue(0), desaturate(0.72), lighten(0.28));

const extraColors = {
  selectBoxBorder: "#9DA6AD",
  pass: "#43AC54",
  buttonSubmit: "#2F3B43",
  calendarDateHover: "#EFEFEF",
  calendarInnerContentsBorder: "#DADCDD",
  calendarTitle: "#5B6266",
  filterTagContainerBg: "#525F68",
  filtersText: "#B9C1C7",
  selectCategoryAmountBg: "#2F3B43",
  sliderTrackBg: "#DBDADA",
  rangePercentText: "#546A7B",
  rangeTitleText: "#919191",
  searchbarBorder: "#C3CCD2",
  checkboxContainer: "#4F4F4F",
  graphSecondTagBg: "#449EF2",
  graphThirdTagBg: "#4464D8",
  portfolioCloseBtnColor: "#C6C6C6",
  modelRunSummaryTextColor: "#20292F",
  modelRunDotColor: "#6B7479",
  portfolioTagBg: "#F2F2F2",
  diagnosisTextColor: "#838B8F",
  diagnosisSummaryBg: "#FDFDFD",
  diagnosisThemeTableBorder: "#9FADB7",
  diagnosisLayerArrowColor: "#C4C4C4",
  diagnosisLayerBoxColor: "#ED6565",
  diagnosisSidebarArrow: "#347BBC",
  overlayPerformanceTitle: "#AFB8BE",
  dropdownChevronColor: "#858585",
  overlaySimulateBtnColor: "#E1E3E6",
  overlayGraphTagColor: "#B0DEFF",
  overlayBalloonBg: "#0E1616",
  overlaySidebarActiveBg: "#F9F9F9",
  overlaySidebarActiveTxt:"#3478BC",
  overlayHoldingsTableBorder:"#E5E5E5"
};

const makeColor = () => {
  return {
    ...extraColors,
    primary1: "#F3F7FA",
    primary2: "#546A78",
    primary3: "#4A5C66",
    primary4: "#5B6266",
    primary5: "#94A1A9",
    primary6: "#ECECEC",
    primary7: "#CECECE",

    accent1: "#07080A",
    accent2: "#2E3B43",

    semanticGraph1: "#0A79C1",
    semanticGraph2: "#CEE4F2",
    semanticGraph3: "#063C62",

    backgroundWhite: "#FFFFFF",
    backgroundPrimary1: "#F3F7FA",
    backgroundAccent2: "#2E3B43",
    backgroundError: "#FFE6E6",

    button1: "#2E3B43", // Accent2
    button2: "#546A78", // Primary2
    button3: "#FFFFFF", // White
    button1Disabled: "#ECECEC", // Accent2
    button2Disabled: "#ECECEC", // Primary2
    button3Disabled: "#FFFFFF", // White
    button1Text: "#FFFFFF",
    button2Text: "#FFFFFF",
    button3Text: "#546A78",
    button1DisabledText: "#B6B6B6",
    button2DisabledText: "#B6B6B6",
    button3DisabledText: "#ECECEC",

    hint: "#9DA6AD",
    borderPrimary: "#CED9E1",
    divider: "#CED9E1",
    error: "#D47878",
    disabled: "#ECECEC",
    disabled2: "#EEF2F5",
  };
};

export const defaultColor = makeColor();

export default { ...defaultColor };
