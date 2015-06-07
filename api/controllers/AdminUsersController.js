module.exports = {
  adminIU: function (req, res) {
  	var request_view ="";
  	function queries_model(callback){
      sails.models.user.find()
        .exec(function (err, allTheStuff) {
          request_view = allTheStuff;
          console.log(request_view);
          callback(request_view);
        });
    }
    queries_model(function(){
      //return res.send(text_request);
      res.view('admin-interface', {data_i:request_view});
      //res.view('admin-interface');
    });
  	//res.view('homepage');
  }
};