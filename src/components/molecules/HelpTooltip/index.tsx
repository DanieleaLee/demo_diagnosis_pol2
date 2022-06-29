import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { BiHelpCircle } from 'react-icons/bi';
import * as Typography from '@styles/typography';

const HelpTooltipContainerCss = css`
  position: relative;
  display: inline-block;
  line-height: 1;
  // prettier-ignore
  & div {visibility: hidden;}
  &:hover {
    // prettier-ignore
    & div {visibility: visible;}
  }
`;

type HelpTooltipProps = {
  size: number;
  color?: string;
  containerCss?: SerializedStyles;
  tooltipBoxCss?: SerializedStyles;
  title?: string;
  description?: string;
};

/**
 * 
 * @property {number} size - HelpIcon size
 * @property {string} color - HelpIcon color
 * @property {css} containerCss - HelpIcon container style
 * @property {css} tooltipBoxCss - style to place the Tooltip
 * @property {string} title - Title inside tooltip
 * @property {string} description - Description inside tooltip
 */
const HelpTooltip = ({
  size,
  containerCss,
  color = '#2F3B43',
  tooltipBoxCss,
  title,
  description,
}: HelpTooltipProps) => {
  return (
    <div css={[HelpTooltipContainerCss, containerCss]}>
      <BiHelpCircle size={size} color={color} />
      <TooltipBox containerCss={tooltipBoxCss} title={title} description={description} />
    </div>
  );
};

export default HelpTooltip;

const boxContaierCss = css`
  position: absolute;
  width: 171px;
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  border-radius: 0px 12px 12px 12px;
  padding: 9px 9px 7px 10px;
  z-index: 101;
`;

type TooltipBoxProps = {
  containerCss?: SerializedStyles;
  title?: string;
  description?: string;
};
const TooltipBox = ({ containerCss, title, description }: TooltipBoxProps) => {
  return (
    <div css={[boxContaierCss, containerCss]}>
      {/* prettier-ignore */}
      <Typography.Body5 lineHeight="13px" css={css`margin-bottom:7px;`}>{title}</Typography.Body5>
      <Typography.Body6 lineHeight="13px">{description}</Typography.Body6>
    </div>
  );
};
