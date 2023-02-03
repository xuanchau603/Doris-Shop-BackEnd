const { OrderModel, OrderDetailModel, ProductModel } = require("../Model");

const orderController = {
  getOrder: async (req, res, next) => {
    if (req.query.id) {
      try {
        const order = await OrderModel.findByPk(req.query.id);
        if (order) {
          res.status(200).json(order);
        } else {
          res.status(404).json("Not Found");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.query.order_Id) {
      try {
        const orderDetail = await OrderDetailModel.findAll({
          where: { order_ID: req.query.order_Id },
          include: [
            {
              model: ProductModel,
              attributes: [
                "product_ID",
                "product_Name",
                "product_Image",
                "product_Price",
              ],
            },
            {
              model: OrderModel,
            },
          ],
        });
        if (orderDetail) {
          res.status(200).json(orderDetail);
        } else {
          res.status(404).json("Not Found");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      try {
        const orders = await OrderModel.findAll();
        if (orders) {
          res.status(200).json(orders);
        } else {
          res.status(404).json("Not Found");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  },

  //     if (req.query.order_Id) {
  //       try {
  //         const orderDetail = await OrderDetailModel.findAll({
  //           where: { order_Id: req.query.order_Id },
  //           include: [{ model: OrderModel }, { model: ProductModel }],
  //         });
  //         if (orderDetail) {
  //           res.status(200).json(orderDetail);
  //         } else {
  //           res.status(404).json("Not Found");
  //         }
  //       } catch (error) {
  //         res.status(500).json(error);
  //       }
  //     } else {
  //       try {
  //         const orders = await OrderDetailModel.findAll();
  //         if (orders) {
  //           res.status(200).json(orders);
  //         } else {
  //           res.status(404).json("Not Found");
  //         }
  //       } catch (error) {
  //         res.status(500).json(error);
  //       }
  //     }
  //   },
  createOrder: async (req, res, next) => {
    try {
      const newOrder = await OrderModel.create({
        full_Name: req.body.fullName,
        phone: req.body.phone,
        address: req.body.address,
        note: req.body.note || null,
        status: req.body.status || 0,
        payment_Type: req.body.type || 0,
        total_Order: req.body.total || 0,
      });
      if (newOrder) {
        for (let i = 0; i < req.body.product.length; ++i) {
          const a = await OrderDetailModel.create({
            order_Id: newOrder.id,
            product_Id: req.body.product[i].id,
            quantity: req.body.product[i].quantity || 0,
          });
        }
      }

      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateOrder: async (req, res, next) => {
    try {
      const checkOrder = await OrderModel.findByPk(req.query.id);
      if (!checkOrder) {
        return res.status(404).json("Not Found 123");
      } else {
        const updateOrder = await OrderModel.update(
          {
            full_Name: req.body.fullName,
            phone: req.body.phone,
            address: req.body.address,
            note: req.body.note,
            status: req.body.status,
            payment_Type: req.body.type,
            total_Order: req.body.total,
          },
          {
            where: {
              id: req.query.id,
            },
          },
        );
        res.status(200).json(updateOrder);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const checkOrder = await OrderModel.findByPk(req.query.id);
      if (!checkOrder) {
        return res.status(404).json("Not Found");
      } else {
        const listOrderDetail = await OrderDetailModel.findAll({
          where: {
            order_Id: req.query.id,
          },
        });
        for (let i = 0; i < listOrderDetail.length; ++i) {
          await OrderDetailModel.destroy({
            where: {
              id: listOrderDetail[i].id,
            },
          });
        }

        const result = await OrderModel.destroy({
          where: {
            id: req.query.id,
          },
        });
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = orderController;
