import sequelize from "./db";

import AaTarget from "./AaTarget";
import AaTrgopt from "./AaTrgopt";
import IdxInfo from "./IdxInfo";
import IdxConst from "./IdxConst";
import IdxTms from "./IdxTms"
import MacroInfo from "./MacroInfo";
import MacroTms from "./MacroTms";
import SecInfo from "./SecInfo";
import SecTms from "./SecTms";
import UserConfig from "./UserConfig";
import UserDataset from "./UserDataset";
import UserDslist from "./UserDslist";
import UserInfo from "./UserInfo";
import UserTarget from "./UserTarget";
import UserUniv from "./UserUniv";
import Sequelize from "sequelize";
import UserUvlist from "./UserUvlist";

(async()=>{

  // await AaTarget.sync();
  // await AaTrgopt.sync();
  // await IdxInfo.sync();
  // await MacroInfo.sync();
  // await SecInfo.sync();
  // await UserInfo.sync();
  //
  // await MacroTms.sync();
  // await IdxConst.sync();
  // await IdxTms.sync();
  // await SecTms.sync();
  //
  // await UserDataset.sync();
  // await UserDslist.sync();
  // await UserUniv.sync();
  // await UserUvlist.sync();
  // await UserTarget.sync();
  // await UserConfig.sync();


  console.log('done');
})();

export default {
  AaTarget,
  AaTrgopt,
  IdxInfo,
  IdxConst,
  IdxTms,
  MacroInfo,
  MacroTms,
  SecInfo,
  SecTms,
  UserConfig,
  UserDataset,
  UserDslist,
  UserInfo,
  UserTarget,
  UserUniv,
  UserUvlist
}


