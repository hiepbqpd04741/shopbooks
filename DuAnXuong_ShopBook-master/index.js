const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const webRoutes = require("./routes/web");
const adminRoutes = require("./routes/admin");
const apiRoutes = require("./routes/api");

const app = express();
const port = process.env.PORT || 1234;


  // MongoDB connection
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("MongoDB is ready");

      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log(`MongoDB error: ${err}`);
    });


app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    resave: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.use(cors());

app.use(function (req, res, next) {
  res.locals.loggedin = req.session.loggedin;
  res.locals.email = req.session.email;
  res.locals.totalPrice = req.session.totalPrice;
  next();
});

app.use(function (req, res, next) {
  const cart = req.session.cart;
  const huyitem = [];
  if (cart) {
    for (const key in cart.huydev) {
      huyitem.push(cart.huydev[key]);
    }
  }
  res.locals.huyitem = huyitem;
  next();
});

app.use("/", webRoutes);
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);


app.use((req, res) => {
  return res.render("404");
});
