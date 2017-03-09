import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

//import Pretender from 'pretender';

let serv; 

// moduleForAcceptance('Acceptance | new client');

// test('visiting /new-client', function(assert) {
//   visit('/new-client');

//   andThen(function() {
//     assert.equal(currentURL(), '/new-client');
//   });
// });

moduleForAcceptance('ajax-get component', {
	beforeEach(){
		serv = new Pretender();
	},
	afterEach(){
		serv.shutdown();
	}
});


// test('waiting for a route with async widget', function (assert){
// 	// this test is based on the test from https://www.npmjs.com/package/ember-ajax
// 	// const PAYLOAD = [{name: 'bob',
// 	// 				address: '123 somewehere st, Edmonton',
// 	// 				phoneNumber: '780-555-1234',
// 	// 				email: 'some@email.com',
// 	// 				licos: '12345',
// 	// 				socialAssistance: '4313'},
// 	// 				{name: 'Alice',
// 	// 				address: '41 somewehere ave, Edmonton',
// 	// 				phoneNumber: '780-555-2222',
// 	// 				email: 'some1535@email.com',
// 	// 				licos: '125235',
// 	// 				socialAssistance: '5555'}];
// 	const PAYLOAD = [{ title: 'Foo' }, { title: 'Bar' }, { title: 'Baz' }];
// 	serv.get('/api/client', function(){
// 		return [200, {"Content-Type": "application/json"}, JSON.stringyfy(PAYLOAD)];
// 	}, 300);

// 	visit('/new-client');

// 	andThen(function() {
// 		assert.equal(currentURL(), '/new-client');
// 		assert.ok($('.ajax-get').length === 1, 'ajax-get component is rendered');
// 	});

// 	click('button:contains(Create Client)');

// 	andThen(function(){
// 		assert.equal($('.ajax-get li:eq(0)').text(), 'Foo');
// 		assert.equal($('.ajax-get li:eq(1)').text(), 'Bar');
//     	assert.equal($('.ajax-get li:eq(2)').text(), 'Baz');
// 	});
// });

// test('should fill in form with correct data', function (assert){

// 	authenticateSession(this.application);
// 	visit('/new-client');

// 	andThen(function(){
// 		assert.equal(currentURL(), '/new-client');
// 		assert.equal(find('#clientName').text(), '');		
// 	});

	
// 	fillIn('#clientName', 'Alice');
// 	//fillIn("input:contains(Client's Name)")
// 	//find('#clientName').change();
// 	//fillIn('#clientAddress', 'Wonderland');
// 	andThen(function(){
// 		assert.equal(find('#clientName').text(), 'Alice');
// 	});
// 	//find('#clientName').change();

// 	// andThen(function(){
// 	// 	assert.equal(find('clientName')., 'Alice');
// 	// });
	
// });

test('should transition to another page', function (assert){
	
	// visit('/login');
	// fillIn('#username', 'malajeun@ualberta.ca');
	// fillIn('#password', '1234567');
	// click('#login-button');
	// // andThen(function(){
	// // 	click('button:contains(Login)');
	// // });
	// andThen(function(){
	// 	assert.equal(currentURL(), '/afterlogin');
	// });
	authenticateSession(this.application);

	visit('/new-client');
	
	andThen(function(){
		assert.equal(currentURL(), '/new-client');
		
	});

	fillIn('#clientName', 'Alice');
	fillIn('#clientAddress', 'Wonderland');
	fillIn('#clientPhone', '555-555-5555');
	fillIn('#clientEmail', 'alice@wonderland.com');
	fillIn('#clientID', '12512');

	fillIn('#alternativeName', 'Bob McKenzie');
	fillIn('#alternativeAddress', 'Dougs place');
	fillIn('#alternativeEmail', 'bob@email.com');

	click('button:contains(Create Client)');
	//click('#create-client-button');
	andThen(function(){
		assert.notEqual(currentURL(), '/new-client');
		assert.equal(currentURL(), '/afterlogin');
	});
});

// function loginToTest(){
// 	visit('/login');
// 	fillIn('#username', 'malajeun@ualberta.ca');
// 	fillin('#password', '1234567');
// 	andThen(function(){
// 		click('button:contains(Login)');
// 	});
// }

