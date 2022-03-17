/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { orderReadyMsg, orderEstimate, orderSubmitted } = require('../public/scripts/sms');
const router  = express.Router();


module.exports = (db) => {
  // Full route './api/submit/'

  router.post("/eta", (req, res) => {
    const eta = req.body.eta;
    // orderEstimate(eta);

    res.send("Notification Sent");

    const time = Number(eta.slice(0, 2));
    // setTimeout(
    //   orderReadyMsg, time * 1000);
  });

  router.get("/", (req, res) => {
    console.log("Order received");
    // orderSubmitted();
  });

  router.post("/order", (req, res) => {
    console.log("Post request made to /api/submit/order");
    // console.log(`Req.body: ${req.body.getOrder}`);

    const queryStringTotal = `INSERT INTO orders (user_id, total_price) VALUES (2, $1) RETURNING *;`;
    const orderItem = `INSERT INTO order_items (order_id, menu_items_id, quantity, sub_total) VALUES ($1, $2, $3, $4);`;

    // calculates total of each subtoal of each item
    const total = req.body.getOrder.reduce((a,c) => Number(a) + Number(c.subtotal), 0);
    // console.log("Total:", total);

    let promises = [];
    let params = []
    db.query(queryStringTotal, [total])
      .then(data => {
        console.log(`Retrieving Order ID: ${data.rows[0].id}`);
        params.push(data.rows[0].id);
        for (const item of req.body.getOrder) {
          params.push(item.id, item.quantity, item.subtotal);
          promises.push(db.query(orderItem, params)
          );
          params = params.slice(0, 1);
        }
        Promise.all(promises)
          .then(data => {
            console.log("Promises resolved!");
          });
      });

  });

  return router;
};