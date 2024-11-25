'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class RecEmployees extends Model {} 
  RecEmployees.init({
    ri_id: { 
      type: DataTypes.STRING(10), 
      primaryKey: true, 
      allowNull: false 
    },
    first_name: { 
      type: DataTypes.STRING(255) 
    },
    last_name: { 
      type: DataTypes.STRING(255) 
    },
    full_name: { 
      type: DataTypes.STRING(2048), 
      allowNull: false 
    },
    bilingual: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false 
    },
    lob: { 
      type: DataTypes.STRING(255) 
    },
    department: { 
      type: DataTypes.STRING(50), 
      allowNull: false 
    },
    location: { 
      type: DataTypes.STRING(255) 
    },
    callCenterName: { 
      type: DataTypes.STRING(255) 
    },
    siteNameId: { 
      type: DataTypes.STRING(10) 
    },
    teamLeadNumber: { 
      type: DataTypes.BIGINT 
    },
    teamLeadName: { 
      type: DataTypes.STRING(255) 
    },
    shiftId: { 
      type: DataTypes.STRING(2) 
    }
  },
  {
    sequelize,
    modelName: 'RecEmployees',
    tableName: 'us_rec_employees',
    freezeTableName: true,
    timestamps: false
  })

  RecEmployees.api = ['employees', 'rec']
  RecEmployees.crud = ['findById', 'findAll']

  return RecEmployees
}
