const { Sequelize } = require("sequelize");

const db = new Sequelize("db_shopmypham", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: true,
});

const connect = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connect();

module.exports = db;
