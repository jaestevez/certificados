module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  id:false,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    cc: {
      type: 'string',
      primaryKey: true
    },
    cc_exp: {
      type: 'string',
      required: true
    },
    tel: {
      type: 'string',
      required: true
    },
    cel: {
      type: 'string'
    },
    sex: {
      type: 'string',
      required: true,
      enum: ['F','M']
    },
    time_live: {
      type: 'integer',
    },
    time_date: {
      type: 'date'
    },
    time_date_last: {
      type: 'date'
    },
    dir: {
      type: 'string',
      required: true
    },
    files_pdf_formats:{
      collection:'Files_pdf_format',
      via: 'id_person'
    }
  }
};
