module.exports.routes = {

  'get /': {view: 'homepage'},
  '/controller': 'FormatController.request',
  'post /form': 'FormatController.form',
  'post /generate-pdf': 'FormatController.form_cc',
  'post /generate-pdf-id': 'FormatController.form_cc_id',
  '/query': 'FormatController.query'
};
