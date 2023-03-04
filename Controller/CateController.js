const { CateModel, ProductModel } = require("../Model");

const CateController = {
  getCate: async (req, res) => {
    if (req.query.id) {
      try {
        const cate = await CateModel.findByPk(req.query.id);
        if (cate) {
          res.status(200).json(cate);
        } else {
          res.status(404).json("Not Found");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      try {
        const listCate = await CateModel.findAll();

        res.status(200).json(listCate);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  },
  getCateMin: async (req, res) => {
    try {
      const listCate = await CateModel.findAll({
        attributes: ["cate_ID", "cate_Name"],
        include: [
          {
            model: ProductModel,
            attributes: ["product_ID", "product_Name"],
          },
        ],
      });
      res.status(200).json(listCate);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  createCate: async (req, res) => {
    try {
      const data = {
        cate_Name: req.body.name,
        cate_Image: req.body.image,
        cate_Description: req.body.description,
      };
      //Check Cate
      const cate = await CateModel.findOne({
        where: { cate_Name: req.body.name },
      });
      if (cate) {
        res.status(400).json("This category is already exist");
      } else {
        //Create
        const newCate = await CateModel.create({
          cate_Name: data.cate_Name,
          cate_Image: data.cate_Image,
          cate_Descripton: data.cate_Description,
        });
        res.status(200).json(newCate);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateCate: async (req, res) => {
    try {
      const cate = await CateModel.findByPk(req.params.id);
      if (!cate) {
        return res.status(404).json("Not found!");
      }
      const cateUpdate = await CateModel.update(
        {
          cate_Name: req.body.name,
          cate_Image: req.body.image,
          cate_Description: req.body.description,
        },
        {
          where: {
            cate_ID: req.params.id,
          },
        },
      );
      res.status(200).json(cateUpdate);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteCate: async (req, res) => {
    const result = await CateModel.destroy({
      where: {
        cate_ID: req.params.id,
      },
    });
    res.status(200).json(result);
  },
};

module.exports = CateController;
