import Sequelize from "sequelize";
import sequelize from "./db";
import UserInfo from "./UserInfo";


const UserUniv = sequelize.define("UserUniv", {

  uid: {type: Sequelize.INTEGER, allowNull: false, references: {model: UserInfo, key:"id"}},
  comment: {type: Sequelize.TEXT},
  created_at: {type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
  updated_at: {type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}

},{
  tableName: "t_user_univ",
  timestamps: false,
});



export default UserUniv;