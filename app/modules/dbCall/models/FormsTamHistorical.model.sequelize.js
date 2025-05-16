'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class FormsTamHistorical extends Model {} 
  FormsTamHistorical.init({
    record_number: { 
      type: DataTypes.BIGINT, 
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false
    },
    app_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    qr_id: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    ri_id: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    interview_id: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    record_date: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    record_time: { 
      type: DataTypes.TIME, 
      allowNull: false 
    },
    department: { 
      type: DataTypes.STRING(2), 
      allowNull: false 
    },
    ri_shift_id: { 
      type: DataTypes.STRING(2), 
      allowNull: false 
    },
    site_name_id: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    study_code_id: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    call_time: { 
      type: DataTypes.TIME, 
      allowNull: false 
    },
    call_direction: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    call_duration: { 
      type: DataTypes.BIGINT, 
      allowNull: false 
    },
    ipv_daypart: { 
      type: DataTypes.STRING(3), 
      allowNull: false 
    },
    call_outcome: { 
      type: DataTypes.STRING(50), 
      allowNull: false 
    },
    delivery_skills_a1: { 
      type: DataTypes.STRING(20) 
    },
    delivery_skills_a2: { 
      type: DataTypes.STRING(20) 
    },
    delivery_skills_a3: { 
      type: DataTypes.STRING(20) 
    },
    delivery_skills_a4: { 
      type: DataTypes.STRING(20) 
    },
    delivery_skills_a5: { 
      type: DataTypes.STRING(20) 
    },
    delivery_skills_a6: { 
      type: DataTypes.STRING(20) 
    },
    delivery_skills_a7: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b1: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b2: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b3_a: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b3_b: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b4_a: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b4_b: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b5_a: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b5_b: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b6: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b7: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b8: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b9: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b10: { 
      type: DataTypes.STRING(20) 
    },
    compliance_b11: { 
      type: DataTypes.STRING(20) 
    },
    call_notes_a: { 
      type: DataTypes.TEXT 
    },
    call_notes_b: {
      type: DataTypes.TEXT 
    },
    call_notes_misc: { 
      type: DataTypes.TEXT 
    },
    created_date: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    updated_date: { 
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    created_by: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    updated_by: { 
      type: DataTypes.STRING(10),
      defaultValue: null
    }
  }, 
  {
    sequelize,
    modelName: 'FormsTamHistorical',
    tableName: 'qa_forms_tam_historical',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: false
  })

  FormsTamHistorical.api = ['forms', 'tam', 'historical']
  FormsTamHistorical.crud = ['create', 'update', 'findById', 'findAll', 'delete']

  return FormsTamHistorical
}
