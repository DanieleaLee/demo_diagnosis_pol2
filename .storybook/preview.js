import "../src/styles/css/global.scss";
import * as nextImage from "next/image";
// import { addDecorator } from "@storybook/react";
// import { withThemesProvider } from "storybook-addon-emotion-theme";
import {ThemeProvider} from "@emotion/react";
import {defaultColor} from "../src/styles/colors";

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    return <img {...props} />;
  },
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const getAllThemes = () => {
  return [];
};

export const decorators = [
  (Story) => {

  const colorTheme = {
    colors: defaultColor,
  };

    return (
      <ThemeProvider theme={colorTheme}>
        <Story />
      </ThemeProvider>
    );
  }
];

// addDecorator(withThemesProvider());

