export type MultiRangeSliderType = {
  min: number;
  max: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
};

export interface InputDynamicWidthProps
  extends React.HTMLProps<HTMLInputElement> {
  initialValue?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
