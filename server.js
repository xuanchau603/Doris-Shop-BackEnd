const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Cors = require("cors");
const {
  roleRouter,
  authRouter,
  cateRouter,
  promoRouter,
  productRouter,
  orderRouter,
} = require("./Routes");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(Cors());
app.use(express.json());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//ROUTER role
app.use("/role", roleRouter);

//ROUTER auth
app.use("/user", authRouter);

//ROUTER category
app.use("/category", cateRouter);

//ROUTER promotion
app.use("/promotion", promoRouter);

//ROUTER product
app.use("/product", productRouter);

//ROUTER order
app.use("/order", orderRouter);

app.listen(3001, () => {
  console.log(`Example app listening on port ${3001}`);
});
