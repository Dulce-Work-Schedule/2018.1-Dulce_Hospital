// The RegExp Object above validates MongoBD ObjectIds
var checkObjectId = new RegExp('^[0-9a-fA-F]{24}$');

function validate_field(field, result){
  if (field.value == null || field.value == ''){
    result[field.field_name + '_error'] = 'O campo ' + field.verbose + ' é obrigatório.';
  } else if (typeof(field.value) != 'string') {
    result[field.field_name + '_error'] = 'O campo ' + field.verbose +' deve ser uma string.';
  }
  return result;
}

function validate_id(field, result){
  if (field.value == null || field.value == ''){
    result[field.field_name + '_error'] = 'O campo ' + field.verbose + ' é obrigatório.';
  } else if (!checkObjectId.test(field.value)) {
    result[field.field_name + '_error'] = 'O ' + field.verbose +' é inválido.';
  }
  return result;
}

module.exports = function api(options){
  this.add('role:api,path:create', function(msg,respond){
    var result = {};
    var name = {
     verbose: 'Nome do Hospital',
     field_name: 'name'
    }
    name.value = msg.args.body.name;

    result = validate_field(name, result);

    if (Object.entries(result)[0]) {
      console.log("Result:");
      console.log(result);
      result.success = false;
      respond(null, result)
    // else, everything sucess
    } else {
      this.act('role:hospital,cmd:create',{
        name:name.value
      }, respond)
    }
  })

  this.add('role:api,path:list', function(msg,respond) {
    this.act('role:hospital, cmd:list',{},respond)
  });

  this.add('role:api,path:view', function(msg,respond) {
    var hospital_id = msg.args.body.hospital_id
    var result = {};
    var hospital_id = {
     verbose: 'Hospital',
     field_name: 'hospital_id'
    }
    hospital_id.value = msg.args.query.hospital_id;

    result = validate_field(hospital_id, result);

    if (Object.entries(result)[0]) {
      console.log("Result:");
      console.log(result);
      result.success = false;
      respond(null, result)
    // else, everything sucess
    } else {
      this.act('role:hospital, cmd:view',{
        hospital_id: hospital_id
      },respond)
    }
  });

  this.add('role:api,path:error', function(msg, respond){
    this.act('role:hospital, cmd:error',{}, respond)
  });


  this.add('init:api', function (msg,respond){
    this.act('role:web',{routes: {
      prefix: '/api/hospital',
      pin:    'role:api,path:*',
      map: {
        create: { POST:true },
        list: { GET:true },
        view: { GET:true,
                    auth: {
                      strategy: 'jwt',
                      fail: '/api/hospital/error',
                    }},
        error: {GET:true}
      }
    }}, respond)
  });
}
