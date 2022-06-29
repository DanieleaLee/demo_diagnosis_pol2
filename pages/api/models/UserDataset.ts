import Sequelize from "sequelize";
import sequelize from "./db";
import UserInfo from "./UserInfo";


const UserDataset = sequelize.define("UserDataset", {

  uid: {type: Sequelize.INTEGER, allowNull: false, references: {model: UserInfo, key:"id"}},
  comment: {type: Sequelize.TEXT},

  created_at: {type: Sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
  updated_at: {type: Sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},

},{
  tableName: "t_user_dataset",
  timestamps: false,
});


export default UserDataset;