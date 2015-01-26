module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  id: false,
  attributes: {
    name_reserved: {
      type: 'string',
      minLength: 36,
      maxLength: 36,
      primaryKey: true,
      required: true
    },
    state_reserved: {
      type: 'string',
      defaultsTo: 'no asignado',
      required: true,
      enum: ['no asignado', 'asignado', 'pendiente']
    }
  }
};
