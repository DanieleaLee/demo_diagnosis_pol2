import { SerializedStyles } from "@emotion/serialize";
import { buttonResetStyle, selectOpacityStyle } from "@styles";
import React, { HTMLAttributes, MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { CgClose } from "react-icons/cg";
import {
  BiGridAlt,
  BiServer,
  BiConversation,
  BiSearchAlt2,
  BiChevronDown,
  BiCaretUp,
  BiSort,
  BiTrashAlt,
  BiCog,
  BiDotsHorizontalRounded,
  BiCloudUpload,
  BiTime,
  BiBarChartSquare,
  BiCalendarAlt,
  BiErrorAlt,
  BiHelpCircle,
  BiEdit,
  BiCheck,
  BiCaretDown,
} from  "react-icons/bi";

import {
  MdOutlineScience,
  MdFilterAlt,
  MdOutlineAdjust
} from "react-icons/md";

import { FiFileText } from "react-icons/fi";
import { ImFilePdf } from "react-icons/im";
import { AiOutlinePlus, AiFillMinusCircle } from "react-icons/ai";
import { RiStickyNoteLine } from "react-icons/ri";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoCaretDownCircleSharp } from "react-icons/io5";
import { HiOutlineX } from "react-icons/hi";
import { meetsContrastGuidelines } from "polished";

const IconListObj = {
  MdOutlineScience : <MdOutlineScience />,
  CgClose : <CgClose />,
  MdFilterAlt : <MdFilterAlt />,
  MdOutlineAdjust : <MdOutlineAdjust />,
  FiFileText : <FiFileText />,
  ImFilePdf : <ImFilePdf />,
  AiOutlinePlus : <AiOutlinePlus />,
  AiFillMinusCircle : <AiFillMinusCircle />,
  RiStickyNoteLine : <RiStickyNoteLine />,
  BsFillPlusCircleFill : <BsFillPlusCircleFill />,
  IoCaretDownCircleSharp : <IoCaretDownCircleSharp />,
  HiOutlineX : <HiOutlineX />,
  BiGridAlt : <BiGridAlt />,
  BiServer : <BiServer />,
  BiConversation : <BiConversation />,
  BiSearchAlt2 : <BiSearchAlt2 />,
  BiChevronDown : <BiChevronDown />,
  BiCaretUp : <BiCaretUp />,
  BiSort : <BiSort />,
  BiTrashAlt : <BiTrashAlt />,
  BiCog : <BiCog />,
  BiDotsHorizontalRounded : <BiDotsHorizontalRounded />,
  BiCloudUpload : <BiCloudUpload />,
  BiTime : <BiTime />,
  BiBarChartSquare : <BiBarChartSquare />,
  BiCalendarAlt : <BiCalendarAlt />,
  BiErrorAlt : <BiErrorAlt />,
  BiHelpCircle : <BiHelpCircle />,
  BiEdit : <BiEdit />,
  BiCheck : <BiCheck />,
  BiCaretDown : <BiCaretDown />
}

export interface IconListType {
  name?: string;
  size?: number;
  color?: string;
};

const IconList = ({name, size, color}:IconListType)=>{
  return (
    <>
      {
          Object.entries(IconListObj)
            .filter(([key, value], k)=> 
              name == key ? true : (name == 'all' ? true : false)
            )
            .map(([key, value], k)=>{
            return (
              <div css={css`float: left; width: 250px;`} key={k}> 
                  {React.cloneElement(value, {size:size, color:color})} 
                <span css={css`font-size:${size-6}px;`}>  {[`<`,key,`/>`].join('')} </span>
              </div>
            )
          })
      }
    </>
  )
}

export default IconList;
