'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Profiles', 'authorized', { 
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.addColumn('Profiles', 'admin', { 
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Profiles', 'authorized')
    await queryInterface.removeColumn('Profiles', 'admin')
  }
};