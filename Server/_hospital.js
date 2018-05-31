module.exports = function (opitions) {
    this.add('role:hospital,cmd:create', function create (msg,respond) {
        var hospital = this.make('hospitals')
        hospital.name = msg.name
        hospital.save$(function(err,hospital){
            respond(null,hospital)
        })
        })

        this.add('role:hospital, cmd:listHospital', function listHospital(msg, respond){
        var hospital = this.make('hospitals');
        hospital.list$({all$:true}, function(error,hospital){
            respond(null,hospital);
        });
        })

        this.add('role:hospital, cmd:error', function error(msg, respond){
        respond(null, {success:false, message: 'acesso negado'});
    })
}