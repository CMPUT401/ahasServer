import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | client list');

test('visiting /client-list before login', function(assert) {
	invalidateSession(this.application);
	visit('client-list');

	andThen(function(){
		assert.notEqual(currentURL(), '/client-list');
	});
});

test('visiting /client-list', function(assert) {
	authenticateSession(this.application);
	visit('/client-list');

	andThen(function() {
		assert.equal(currentURL(), '/client-list');
	});
});

test('client list contains an item', function(assert){
	authenticateSession(this.application);
	visit('/client-list');

	andThen(function(){
		// let item = document.getElements("div.div.p").textContent;
		let item = find(".nameListItem").first().text().trim();
		assert.equal(item, "Johny Bravo");
	});
	
});

test('should transition to /client-list/1', function(assert){
	authenticateSession(this.application);
	visit('/client-list');
	
	click(".nameListItem");
	andThen(function(){
		assert.equal(currentURL(), '/client-info/1');
	});
});

test('should transition to /new-client on button click', function(assert){
	authenticateSession(this.application);
	visit('/client-list');
	
	click('#newClientLinkButton');
	andThen(function(){
		assert.equal(currentURL(), '/new-client');
	});
});