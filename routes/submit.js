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
    setTimeout(
      orderReadyMsg, time * 1000);
  });

  router.get("/", (req, res) => {
    console.log("Order received");
    // orderSubmitted();
  });

  router.post("/order", (req, res) => {
    console.log("Post request made to /api/submit/order");
    console.log(`Req.body: ${req.body.getOrder}`);

    for (const item of req.body.getOrder) {
      console.log("Item:", item);
    }

  //   const queryString = ` INSERT INTO orders (user_id, total_price) VALUES (2, $1);
  //   INSERT INTO order_items (order_id, menu_items_id, quantity, sub_total) VALUES (1, $2, $3, $4);`;
  //   const params = "";

  //   db.query(queryString, params)
  //     .then(data => {
  //       console.log("Order submitted to database");
  //     });
  });

  return router;
};