import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | client info');

test('visiting /client-info/1 before login', function(assert) {
	invalidateSession(this.application);
	visit('client-info/1');

	andThen(function(){
		assert.notEqual(currentURL(), '/client-info/1');
	});
});

test('visiting /client-info/1', function(assert) {
	authenticateSession(this.application);
	visit('/client-info/1');

	andThen(function() {
		assert.equal(currentURL(), '/client-info/1');
	});
});

test('last name, first name is present', function(assert) {
	authenticateSession(this.application);
	visit('/client-info/1');

	andThen(function(){
		let item = find(".panel-body h4:first").text().trim();
		assert.equal(item, "Bravo, Johny");
	});
});

test('transitions to new-patient/1 after clicking Add A Patient button', function(assert){
	authenticateSession(this.application);
	visit('/client-info/1');

	click('button');
	andThen(function(){
		assert.equal(currentURL(), '/new-patient/1');
	});
});