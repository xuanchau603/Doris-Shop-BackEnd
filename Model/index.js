const { DataTypes, UUIDV4 } = require("sequelize");
const db = require("./DBConnect");

const RoleModel = db.define(
  "Role",
  {
    role_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    role_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 2,
      },
    },
    role_Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = db.define(
  "User",
  {
    user_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    role_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "395c9132-7e13-4918-98a2-0c75a99df17f",
      references: {
        model: RoleModel,
        key: "role_ID",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        min: 10,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_Name: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    avatar: {
      type: DataTypes.BLOB("long"),
      defaultValue: "",
    },
  },
  {
    timestamps: true,
  },
);

const CateModel = db.define(
  "category",
  {
    cate_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    cate_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cate_Image: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
    cate_Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

const PromotionModel = db.define(
  "promotions",
  {
    promotion_ID: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: "No description",
    },
  },
  {
    timestamps: true,
  },
);

const ProductModel = db.define(
  "product",
  {
    product_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    product_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_Price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    product_Image: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
      defaultValue: "",
    },
    product_Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    product_Description: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    cate_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CateModel,
        key: "cate_ID",
      },
    },
    promotion_ID: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
      references: {
        model: PromotionModel,
        key: "promotion_ID",
      },
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = db.define(
  "orders",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    full_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    payment_Type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    total_Order: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);

const OrderDetailModel = db.define(
  "order_detail",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    order_Id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: OrderModel,
        key: "id",
      },
    },
    product_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ProductModel,
        key: "product_ID",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);

RoleModel.hasMany(UserModel, { foreignKey: "role_ID" });
UserModel.belongsTo(RoleModel, { foreignKey: "role_ID" });
//

CateModel.hasMany(ProductModel, { foreignKey: "cate_ID" });
ProductModel.belongsTo(CateModel, { foreignKey: "cate_ID" });

//

PromotionModel.hasMany(ProductModel, { foreignKey: "promotion_ID" });
ProductModel.belongsTo(PromotionModel, { foreignKey: "promotion_ID" });

//

OrderModel.hasMany(OrderDetailModel, { foreignKey: "order_Id" });
OrderDetailModel.belongsTo(OrderModel, { foreignKey: "order_Id" });

//
ProductModel.hasMany(OrderDetailModel, { foreignKey: "product_ID" });
OrderDetailModel.belongsTo(ProductModel, { foreignKey: "product_ID" });

// const queryInterface = db.getQueryInterface();
// queryInterface.removeColumn("users", "city");

db.sync();

module.exports = {
  RoleModel,
  UserModel,
  CateModel,
  ProductModel,
  PromotionModel,
  OrderModel,
  OrderDetailModel,
};
