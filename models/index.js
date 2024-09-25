const Sequelize = require("sequelize")
const sequelize = new Sequelize("usuarios", "root", "Leo40028922", {
  host: "localhost",
  dialect: "mysql"
})


module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}