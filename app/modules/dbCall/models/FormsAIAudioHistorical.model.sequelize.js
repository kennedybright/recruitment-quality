'use strict'

const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class FormsAIAudioHistorical extends Model {} 
  FormsAIAudioHistorical.init({
    ai_record_number: { 
      type: DataTypes.BIGINT, 
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false 
    },
    record_number: { 
      type: DataTypes.BIGINT,
      allowNull: true 
    },
    app_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    model_version: { 
      type: DataTypes.STRING(5), 
      allowNull: false 
    },
    qr_id: { 
      type: DataTypes.STRING(10), 
      allowNull: true 
    },
    ri_id: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    sample_id: { 
      type: DataTypes.BIGINT 
    },
    record_date: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    record_time: { 
      type: DataTypes.TIME, 
      allowNull: false 
    },
    ri_shift: { 
      type: DataTypes.STRING(2), 
      allowNull: false 
    },
    site_name_id: { 
      type: DataTypes.STRING(10), 
      allowNull: true 
    },
    call_type_id: { 
      type: DataTypes.STRING(5), 
      allowNull: true 
    },
    frame_code_id: { 
      type: DataTypes.STRING(10), 
      allowNull: true 
    },
    call_direction: { 
      type: DataTypes.STRING(10) 
    },
    audio_smp: { 
      type: DataTypes.STRING(10),
      allowNull: false
    },
    department: { 
      type: DataTypes.STRING(2), 
      allowNull: false,
      defaultValue: "QR"
    },
    introduction: { 
      type:DataTypes.JSONB 
    },
    question_order: { 
      type:DataTypes.JSONB 
    },
    foot_in_the_door: { 
      type:DataTypes.JSONB 
    },
    eligibility: { 
      type:DataTypes.JSONB 
    },
    reminders: { 
      type:DataTypes.JSONB 
    },
    incentive: { 
      type:DataTypes.JSONB 
    },
    hh_size: { 
      type:DataTypes.JSONB 
    },
    home_address: { 
      type:DataTypes.JSONB 
    },
    mailing_address: { 
      type:DataTypes.JSONB 
    },
    cooperation: { 
      type:DataTypes.JSONB 
    },
    media: { 
      type:DataTypes.JSONB 
    },
    media_probes: { 
      type:DataTypes.JSONB 
    },
    age_gender_enumeration: { 
      type:DataTypes.JSONB 
    },
    race: { 
      type:DataTypes.JSONB 
    },
    ethnicity: { 
      type:DataTypes.JSONB 
    },
    language_probes: { 
      type:DataTypes.JSONB 
    },
    employment: { 
      type:DataTypes.JSONB 
    },
    education: { 
      type:DataTypes.JSONB 
    },
    grid: { 
      type:DataTypes.JSONB 
    },
    internet: { 
      type:DataTypes.JSONB 
    },
    num_of_tvs: { 
      type:DataTypes.JSONB 
    },
    income: { 
      type:DataTypes.JSONB 
    },
    commitment: { 
      type:DataTypes.JSONB 
    },
    name_collection: { 
      type:DataTypes.JSONB 
    },
    explanation: { 
      type:DataTypes.JSONB 
    },
    legal_statements: { 
      type:DataTypes.JSONB 
    },
    email: { 
      type:DataTypes.JSONB 
    },
    primary_residence: { 
      type:DataTypes.JSONB 
    },
    tv_programming: { 
      type:DataTypes.JSONB 
    },
    streaming_vmvpd: { 
      type:DataTypes.JSONB 
    },
    privacy: { 
      type:DataTypes.JSONB 
    },
    install_scheduling: { 
      type:DataTypes.JSONB 
    },
    product: { 
      type:DataTypes.JSONB 
    },
    closing: { 
      type:DataTypes.JSONB 
    },
    comments: { 
      type:DataTypes.JSONB
    },
    other: { 
      type:DataTypes.JSONB, 
      // defaultValue: 1 
    },
    coding_time: { 
      type:DataTypes.JSONB, 
      // defaultValue: 1 
    },
    overcoming_objections: { 
      type:DataTypes.JSONB 
    },
    disposition: { 
      type: DataTypes.STRING(20) 
    },
    mca_category: { 
      type: DataTypes.STRING(50) 
    },
    mca_summary_observation: { 
      type: DataTypes.TEXT 
    },
    call_notes: { 
      type: DataTypes.TEXT 
    },
    improper_intro: { 
      type: DataTypes.BOOLEAN 
    },
    inaccurate_data: { 
      type: DataTypes.BOOLEAN 
    },
    leading_bias: { 
      type: DataTypes.BOOLEAN 
    },
    verbatim_break: { 
      type: DataTypes.BOOLEAN 
    },
    mandatory_text: { 
      type: DataTypes.BOOLEAN 
    },
    do_not_print: { 
      type: DataTypes.BOOLEAN 
    },
    excellent_call: { 
      type: DataTypes.BOOLEAN 
    },
    caution: { 
      type: DataTypes.BOOLEAN 
    },
    live_call: { 
      type: DataTypes.BOOLEAN 
    },
    created_date: { 
      type: DataTypes.DATE, 
      allowNull: false 
    },
    updated_date: { 
      type: DataTypes.DATE,
      defaultValue: null
    },
    created_by: { 
      type: DataTypes.STRING(10)
    },
    updated_by: { 
      type: DataTypes.STRING(10),
      defaultValue: null
    }
  },
  {
    sequelize,
    modelName: 'FormsAIAudioHistorical',
    tableName: 'qa_forms_ai_audio_historical',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: false
  })
  
  FormsAIAudioHistorical.api = ['forms', 'ai', 'audio', 'historical']
  FormsAIAudioHistorical.crud = ['create', 'update', 'findById', 'findAll', 'delete']
  
  return FormsAIAudioHistorical
}