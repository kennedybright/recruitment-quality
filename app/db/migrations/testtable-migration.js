'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('testtable', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Database generated id'
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'A name'
      }
    }, {
      timestamps: false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('testtable')
  }
}
