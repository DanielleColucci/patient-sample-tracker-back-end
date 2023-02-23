'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Samples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MRN: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sampleNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cellLine: {
        type: Sequelize.ENUM('In Process', 'Finished', 'Failed', 'NA'),
        defaultValue: 'NA',
        allowNull: false
      },
      PDXModel: {
        type: Sequelize.ENUM('In Process', 'Finished', 'Failed', 'NA'),
        defaultValue: 'NA',
        allowNull: false
      },
      profileId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'Profiles',
          key: 'id'
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Samples');
  }
};