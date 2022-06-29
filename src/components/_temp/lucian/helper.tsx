import path from "path";

export const makeStorybookTitle = (
  userName: string,
  componentType: string,
  folderName?: string,
  componentName?: string
): string => {
  const storyBookTitle = path.join(
    userName,
    componentType,
    folderName,
    componentName
  );
  return storyBookTitle;
};