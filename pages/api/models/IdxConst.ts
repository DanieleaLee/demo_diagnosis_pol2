import Sequelize from "sequelize";
import sequelize from "./db";
import IdxInfo from "./IdxInfo";
import SecInfo from "./SecInfo";


const IdxConst = sequelize.define("IdxConst", {

  idxid: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, references: {model: IdxInfo, key:"id"}},
  tid: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, references: {model: SecInfo, key:"id"}},

},{
  tableName: "t_idx_const",
  timestamps: false,
});

IdxConst.removeAttribute('id');



export default IdxConst;