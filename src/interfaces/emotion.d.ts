// declare module "@emotion/core";
import "@emotion/react";
import { ThemeColors } from "@styles/colors";
import { LibTheme } from "some-lib";

declare module "@emotion/react" {
  export interface Theme {
    colors: ThemeColors;
  }
}

declare module "@emotion/react" {
  export interface Theme extends LibTheme {}
}
