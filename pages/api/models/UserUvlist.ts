import Sequelize from "sequelize";
import sequelize from "./db";
import UserUniv from "./UserUniv";
import IdxInfo from "./IdxInfo";


const UserUvlist = sequelize.define("UserUvlist", {

  uvid: {type: Sequelize.INTEGER, allowNull: false, references: {model: UserUniv, key:"id"}},
  idxid: {type: Sequelize.INTEGER, allowNull: false, references: {model: IdxInfo, key:"id"}},

  created_at: {type: Sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
  updated_at: {type: Sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')}

},{
  tableName: "t_user_uvlist",
  timestamps: false,
});


export default UserUvlist;