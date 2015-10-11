var uuid  = require('node-uuid');
var generateId = function(){
  sails.models.id_reserved.find({}).exec(function findOneCB(err,found){
    var assig = 0;
    for(var i = 0;i<found.length;i++)
    {
      if(found[i].state_reserved == 'no asignado')
      assig++;
    }
    console.log("numero: "+found.length+" num: "+assig+"\n");
    if(assig <10){
      var iterator= 0;
      while(iterator <(15-assig)){
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
    if(found != null)
    sails.models.id_reserved.update({name_reserved:found.name_reserved},{state_reserved:'asignado'}).exec(function afterwards(err,updated){if (err) res.serverError(err);});
    if(found != null)
    impl(found.name_reserved);
    else
    console.log("error reserva de id\n");
  });
};
var generateId_v0_9 = function(){
  sails.models.id_reserved.find({state_reserved:'no asignado'}).exec(function findOneCB(err,found){
    console.log("nuemro de ids reservados asignados: "+found.length+"\n");
    console.log(found);
    console.log(" end\n");
    if(found.length <10){
      var iterator= 0;
      while(true){
        if(iterator >= (15 - found.length))
          break;
        var id = uuid.v1(4);
        console.log(id);
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
module.exports.generateId = generateId;
module.exports.assignId = assignId;
