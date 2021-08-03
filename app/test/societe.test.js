var app = require('..//../index.js'),
  chai = require('chai'),
  request = require('supertest');
 
//Test root 
describe('Get /', function() {
  it('Test root', function(done) {
  request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//Test add societe
describe('POST /societe', function() {
  it('Test add societe', function(done) {
  request(app)
    .post('/api/societe/')
    .send({title: 'Societe test'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//Test add societe
describe('Get /user', function() {
  it('Test get societe', function(done) {
  request(app)
    .get('/api/societe/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//Test add user
describe('POST /user', function() {
  it('Test post user', function(done) {
  request(app)
    .post('/api/user/')
	.send({firstname: 'User test'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

//Test add user to societe
describe('POST /user', function() {
  it('Test post user', function(done) {
  request(app)
    .post('/api/user/add-societe')
	.send({userId:1,societeId:1})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});