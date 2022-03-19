/*
 * All routes for menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  // Full route './api/menu/'
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM menu_items;`)
      .then(data => {
        const menu = data.rows;
        res.json(menu);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};