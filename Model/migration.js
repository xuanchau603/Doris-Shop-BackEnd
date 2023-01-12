const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize("db_shopmypham", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const queryInterface = sequelize.getQueryInterface();

queryInterface.removeColumn("users", "description");
