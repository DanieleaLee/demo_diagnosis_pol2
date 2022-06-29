import Sequelize from "sequelize";
import sequelize from "./db";
import SecInfo from "./SecInfo";


const SecTms = sequelize.define("SecTms", {

  basc_dt: {type: Sequelize.DATE,    allowNull: false, primaryKey: true},
  sid:     {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, references: {model: SecInfo, key:"id"}},
  value:   {type: Sequelize.FLOAT,   allowNull: false},

},{
  tableName: "t_sec_tms",
  timestamps: false,
});

SecTms.removeAttribute('id');



export default SecTms;