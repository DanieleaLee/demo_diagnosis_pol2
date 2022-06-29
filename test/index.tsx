import { render as baseRender, RenderOptions, RenderResult } from "@testing-library/react";
import React, { ReactElement } from "react";
import { ThemeProvider } from "@emotion/react";
import { defaultColor } from "@styles/colors";

/**
 * Custom renderer example with @testing-library/react
 * You can customize it to your needs.
 *
 * To learn more about customizing renderer,
 * please visit https://testing-library.com/docs/react-testing-library/setup
 */

export const AllTheProviders = ({ children }) => {

  const colorTheme = {
    colors: defaultColor,
  };

  return (
    <>
      <ThemeProvider theme={colorTheme}>
        {children}
      </ThemeProvider>
    </>
  );
};

const render = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) =>
  baseRender(ui, { wrapper: AllTheProviders, ...options }) as RenderResult;

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };