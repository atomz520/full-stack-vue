module.exports = (sequelize, DataTypes) => 
  sequelize.define('Task', {
    habit_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })