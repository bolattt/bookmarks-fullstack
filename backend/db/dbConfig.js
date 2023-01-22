const pgp = require("pg-promise")();
require("dotenv").config();

const cn = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
};

let ssl = null;
if (process.env.NODE_ENV === "development") {
  ssl = { rejectUnauthorized: false };
}
const connectionString = process.env.ELEPHANT_SQL_URI;
console.log(connectionString);
const config = {
  connectionString: connectionString,
  max: 30,
  ssl: ssl,
};
const db = pgp(config);

module.exports = db;
