/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { orderReadyMsg, orderEstimate } = require('../public/scripts/sms');
const router  = express.Router();


module.exports = (estimate) => {
  // Full route './api/submit/'
  router.get("/", (req, res) => {
    orderEstimate("20 minutes");
    res.send("Notification Sent");
  });
  return router;
};
