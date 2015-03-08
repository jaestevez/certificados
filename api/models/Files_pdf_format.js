module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  id: false,
  attributes: {
    name_file: {
      type: 'string',
      minLength: 36,
      maxLength: 36,
      primaryKey: true
    },
    date_file: {
      type: 'datetime',
      required: true
    },
    id_person:{
      model: 'Person',
      required: true
    },
    validated:{
      type: 'string',
      enum: ['valido','no-valido'],
      defaultsTo: 'no-valido',
      required: true,
    }
  }
  /* Attribute methods
  getFullName: function (){
    return this.name_file + ' ' + this.date_file;
  }*/
};
