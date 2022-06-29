import Sequelize from "sequelize";
import sequelize from "./db";

import UserInfo  from "./UserInfo";
import UserUniv from "./UserUniv";
import UserDataset from "./UserDataset";

import UserTarget from "./UserTarget";


const UserConfig = sequelize.define("UserConfig", {

  uid: {type: Sequelize.INTEGER, allowNull: false, references: {model: UserInfo, key:"id"}},
  uvid: {type: Sequelize.INTEGER, allowNull: false, references: {model: UserUniv, key:"id"}},
  dsid: {type: Sequelize.INTEGER, allowNull: false, references: {model: UserDataset, key:"id"}},
  tid: {type: Sequelize.INTEGER, allowNull: false, references: {model: UserTarget, key:"id"}},

  created_at: {type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
  updated_at: {type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}

},{
  tableName: "t_user_config",
  timestamps: false,
});




export default UserConfig;