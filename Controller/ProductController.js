const { ProductModel, CateModel, PromotionModel } = require("../Model");
const { Op } = require("sequelize");

const ProductController = {
  getProduct: async (req, res) => {
    if (req.query.id) {
      try {
        const product = await ProductModel.findByPk(req.query.id, {
          include: [
            { model: CateModel, attributes: ["cate_Name"] },
            { model: PromotionModel, attributes: ["discount", "description"] },
          ],
        });
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json("Not Found");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.query.name) {
      try {
        const product = await ProductModel.findAll({
          where: {
            product_Name: { [Op.like]: `%${req.query.name}%` },
          },
          include: [
            { model: CateModel, attributes: ["cate_Name"] },
            { model: PromotionModel, attributes: ["discount", "description"] },
          ],
        });
        if (product) {
          res.status(200).json(product);
          console.log(123);
        } else {
          res.status(404).json("Not Found");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      try {
        const listProduct = await ProductModel.findAll({
          include: [
            { model: CateModel, attributes: ["cate_Name"] },
            { model: PromotionModel, attributes: ["discount", "description"] },
          ],
        });
        res.status(200).json(listProduct);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  },
  createProduct: async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image || null,
        quantity: req.body.quantity || 0,
        cate_ID: req.body.cateID || "77f05b00-e7c0-4273-9eb2-73ead270cf0a",
        promotion_ID:
          req.body.promotionID === "0" ? null : req.body.promotionID,
      };
      //Check Product
      const product = await ProductModel.findOne({
        where: { product_Name: req.body.name },
      });
      if (product) {
        res.status(400).json("This product is already exist");
      } else {
        //Create
        const newProduct = await ProductModel.create({
          product_Name: data.name,
          product_Price: data.price,
          product_Description: data.description,
          product_Image: data.image,
          product_Quantity: data.quantity,
          installment: data.installment,
          cate_ID: data.cate_ID,
          promotion_ID: data.promotion_ID,
        });
        res.status(200).json(newProduct);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const product = await ProductModel.findByPk(req.query.id);
      if (!product) {
        return res.status(404).json("Not found!");
      }
      const productUpdate = await ProductModel.update(
        {
          product_Name: req.body.name,
          product_Price: req.body.price,
          product_Description: req.body.description,
          product_Image: req.body.image,
          product_Quantity: req.body.quantity,
          cate_ID: req.body.cateID,
          promotion_ID: req.body.promotionID,
        },
        {
          where: {
            product_ID: req.query.id,
          },
        }
      );
      res.status(200).json(productUpdate);
    } catch (error) {
      res.json(500).json(error);
    }
  },
  deleteProduct: async (req, res) => {
    const result = await ProductModel.destroy({
      where: {
        product_ID: req.query.id,
      },
    });
    res.status(200).json(result);
  },
};

module.exports = ProductController;
