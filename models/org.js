'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Org extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Org.init({
    oid: DataTypes.STRING,
    pid: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    cid: DataTypes.STRING,
    did: DataTypes.STRING,
    c: DataTypes.STRING,
    cn: DataTypes.STRING,
    t: DataTypes.STRING,
    name: DataTypes.STRING,
    additional: DataTypes.STRING,
    comments: DataTypes.STRING,
    phone: DataTypes.STRING,
    link: DataTypes.STRING,
    hours: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Org',
  });
  return Org;
};