import Sequelize from "sequelize";
import sequelize from "./db";


const MacroInfo = sequelize.define("MacroInfo", {

  symb:      {type: Sequelize.STRING(20), allowNull: false},
  desc:      {type: Sequelize.TEXT,              },
  name:      {type: Sequelize.STRING(45), allowNull: false},
  units:     {type: Sequelize.STRING(45) },
  freq:      {type: Sequelize.STRING(45) },
  src:       {type: Sequelize.STRING(45) },
  release:   {type: Sequelize.STRING(45) },
  copyright: {type: Sequelize.STRING(45) },
  country:   {type: Sequelize.STRING(45) },

},{
  tableName: "t_macro_info",
  timestamps: false,
});




export default MacroInfo;