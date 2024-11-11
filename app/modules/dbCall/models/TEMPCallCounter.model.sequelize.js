'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class TEMPCallCounter extends Model {} 
  TEMPCallCounter.init({
    ri_id: { 
      type: DataTypes.STRING(10), 
      primaryKey: true, 
      allowNull: false 
    },
    total_count: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 0 
    },
    total_live: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 0 
    },
    total_non_live: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 0 
    }
  }, 
  {
    sequelize,
    timestamps: false,
    modelName: 'TEMPCallCounter'
  })

  TEMPCallCounter.api = ['forms', 'temp', 'audio', 'counter']
  TEMPCallCounter.crud = ['create', 'update', 'delete']

  return TEMPCallCounter
};
