/*
 * All routes for menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  // Full route './api/checkout/'
  router.get("/", (req, res) => {
    db.query(`
    SELECT orders.id as order_id, order_time, sub_total, total_price, menu_items_id, quantity
    FROM orders
    JOIN order_items ON order_id = orders.id
    WHERE order_id = 1;`)
      .then(data => {
        const checkout = data.rows;
        res.json(checkout);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};