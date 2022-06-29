import Sequelize from "sequelize";
import sequelize from "./db";


const AaTarget = sequelize.define("AaTarget", {
  name: {type: Sequelize.STRING(45), allowNull: false},
  desc: {type: Sequelize.TEXT},

},{
  tableName: "t_aa_targets",
  timestamps: false,
});



export default AaTarget;