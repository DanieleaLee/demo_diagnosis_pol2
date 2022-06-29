import {ThemeProvider} from "@emotion/react";
import {defaultColor} from "@styles/colors";
import {GlobalStyles} from "@styles/globalStyles";
import React from "react";

interface Props {
  children: React.ReactNode
}
const RootContainer = ({children, ...props}: Props)=> {

  const colorTheme = {
    colors: defaultColor,
  };

  return(
    <ThemeProvider theme={colorTheme}>
      <GlobalStyles/>
      {children}
    </ThemeProvider>
  );
};

export default RootContainer;