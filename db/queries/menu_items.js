const { Pool } = require('pg');
const dbParams = require("../../lib/db.js");
const db = new Pool(dbParams);

const queryString = `SELECT * FROM menu_items;`;

db.query(queryString)
  .then(res => {
    console.log("response.rows:", res.rows);
    return res.rows;
  })
  .catch(err => {
    console.log("Query Error:", err);
  });