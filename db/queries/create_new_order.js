const { Pool } = require('pg');
const dbParams = require("../../lib/db.js");
const db = new Pool(dbParams);

const queryString = `
INSERT INTO orders (user_id, total_price) VALUES (2, 29);
INSERT INTO order_items (order_id, menu_items_id, quantity, sub_total) VALUES (1, 1, 1, 13);
INSERT INTO order_items (order_id, menu_items_id, quantity, sub_total) VALUES (1, 2, 1, 11);
INSERT INTO order_items (order_id, menu_items_id, quantity, sub_total) VALUES (1, 4, 2, 12);`;

db.query(queryString)
  .then(res => {
    console.log("response.rows:", res.rows);
  })
  .catch(err => {
    console.log("Query Error:", err);
  });