'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hotel.hasMany(models.Room);
    }
  };
  Hotel.init({
    hotelName: DataTypes.STRING,
    cuntry: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    contactInfo: DataTypes.STRING,
    hotelDescription: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};