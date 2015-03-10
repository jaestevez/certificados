module.exports.routes = {

  'get /': {view: 'query'},
  'post /': 'FormatController.query_cc',
  'get /generate':{view: 'homepage'},
  'get /admin':'AdminController.all_content',
  'put /admin':'AdminController.change_content',
  '/controller': 'FormatController.request',
  'post /form': 'FormatController.form',
  'post /generate-pdf': 'FormatController.form_cc',
  'post /generate-pdf-id': 'FormatController.form_cc_id',
  '/query': 'FormatController.query',
  'get /login': 'LoginController.login',
  'post /login': 'LoginController.process',
  'get /logout': 'LoginController.logout'
};
