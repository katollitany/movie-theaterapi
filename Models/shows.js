const {DataTypes} = require("sequelize")
const {sequelize} = require("../db/connection")

// create the table
// model is a class as it has the same catergories but different input
const Shows = sequelize.define("Show",{
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    status: DataTypes.STRING
})

module.exports={Shows}