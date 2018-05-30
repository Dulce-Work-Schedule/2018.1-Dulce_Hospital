require('seneca')()
 .use("entity")
 .use('mongo-store',{
    name: process.env.MONGO_DATABASE,
    host:process.env.MONGO_HOST,
    port: process.env.MONGO_PORT
  })
 .use('seneca-amqp-transport')
 .listen({
    type:'amqp',
    pin:'role:sector',
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_DEFAULT_USER,
    password: process.env.RABBITMQ_DEFAULT_PASS,
    url: 'amqp://'+ process.env.RABBITMQ_HOST
})

  .add('role:hospital,cmd:create', function create (msg,respond) {
    var hospital = this.make('hospitals')
    hospital.name = msg.name
    hospital.save$(function(err,hospital){
      respond(null,hospital)
    })
  })

  .add('role:hospital, cmd:listHospital', function listHospital(msg, respond){
    var hospital = this.make('hospitals');
    hospital.list$({all$:true}, function(error,hospital){
      respond(null,hospital);
    });
  })

  .add('role:hospital, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })
