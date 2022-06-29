import Sequelize from "sequelize";
import sequelize from "./db";


const IdxInfo = sequelize.define("IdxInfo", {

  symb:     {type: Sequelize.STRING(20)},
  desc:     {type: Sequelize.TEXT},
  class:    {type: Sequelize.STRING(20)},
  levl:     {type: Sequelize.STRING(20)},
  size:     {type: Sequelize.STRING(20)},
  econ_dev: {type: Sequelize.STRING(20)},
  reg:      {type: Sequelize.STRING(20)},

},{
  tableName: "t_idx_info",
  timestamps: false,
});




export default IdxInfo;