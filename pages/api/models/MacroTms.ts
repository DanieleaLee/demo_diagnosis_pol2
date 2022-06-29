import Sequelize from "sequelize";
import sequelize from "./db";
import MacroInfo from "./MacroInfo";


const MacroTms = sequelize.define("MacroTms", {

  basc_dt: {type: Sequelize.DATE,    allowNull: false, primaryKey: true },
  mid:   {type: Sequelize.INTEGER, allowNull: false, primaryKey: true , references: {model: MacroInfo, key:"id"}},
  value:   {type: Sequelize.FLOAT,   allowNull: false},

},{
  tableName: "t_macro_tms",
  timestamps: false,
});

MacroTms.removeAttribute('id');



export default MacroTms;