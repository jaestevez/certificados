module.exports.routes = {

  'get /': {view: 'query'},
  'post /': 'FormatController.query_cc',
  'get /generate':'GenerateController.request',
  //'get /admin':'AdminController.all_content',
  'get /admin':'AdminController.viewAdminAngular',
  'put /admin':'AdminController.change_content',
  '/controller': 'FormatController.request',
  'post /form': 'FormatController.form',
  'post /generate-pdf': 'FormatController.form_cc',
  'post /generate-pdf-id': 'FormatController.form_cc_id',
  '/query': 'FormatController.query',
  'get /login': 'LoginController.login',
  'post /login': 'LoginController.process',
  'get /logout': 'LoginController.logout',
  //admin User API
  'get /admin-user': 'AdminUsersController.adminIU',
  'post /newAdmin': 'AdminUsersController.addAdmin',
  //API for Backbone app
  'get /registros': 'APIController.registros',
  'put /registros': 'APIController.cambioEstado',
  'delete /registros': 'APIController.eliminar',
  'get /traer': 'APIController.traer'
};
