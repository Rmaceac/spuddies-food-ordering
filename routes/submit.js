/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { orderReadyMsg, orderEstimate, orderSubmitted } = require('public/scripts/sms');
const router  = express.Router();
const etaObj = {
  eta: "test"
};


module.exports = (db) => {
  // Full route './api/submit/'

  router.post("/eta", (req, res) => {
    const eta = req.body.eta;
    orderEstimate(eta);
    etaObj["eta"] = eta;

    res.send("Notification Sent");

    // VARIABLE TIME TAKES FIRST TWO CHARS OF INPUT FIELD
    const time = Number(eta.slice(0, 2));

    // SENDS ORDER READY SMS MSG AFTER DELAY USED ON SEND ETA BUTTON (only works with seconds up to 99)
    setTimeout(
      orderReadyMsg, time * 1000);
  });

  router.get('/eta', (req, res) => {
    res.json(etaObj);
  });

  router.get("/", (req, res) => {
    console.log("Order received");
  });

  router.post("/order", (req, res) => {
    console.log("Post request made to /api/submit/order");

    const queryStringTotal = `INSERT INTO orders (user_id, total_price) VALUES (2, $1) RETURNING *;`;
    const orderItem = `INSERT INTO order_items (order_id, menu_items_id, quantity, sub_total) VALUES ($1, $2, $3, $4);`;

    // CALCULATES THE TOTAL OF ALL SUBTOTALS OF EACH ORDER
    const total = req.body.getOrder.reduce((a,c) => Number(a) + Number(c.subtotal), 0);

    let promises = [];
    let params = [];
    let orderID;
    db.query(queryStringTotal, [total])
      .then(data => {
        orderID = data.rows[0].id;
        console.log(`Retrieving Order ID: ${orderID}`);
        params.push(orderID);
        for (const item of req.body.getOrder) {
          params.push(item.id, item.quantity, item.subtotal);
          promises.push(db.query(orderItem, params));
          params = params.slice(0, 1);
        }
        Promise.all(promises)
          .then(data => {
            // orderSubmitted(orderID);
            console.log("Promises resolved!");
          });
      });
  });

  return router;
};