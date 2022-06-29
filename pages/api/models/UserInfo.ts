import Sequelize from "sequelize";
import sequelize from "./db";


const UserInfo = sequelize.define("UserInfo", {

  email:         {type: Sequelize.STRING(45),  allowNull: false, unique: true},
  password:      {type: Sequelize.STRING(200), allowNull: false},
  name:          {type: Sequelize.STRING(45),  allowNull: false},
  company:       {type: Sequelize.STRING(45)},
  phno:          {type: Sequelize.STRING(45)},
  img:           {type: Sequelize.STRING(200)},
  plan:          {type: Sequelize.TINYINT,  allowNull: false},
  bearer_token:  {type: Sequelize.STRING(200)},
  refresh_token: {type: Sequelize.STRING(200)},
  sns:           {type: Sequelize.TINYINT,  allowNull: false},
  last_login:    {type: Sequelize.DATE },

  created_at: {type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},

},{
  tableName: "t_user_info",
  timestamps: false,
});




export default UserInfo;