'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.Hotel);
      Room.belongsToMany(models.Reservation, {
        through: 'RoomReservation',
        as: 'Reservations',
      });
    }
  };
  Room.findAvailable = function () {
    // 'this' refers directly back to the model (the capital "P" Pug)
    return this.findAll({ 
    })
  }
  Room.init({
    bedNumber: DataTypes.INTEGER,
    roomDescription: DataTypes.STRING,
    roomType: DataTypes.STRING,
    price: DataTypes.INTEGER,
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
    modelName: 'Room',
  });
  return Room;
};