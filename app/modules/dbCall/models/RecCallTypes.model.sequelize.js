'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class RecCallTypes extends Model {} 
  RecCallTypes.init({
    call_type_id: { 
      type: DataTypes.STRING(5), 
      primaryKey: true, 
      allowNull: false 
    },
    call_type: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
    },
    active: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    }
  }, 
  {
    sequelize,
    modelName: 'RecCallTypes',
    tableName: 'us_rec_calltypes',
    freezeTableName: true,
    timestamps: false
  })

  RecCallTypes.api = ['data', 'calltypes']
  RecCallTypes.crud = ['findById', 'findAll']

  return RecCallTypes
}
