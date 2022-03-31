module.exports = (sequelize, DataTypes) => 
  sequelize.define('Task', {
    date: {
      type: DataTypes.DATE
    },
    message: {
      type: DataTypes.TEXT
    },
    score: {
      type: DataTypes.INTEGER
    }
  })