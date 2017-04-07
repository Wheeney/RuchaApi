var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var User = require("../models/user");

var should = chai.should();
chai.use(chaiHttp);

describe('Users', function(){
  User.collection.drop();

  beforeEach(function(done){
    var newUser = new User({
      first_name:'bat',
      last_name:'man',
      email:'batman@yahoo.com',
      password:'123456',
      user_type:'admin'
    });
    newUser.save(function(err){
      done();
    });
  });
  afterEach(function(done){
    User.collection.drop();
    done();
  });
  it('should list ALL users on /users/all GET', function(done) {
    chai.request(server)
      .get('/users/all')
      .end(function(err, res){
        res.should.have.status(403);
        res.should.be.json;
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('role');
        res.body[0].should.have.property('status');
        res.body[0].should.have.property('realm');
        res.body[0].username.should.equal('batman@yahoo.com');
        res.body[0].role.should.equal('admin');
        res.body[0].status.should.equal('active');
        res.body[0].realm.should.equal('user');
        done();
      });
  });
});