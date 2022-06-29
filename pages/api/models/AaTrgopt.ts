import Sequelize from "sequelize";
import sequelize from "./db";
import AaTarget from "./AaTarget"


const AaTrgopt = sequelize.define("AaTrgopt", {


  tid: {type: Sequelize.INTEGER, allowNull: false, references: {model: AaTarget, key:"id"}},
  name: {type: Sequelize.STRING(45), allowNull: false},
  desc: {type: Sequelize.TEXT},
  type: {type: Sequelize.TINYINT},


},{
  tableName: "t_aa_trgopt",
  timestamps: false,
});



export default AaTrgopt;