/*
 * All routes for menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Full route './orders'
router.get("/", (req, res) => {
  res.render("orders");
});

module.exports = (db) => {
  router.get('/:id', (req, res) => {
    const orderID = req.params.id;
    db.query(`
    SELECT orders.id as order_id, menu_items.item as item, order_time, sub_total, total_price, menu_items_id, quantity
    FROM orders
    JOIN order_items ON order_id = orders.id
    JOIN menu_items ON menu_items.id = menu_items_id
    WHERE order_id = $1;`, [orderID])
      .then(data => {
        console.log("DATA:", data);
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