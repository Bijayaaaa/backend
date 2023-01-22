const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();
const connectionString = process.env.DATABASE_URL;

// const connectionString = "postgres://vertex:vertex@localhost:5432/learn_node_postgres";

  const db = new pg.Pool({ connectionString });
  // db.query("SELECT * FROM VOLUNTEERS").then((result) => console.log(result));
  module.exports = db;