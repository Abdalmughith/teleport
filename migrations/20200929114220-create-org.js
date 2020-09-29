'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orgs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      oid: {
        type: Sequelize.STRING
      },
      pid: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.STRING
      },
      cid: {
        type: Sequelize.STRING
      },
      did: {
        type: Sequelize.STRING
      },
      c: {
        type: Sequelize.STRING
      },
      cn: {
        type: Sequelize.STRING
      },
      t: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      additional: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      hours: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orgs');
  }
};