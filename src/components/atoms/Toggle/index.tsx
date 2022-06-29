import React, {useState} from "react";
import Switch, {ReactSwitchProps} from "react-switch";
import {BsCheck} from "react-icons/bs";
import Colors from "@styles/colors";


export function useToggle <T = any>(
  initialState: boolean
){

  const [checked, setChecked] = useState(initialState);

  const onChange = () => {
    setChecked(!checked);
  };

  return {checked, onChange}
}

export interface ToggleProps extends ReactSwitchProps{};

const Toggle = ({uncheckedIcon=false, checkedIcon=false, ...props}:ToggleProps) => {

  return(
    <Switch
      {...props}
      uncheckedIcon
      checkedIcon
      checkedHandleIcon={<BsCheck size={26}/>}
      onColor={Colors.primary2}
    />

  );

};

export default Toggle;