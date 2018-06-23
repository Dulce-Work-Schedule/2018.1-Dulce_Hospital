module.exports = function (opitions) {

  this.add('role:hospital,cmd:create', function create (msg,respond) {
    var hospital = this.make('hospitals')
    hospital.name = msg.name
    hospital.save$(function(err,hospital){
      respond(null,hospital)
    })
  })

  this.add('role:hospital, cmd:list', function list(msg, respond){
    var hospital = this.make('hospitals');
    hospital.list$({all$:true}, function(error,hospital){
      respond(null,hospital);
    });
  })
adasdasdads
  this.add('role:hospital, cmd:view', function view(msg, respond){
    var hospital = this.make('hospitals');
    var hospital_id = msg.hospital_id;

    hospital.list$({id:hospital_id}, function(error,hospital){
      respond(null,hospital);
    });
  })

  this.add('role:hospital, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })
}
