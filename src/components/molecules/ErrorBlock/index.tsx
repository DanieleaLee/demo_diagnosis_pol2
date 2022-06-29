import {css, Theme} from "@emotion/react";
import {BsXCircleFill} from "react-icons/bs";
import * as Typography from "@styles/typography";
import Colors from "@styles/colors";

export type ErrorBlockProps = {
  children: React.ReactNode;
}


const blockStyle = (theme:Theme) =>
  css`
    display: flex;
    height: 56px;
    border-radius: 4px;
    background-color: ${theme.colors.backgroundError};
    padding: 1rem;
    margin-bottom: 0.5rem;
    & p {
      color: ${theme.colors.error};
    }
  `;

const ErrorBlock = ({children}: ErrorBlockProps) => {
   return(
     <div css={blockStyle}>
       <div css={css`margin: 0px 10px 0 0;`}>
         <BsXCircleFill color={Colors.error} />
       </div>
       <Typography.Title4>
         {children}
         {/*<b>{"\"Email\""}</b> {"or \"Password\" is invalid"}*/}
       </Typography.Title4>
     </div>
   );
};


export default ErrorBlock;