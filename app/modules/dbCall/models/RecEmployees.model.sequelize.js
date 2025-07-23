'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class RecEmployees extends Model {} 
  RecEmployees.init({
    sap_emp_number: { 
      type: DataTypes.STRING, 
      primaryKey: true, 
      allowNull: false 
    },
    ri_id: { 
      type: DataTypes.STRING(10), 
      allowNull: true 
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
    call_center_name: { 
      type: DataTypes.STRING(255) 
    },
    site_name_id: { 
      type: DataTypes.STRING(10) 
    },
    team_lead_number: { 
      type: DataTypes.BIGINT 
    },
    team_lead_name: { 
      type: DataTypes.STRING(255) 
    },
    shift_id: { 
      type: DataTypes.STRING(2) 
    },
    audio_ivr_ids: {
      type: DataTypes.STRING
    },
    scarborough_ivr_ids: {
      type: DataTypes.STRING
    },
    video_ivr_ids: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'RecEmployees',
    tableName: 'rec_employees',
    freezeTableName: true,
    timestamps: false
  })

  RecEmployees.api = ['employees', 'rec']
  RecEmployees.crud = ['findById', 'findAll']

  return RecEmployees
}
