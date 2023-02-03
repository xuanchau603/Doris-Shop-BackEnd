const express = require("express");
const RoleController = require("../Controller/RoleController");
const UserController = require("../Controller/UserController");
const CateController = require("../Controller/CateController");
const PromotionController = require("../Controller/PromotionController");
const ProductController = require("../Controller/ProductController");
const orderController = require("../Controller/OrderController");
const middlewareController = require("../Controller/middlewareController");
const roleRouter = express.Router();
const authRouter = express.Router();
const cateRouter = express.Router();
const promoRouter = express.Router();
const productRouter = express.Router();
const orderRouter = express.Router();

//Role
roleRouter.get("/:id?", RoleController.getRole);
roleRouter.post("/create", RoleController.createRole);
// Get User
authRouter.get(
  "/:id?",
  middlewareController.verifyToken,
  UserController.getUser,
);
//Create user
authRouter.post("/create", UserController.createUser);
//Delete user
authRouter.delete(
  "/delete/:id",
  middlewareController.verifyToken,
  UserController.deleteUser,
);
//Login user
authRouter.post("/login", UserController.loginUser);

//Category
//Get cate
cateRouter.get("/", CateController.getCate);
cateRouter.get("/min", CateController.getCateMin);

//Create cate
cateRouter.post("/create", CateController.createCate);

//Update Cate
cateRouter.put("/update/:id", CateController.updateCate);

//Delete Cate
cateRouter.delete("/delete/:id", CateController.deleteCate);

//Promotion

//Get
promoRouter.get("/", PromotionController.getPromotion);

//Create
promoRouter.post("/create", PromotionController.createPromotion);

//Update
promoRouter.put("/update/:id", PromotionController.updatePromotion);

//Delete
promoRouter.delete("/delete/:id", PromotionController.deletepromotion);

//Product

//Get
productRouter.get("/", ProductController.getProduct);

//Create
productRouter.post("/create", ProductController.createProduct);

//Update
productRouter.put("/update/", ProductController.updateProduct);

//Detele
productRouter.delete("/delete", ProductController.deleteProduct);

//Order
//Get
orderRouter.get("/", orderController.getOrder);

//Create
orderRouter.post("/create", orderController.createOrder);

//Update
orderRouter.put("/update", orderController.updateOrder);

//Detele
orderRouter.delete("/delete", orderController.deleteOrder);

module.exports = {
  roleRouter,
  authRouter,
  cateRouter,
  promoRouter,
  productRouter,
  orderRouter,
};
