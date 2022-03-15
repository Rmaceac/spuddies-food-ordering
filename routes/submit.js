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
    // console.log('Request:', req.body.eta);
    orderEstimate(req.body.eta);
    res.send("Notification Sent");
  });

  router.get("/", (req, res) => {
    console.log("Order received");
    orderSubmitted();
  });

  return router;
};


