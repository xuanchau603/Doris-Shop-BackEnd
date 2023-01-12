const { PromotionModel } = require("../Model");

const PromotionController = {
  getPromotion: async (req, res) => {
    if (req.params.id) {
      try {
        const promotion = await PromotionModel.findByPk(req.params.id);
        if (promotion) {
          res.status(200).json(promotion);
        } else {
          res.status(404).json("Not Found");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      try {
        const listPromotion = await PromotionModel.findAll();
        res.status(200).json(listPromotion);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  },
  createPromotion: async (req, res) => {
    try {
      const data = {
        discount: req.body.discount,
        description: req.body.description,
      };
      //Check promotion
      const promotion = await PromotionModel.findOne({
        where: { description: req.body.description },
      });

      if (promotion) {
        res.status(400).json("This promotion is already exist");
      } else {
        //Create
        const newPromotion = await PromotionModel.create({
          discount: data.discount,
          description: data.description,
        });
        res.status(200).json(newPromotion);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updatePromotion: async (req, res) => {
    try {
      const promotion = await PromotionModel.findByPk(req.params.id);
      if (!promotion) {
        return res.status(404).json("Not found!");
      }
      const promotionUpdate = await PromotionModel.update(
        {
          discount: req.body.discount,
          description: req.body.description,
        },
        {
          where: {
            promotion_ID: req.params.id,
          },
        }
      );
      res.status(200).json(promotionUpdate);
    } catch (error) {
      res.json(500).json(error);
    }
  },
  deletepromotion: async (req, res) => {
    const result = await PromotionModel.destroy({
      where: {
        promotion_ID: req.params.id,
      },
    });
    res.status(200).json(result);
  },
};

module.exports = PromotionController;
