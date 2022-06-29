
import dotenv from "dotenv";
dotenv.config({ path: ".env" });


const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PWD,
  DB_NAME
} = process.env;


const db = {
  host: DB_HOST || "localhost",
  port: parseInt(DB_PORT || '3306'),
  database: DB_NAME || "ndDb",
  user: DB_USER || "ndUser",
  password: DB_PWD || "ndPwd",
};

const config = {
  db
};


export default config;