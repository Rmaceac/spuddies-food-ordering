// LOAD .env DATA INTO process.env
require("dotenv").config();

// WEB SERVER CONFIG
const PORT = process.env.PORT || 8084;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG DATABASE CLIENT/CONNECTION SETUP
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// SEPARATED ROUTES FOR EACH RESOURCE
const submitRoutes = require("./routes/submit");
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");

// MOUNT EACH RESOURCE ROUTE
app.use("/api/submit", submitRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/orders", ordersRoutes(db));

// RENDER HOMEPAGE
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
