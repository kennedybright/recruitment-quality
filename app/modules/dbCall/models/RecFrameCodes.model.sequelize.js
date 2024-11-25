'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class RecFrameCodes extends Model {}
  RecFrameCodes.init({
    frame_code_id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false
    },
    frame_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'RecFrameCodes',
    tableName: 'us_rec_framecodes',
    freezeTableName: true,
    timestamps: false
  })

  RecFrameCodes.api = ['data', 'framecodes']
  RecFrameCodes.crud = ['findById', 'findAll']

  return RecFrameCodes
}
