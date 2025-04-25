'use strict'

const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class TEMPFormsAudio extends Model {} 
  TEMPFormsAudio.init({
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
      allowNull: false 
    },
    call_type_id: { 
      type: DataTypes.STRING(5), 
      allowNull: false 
    },
    frame_code_id: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    call_direction: { 
      type: DataTypes.STRING(10) 
    },
    audio_smp: { 
      type: DataTypes.STRING(5),
      allowNull: false
    },
    department: { 
      type: DataTypes.STRING(2), 
      allowNull: false,
      defaultValue: "QR"
    },
    introduction: { 
      type: DataTypes.SMALLINT 
    },
    question_order: { 
      type: DataTypes.SMALLINT 
    },
    foot_in_the_door: { 
      type: DataTypes.SMALLINT 
    },
    eligibility: { 
      type: DataTypes.SMALLINT 
    },
    reminders: { 
      type: DataTypes.SMALLINT 
    },
    incentive: { 
      type: DataTypes.SMALLINT 
    },
    hh_size: { 
      type: DataTypes.SMALLINT 
    },
    home_address: { 
      type: DataTypes.SMALLINT 
    },
    mailing_address: { 
      type: DataTypes.SMALLINT 
    },
    cooperation: { 
      type: DataTypes.SMALLINT 
    },
    media: { 
      type: DataTypes.SMALLINT 
    },
    media_probes: { 
      type: DataTypes.SMALLINT 
    },
    age_gender_enumeration: { 
      type: DataTypes.SMALLINT 
    },
    race: { 
      type: DataTypes.SMALLINT 
    },
    ethnicity: { 
      type: DataTypes.SMALLINT 
    },
    language_probes: { 
      type: DataTypes.SMALLINT 
    },
    employment: { 
      type: DataTypes.SMALLINT 
    },
    education: { 
      type: DataTypes.SMALLINT 
    },
    grid: { 
      type: DataTypes.SMALLINT 
    },
    internet: { 
      type: DataTypes.SMALLINT 
    },
    num_of_tvs: { 
      type: DataTypes.SMALLINT 
    },
    income: { 
      type: DataTypes.SMALLINT 
    },
    commitment: { 
      type: DataTypes.SMALLINT 
    },
    name_collection: { 
      type: DataTypes.SMALLINT 
    },
    explanation: { 
      type: DataTypes.SMALLINT 
    },
    legal_statements: { 
      type: DataTypes.SMALLINT 
    },
    email: { 
      type: DataTypes.SMALLINT 
    },
    primary_residence: { 
      type: DataTypes.SMALLINT 
    },
    tv_programming: { 
      type: DataTypes.SMALLINT 
    },
    streaming_vmvpd: { 
      type: DataTypes.SMALLINT 
    },
    privacy: { 
      type: DataTypes.SMALLINT 
    },
    install_scheduling: { 
      type: DataTypes.SMALLINT 
    },
    product: { 
      type: DataTypes.SMALLINT 
    },
    closing: { 
      type: DataTypes.SMALLINT 
    },
    comments: { 
      type: DataTypes.SMALLINT
    },
    other: { 
      type: DataTypes.SMALLINT, 
      defaultValue: 1 
    },
    coding_time: { 
      type: DataTypes.SMALLINT, 
      defaultValue: 1 
    },
    overcoming_objections: { 
      type: DataTypes.SMALLINT 
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
    modelName: 'TEMPFormsAudio',
    tableName: 'us_qa_forms_audio_historical_temp',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: false
  })
  
  TEMPFormsAudio.api = ['forms', 'temp', 'audio']
  TEMPFormsAudio.crud = ['create', 'update', 'findById', 'findAll', 'delete']
  
  return TEMPFormsAudio
}