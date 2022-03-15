/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { orderReadyMsg, orderEstimate, orderSubmitted } = require('../public/scripts/sms');
const router  = express.Router();


module.exports = () => {
  // Full route './api/submit/'
  router.post("/eta", (req, res) => {
    const eta = req.body.eta;
    orderEstimate(eta);
    res.send("Notification Sent");

    const time = Number(eta.slice(0, 2));
    setTimeout(
      orderReadyMsg, time * 1000);
  });

  router.get("/", (req, res) => {
    console.log("Order received");
    orderSubmitted();
  });

  return router;
};


