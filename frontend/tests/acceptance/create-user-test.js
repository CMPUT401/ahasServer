import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | create user');

test('visiting /create-user', function(assert) {
  visit('/create-user');

  andThen(function() {
    assert.equal(currentURL(), '/create-user');
  });
});

test('adding new user valid', function(assert){
  visit('/create-user');

  fillIn('#name', "kristy");
  fillIn('#username', "user@gmail.ca");
  fillIn('#password', "password");
  fillIn('#passwordConfirm', "password");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#statusGood').text(), 'Account created!');
  });
});

  test('adding invalid user, too short password', function(assert){
  visit('/create-user');
  fillIn('#username', "user@gmail.ca");
  fillIn('#password', "pass");
  fillIn('#passwordConfirm', "pass");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#statusBad').text(), "Password too short, must be at least 7 characters!");
  });
  });

  test('adding invalid user, incorrect format email', function(assert){
  visit('/create-user');
  fillIn('#username', "usermail.ca");
  fillIn('#password', "password");
  fillIn('#passwordConfirm', "password");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#statusBad').text(), "Incorrect email format");
  });

});
