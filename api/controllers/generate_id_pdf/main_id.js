var uuid  = require('node-uuid');
var generateId = function(){
  sails.models.id_reserved.find({state_reserved:'no asignado'}).exec(function findOneCB(err,found){
    if(found.length <10){
      var iterator= 0;
      while(true){
        if(iterator >= (15 - found.length))
          break;
        var id = uuid.v1(4);
        var state = false;
        for(var i = 0;i<found.length;i++){
            if(found[i].name_reserved == id){
              state = true;
              break;
            }
        }
        if(!state){
          sails.models.id_reserved.create({name_reserved:id,stated_reserved:'no asignado'}).exec(function createCB(err,created){});
          iterator++;
        }
      }
    }
  });
};
var assignId = function(impl,req,res){
  sails.models.id_reserved.findOne({state_reserved:'no asignado'}).exec(function findOneCB(err,found){
    sails.models.id_reserved.update({name_reserved:found.name_reserved},{state_reserved:'asignado'}).exec(function afterwards(err,updated){if (err) res.serverError(err);});
    impl(found.name_reserved);
  });
};
module.exports.generateId = generateId;
module.exports.assignId = assignId;
