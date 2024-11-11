'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class TestTable extends Model {} 
  TestTable.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Database generated id'
      },
      name: {
        type: DataTypes.STRING(70),
        allowNull: false,
        comment: 'A name'
      }
    }, 
    {
      sequelize,
      modelName: 'TestTable',
      tableName: 'testtable',
      freezeTableName: true,
      timestamps: false
    })

  TestTable.api = ['testTable']
  TestTable.crud = ['create', 'update', 'findById', 'findAll', 'delete']

  return TestTable
}
