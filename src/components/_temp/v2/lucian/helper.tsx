import path from "path";
import { css } from "@emotion/react";

export const makeStorybookTitle = (
  userName: string,
  componentType: string,
  folderName?: string,
  componentName: string
): string => {
  const storyBookTitle = path.join(
    userName,
    componentType,
    folderName,
    componentName
  );
  return storyBookTitle;
};

export const obc = (colorZip) => {
  // const selectedNum = Math.round(colorZip.length/5*_num)
  const selectedCol = [String(colorZip), "!important"].join("");
  return css`
    border: 1px solid ${selectedCol};
  `;
};
