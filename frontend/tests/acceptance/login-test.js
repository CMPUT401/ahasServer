import { test} from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';
import Mirage from 'ember-cli-mirage';


moduleForAcceptance('Acceptance | login');

test('visiting /afterlogin while authenticated', function(assert) {
  authenticateSession(this.application);
  visit('/search-patient');

  andThen(function() {
    assert.equal(currentURL(), '/search-patient');
  });
});

test('visiting /afterlogin while not authenticated', function(assert) {
  invalidateSession(this.application);
  visit('/search-patient');

  andThen(function() {
    assert.notEqual(currentURL(), '/search-patient');
  });
});

test('login with invalid user', function(assert) {
  invalidateSession(this.application);
  visit('/login');

  fillIn('#username','invalid@email.ca');
  fillIn('#password','invalid');
  click('#login-button');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('login with valid user, incorrect password', function(assert) {
  invalidateSession(this.application);
  visit('/login');

  fillIn('#username','valid@email.ca');
  fillIn('#password','invalid');
  click('#login-button');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

//ugh need to figure how to fake diff server reponses, this currently doesnt work
test('login with valid user, correct password', function(assert) {
  
  visit('/login');

  server.post('/api/user_token', () => {

    return new Mirage.Response(201, { jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0ODc4MTgzMTYsInN1YiI6M30.kEfDcSJAVhtM7hQrmw1EPL1YoFx5iPQCzxyIA_rOSHQ'});
  
});
  //server.post('api/user_token' , { success: true}, 201);

  fillIn('#username','valid@email.ca');
  fillIn('#password','validpassword');
  click('#login-button');
   //server.post('/user_token' , { success: true}, 201);

  andThen(function() {
    assert.equal(currentURL(), '/search-patient');
    assert.notEqual(currentURL(), '/login');
  });
});
