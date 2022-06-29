import Sequelize from "sequelize";
import sequelize from "./db";
import IdxInfo from "./IdxInfo";


const IdxTms = sequelize.define("IdxTms", {

  basc_dt: {type: Sequelize.DATE,    allowNull: false, primaryKey: true },
  idxid:   {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, references: {model: IdxInfo, key:"id"}},
  value:   {type: Sequelize.FLOAT,   allowNull: false},

},{
  tableName: "t_idx_tms",
  timestamps: false,
});

IdxTms.removeAttribute('id');



export default IdxTms;