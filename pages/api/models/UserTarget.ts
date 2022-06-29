import Sequelize from "sequelize";
import sequelize from "./db";
import UserDataset from "./UserDataset";
import UserInfo from "./UserInfo";
import AaTarget from "./AaTarget";
import AaTrgopt from "./AaTrgopt";


const UserTarget = sequelize.define("UserTarget", {

  uid: {type: Sequelize.INTEGER, allowNull: false, references: {model: UserDataset, key:"id"}},
  tid: {type: Sequelize.INTEGER, allowNull: false, references: {model: AaTarget, key:"id"}},
  toid: {type: Sequelize.INTEGER, allowNull: false, references: {model: AaTrgopt, key:"id"}},

  value: {type: Sequelize.STRING(45), allowNull: false },
  vmax: {type: Sequelize.FLOAT(9,4), allowNull: false },
  vmin: {type: Sequelize.FLOAT(9,4), allowNull: false },

  created_at: {type: Sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
  updated_at: {type: Sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')}

},{
  tableName: "t_user_target",
  timestamps: false,
});


export default UserTarget;