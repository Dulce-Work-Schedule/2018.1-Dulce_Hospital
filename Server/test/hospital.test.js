var Seneca = require('seneca')
var assert = require('assert')
var chai = require('chai')


var expect = chai.expect;

function test_hospital_seneca (fin){
  return Seneca({log: 'test'})
  .test(fin)

  .use("entity")
  .use(require('../_hospital'))
}

describe('Create hospital', function() {

  it('Hospital entity creation', function(fin){
    var seneca = test_hospital_seneca(fin)

    seneca.act({
      role: 'hospital',
      cmd: 'create',
      name: 'Hospital do Gama'
    }, function(err, result){
      expect(result.name).to.equal('Hospital do Gama')
      fin()
    })
  })
});
