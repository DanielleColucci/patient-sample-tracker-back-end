'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'authorized', { 
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.addColumn('Users', 'admin', { 
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'authorized')
    await queryInterface.removeColumn('Users', 'admin')
  }
};
