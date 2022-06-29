import React, { FC, useCallback, useState, useRef, useEffect } from 'react';
import Buttonable, { ButtonableProps } from '@components/atoms/Buttonable';
import { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import Colors from '@styles/colors';
import { flexRowBetween } from 'src/styles';
import { BsCheckCircleFill } from 'react-icons/bs';
import Image from 'next/image';
import RightMenuBody from '@tempComponents/v2/molecules/RightMenu/RightMenuBody';

const rightMenuContainerCss = (bodyWidth) => css`
  top: 0px;
  right: 0px;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  transition: transform 0.6s ease-out;
`;

const rightMenuButtonWrapCss = (width, paddingTop) => css`
  width: ${width}px;
  position: relative;
  padding-top: ${paddingTop}px;
  height: 100%;
  z-index: 2;
`;

const rightMenuBodyWrapCss = (width, paddingTop, paddingBottom) => css`
  width: ${width}px;
  height: 100%;
  position: relative;
  padding-top: ${paddingTop}px;
  padding-bottom: ${paddingBottom}px;
  transition: width 0.6s ease-out;
  &.close {
    width: 0px;
    transition: width 0.5s ease-in;
  }
`;
const rightMenuButtonCss = (width, open) => css`
  width: ${width}px;
  height: 171px;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${Colors.backgroundPrimary1};
  box-shadow: ${open ? '-7px 0px 7px rgba(0, 0, 0, 0.35)' : '-5px 2px 7px rgba(0, 0, 0, 0.15)'};
  border-radius: 8px 0px 0px 8px;

  > p {
    margin-left: -8px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    color: ${Colors.primary2};
    transform: rotate(-90deg);
  }
`;
const RightMenuButton = ({ open, width, onClick }) => {
  console.log(open);
  return (
    <div css={[rightMenuButtonCss(width, open)]} onClick={onClick}>
      <p>Load</p>
    </div>
  );
};

export type RightMenuProps = {
  children?: any;
};
const RightMenu = ({ children }: RightMenuProps) => {
  const [opened, setOpened] = useState(false);

  const containerRef = useRef(null);
  const buttonWrapPaddingTop = 242;
  const buttonWidth = 55;

  const bodyWrapPaddingTop = 50;
  const bodyWrapPaddingBottom = 50;
  const bodyWidth = 872;
  const bodyHeight = 840;

  const slideToggle = useCallback(() => {
    console.log(123);
    const containerRefClassList = containerRef.current.classList;
    opened ? containerRefClassList.add('close') : containerRefClassList.remove('close');
    setOpened(!opened);
  }, [opened]);

  // const Child = () => React.cloneElement(children, { closeOverlay: slideToggle });

  return (
    <div>
      {opened && (
        <div
          css={css`
            height: 100vh;
            width: 100vw;
            background-color: gray;
            opacity: 80%;
            position: fixed;
            top: 0px;
            right: 0px;
            z-index: 98;
          `}
        ></div>
      )}
      <div
        css={css`
          position: fixed;
          top: 0px;
          right: 0px;
          z-index: 99;
        `}
      >
        <div css={rightMenuContainerCss(bodyWidth)}>
          <div css={[rightMenuButtonWrapCss(buttonWidth, buttonWrapPaddingTop)]}>
            <RightMenuButton open={opened} width={buttonWidth} onClick={slideToggle} />
          </div>
          <div
            className={'close'}
            css={[rightMenuBodyWrapCss(bodyWidth, bodyWrapPaddingTop, bodyWrapPaddingBottom)]}
            ref={containerRef}
          >
            <div
              css={css`
                width: inherit;
                height: inherit;
                background-color: ${Colors.backgroundPrimary1};
                border-radius: 8px 0px 0px 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
              `}
            >
              <RightMenuBody width={bodyWidth} minHeight={bodyHeight} closeOverlay={slideToggle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightMenu;
