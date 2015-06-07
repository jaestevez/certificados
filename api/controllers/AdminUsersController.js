module.exports = {
  adminIU: function (req, res) {
  	var request_view ="";
  	function queries_model(callback){
      sails.models.user.find()
        .exec(function (err, allTheStuff) {
          text_request = ' <div class="'+"form-group"+'"> ';
          var req_view = '';
          for (var i = 0; i < allTheStuff.length; i++) {
            req_view += "<label> nombre: " + allTheStuff[i].name + '<label> <h3> correo electronico: ' + allTheStuff[i].email
            + "</h3> <hr> ";
          }
          request_view += req_view + " <div>";
          console.log(request_view);
          callback(request_view);
        });
    }
    queries_model(function(){
      //return res.send(text_request);
      res.view('admin-interface', {data_embedded:request_view});
    });
  	//res.view('homepage');
  }
};