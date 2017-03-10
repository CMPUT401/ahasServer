import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | create patient');

test('visiting /new-patient', function(assert) {
  visit('/new-patient');

  andThen(function() {
    assert.equal(currentURL(), '/new-patient');
  });
});

test('adding new user valid', function(assert){
  visit('/create-user');

  fillIn('#patientName', "Bob");
  fillIn('#patientSpecies', "Fred");
  fillIn('#patientGender', "M");
  fillIn('#patientStatus', "N");
  fillIn('#patientAge', "13");
  fillIn('#patientColor', "Brown");
  fillIn('#patientTatoo', "123");
  fillIn('#patientMicrochip', "111");
  click('#create-patient-button');
  andThen(function(){
    assert.equal(find('#statusGood').text());
  });
});
