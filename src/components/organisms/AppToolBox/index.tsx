import {css} from "@emotion/react";
import {MdDescription} from "react-icons/md";
import {AiOutlineAppstore} from "react-icons/ai";
import {FaServer} from "react-icons/fa";
import {TiMessages} from "react-icons/ti";
import {BiHelpCircle} from "react-icons/bi";
import {flexColumnBetween} from "@styles";

const toolboxWrap = css`
  background-color: black;
  color: white;
  width: 43px;
  height: 100%;
`;

const AppToolBox = () => (
  <div css={toolboxWrap}>
    <div css={[flexColumnBetween, css`height: 300px; margin-top: 168px; align-items: center;`]}>
      <MdDescription size={30}/>
      <AiOutlineAppstore size={30}/>
      <FaServer size={30}/>
      <TiMessages size={30}/>
      <BiHelpCircle size={30}/>
    </div>

  </div>
);

export default AppToolBox;
