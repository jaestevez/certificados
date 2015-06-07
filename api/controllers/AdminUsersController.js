module.exports = {
  adminIU: function (req, res) {
  	text_request = 'Usuarios en el sistema: ';
  	function queries_model(callback){
      sails.models.user.find()
        .exec(function (err, allTheStuff) {
          /*text_request += allTheStuff.length + '<br><br><hr>';
          var req_view = '';
          for (var i = 0; i < allTheStuff.length; i++) {
            req_view += "nombre: " + allTheStuff[i].name + 'correo electronico: ' + allTheStuff[i].email;
            req_view += ' contraseña: ' + allTheStuff[i].password  + "<br><hr>";
          }
          text_request += req_view;
          callback(text_request);*/
          res.view('adminInterface', {users:allTheStuff});
        });
    }
    /*queries_model(function(){
      return res.send(text_request);
    });*/
  	//res.view('homepage');
  }
};