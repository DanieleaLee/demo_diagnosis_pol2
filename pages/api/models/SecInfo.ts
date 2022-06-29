import Sequelize from "sequelize";
import sequelize from "./db";


const SecInfo = sequelize.define("SecInfo", {

  gvkey:   {type: Sequelize.STRING(20),  allowNull: false},
  iid:     {type: Sequelize.STRING(20),  allowNull: false},
  isin:    {type: Sequelize.STRING(20),  allowNull: false},
  company: {type: Sequelize.STRING(100), allowNull: false},

},{
  tableName: "t_sec_info",
  timestamps: false,
});




export default SecInfo;