import Sequelize from "sequelize";
import sequelize from "./db";
import UserDataset from "./UserDataset";
import MacroInfo from "./MacroInfo";


const UserDslist = sequelize.define("UserDslist", {

  dsid: {type: Sequelize.INTEGER, allowNull: false, references: {model: UserDataset, key:"id"}},
  mid: {type: Sequelize.INTEGER, allowNull: false, references: {model: MacroInfo, key:"id"}},

  created_at: {type: Sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
  updated_at: {type: Sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')}

},{
  tableName: "t_user_dslist",
  timestamps: false,
});


export default UserDslist;