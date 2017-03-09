import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | view patient');

test('visiting /view-patient', function(assert) {
  visit('/view-patient');

  andThen(function() {
    assert.equal(currentURL(), '/view-patient');
  });
});
