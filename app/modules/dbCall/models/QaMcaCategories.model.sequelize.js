'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class QaMcaCategories extends Model {} 
  QaMcaCategories.init({
    mca_category_id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      allowNull: false 
    },
    mca_category: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
    },
    mca_priority_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, 
  {
    sequelize,
    modelName: 'QaMcaCategories',
    tableName: 'qa_mca_categories',
    freezeTableName: true,
    timestamps: false
  });

  QaMcaCategories.api = ['data', 'categories']
  QaMcaCategories.crud = ['findAll']

  return QaMcaCategories
}
