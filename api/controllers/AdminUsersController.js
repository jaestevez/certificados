module.exports = {
  adminIU: function (req, res) {
  	var request_view;
  	function queries_model(callback){
      sails.models.user.find()
        .exec(function (err, allTheStuff) {
          /*text_request += allTheStuff.length + '<br><br><hr>';
          var req_view = '';
          for (var i = 0; i < allTheStuff.length; i++) {
            req_view += "nombre: " + allTheStuff[i].name + 'correo electronico: ' + allTheStuff[i].email;
            req_view += ' contraseña: ' + allTheStuff[i].password  + "<br><hr>";
          }
          text_request += req_view;*/
          request_view = allTheStuff;
          callback(request_view);
          console.log(allTheStuff);
        });
    }
    queries_model(function(){
      //return res.send(text_request);
      res.view('adminInterface', {users:request_view});
    });
  	res.view('homepage');
  }
};