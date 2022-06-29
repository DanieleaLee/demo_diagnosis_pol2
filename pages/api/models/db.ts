import {Sequelize } from "sequelize";
import config from "../config";


const {db} = config;/*?*/

export default new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  // port: parseInt(db.port),
  dialect: 'mysql',
  timezone: "+09:00",
  logging: false,
});/*?*/