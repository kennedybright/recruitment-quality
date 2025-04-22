'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class TEMPFormsTam extends Model {} 
  TEMPFormsTam.init({
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
    cati_id: { 
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
    frame_code_id: { 
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
    call_duration_approx: { 
      type: DataTypes.BIGINT, 
      allowNull: false 
    },
    audit_tracking: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false, 
      defaultValue: false 
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
    delivery_skills_a1_comments: { 
      type: DataTypes.TEXT 
    },
    delivery_skills_a2_comments: { 
      type: DataTypes.TEXT 
    },
    delivery_skills_a3_comments: { 
      type: DataTypes.TEXT 
    },
    delivery_skills_a4_comments: { 
      type: DataTypes.TEXT 
    },
    delivery_skills_a5_comments: { 
      type: DataTypes.TEXT 
    },
    delivery_skills_a6_comments: { 
      type: DataTypes.TEXT 
    },
    delivery_skills_a7_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b1_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b2_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b3_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b4_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b5_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b6_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b7_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b8_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b9_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b10_comments: { 
      type: DataTypes.TEXT 
    },
    compliance_b11_comments: { 
      type: DataTypes.TEXT 
    },
    delivery_skills_score: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    compliance_score: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    total_score: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    created_date: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    updated_date: { 
      type: DataTypes.DATEONLY 
    },
    created_by: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    updated_by: { 
      type: DataTypes.STRING(10) 
    }
  }, 
  {
    sequelize,
    modelName: 'TEMPFormsTam',
    tableName: 'us_qa_forms_tam_historical_temp',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: 'updated_date'
  })

  TEMPFormsTam.api = ['forms', 'temp', 'tam']
  TEMPFormsTam.crud = ['create', 'update', 'findById', 'findAll', 'delete']
  
  return TEMPFormsTam
}