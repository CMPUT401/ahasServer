'use strict';

define('ahasweb/tests/acceptance/client-info-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

	(0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | client info');

	(0, _qunit.test)('visiting /client-info/1 before login', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.invalidateSession)(this.application);
		visit('client-info/1');

		andThen(function () {
			assert.notEqual(currentURL(), '/client-info/1');
		});
	});

	(0, _qunit.test)('visiting /client-info/1', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/client-info/1');

		andThen(function () {
			assert.equal(currentURL(), '/client-info/1');
		});
	});

	(0, _qunit.test)('last name, first name is present', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/client-info/1');

		andThen(function () {
			var item = find(".panel-body h4:first").text().trim();
			assert.equal(item, "Bravo, Johny");
		});
	});

	(0, _qunit.test)('transitions to new-patient/1 after clicking Add A Patient button', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/client-info/1');

		click('button');
		andThen(function () {
			assert.equal(currentURL(), '/new-patient/1');
		});
	});
});
define('ahasweb/tests/acceptance/client-info-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/client-info-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/client-info-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/client-list-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

	(0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | client list');

	(0, _qunit.test)('visiting /client-list before login', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.invalidateSession)(this.application);
		visit('client-list');

		andThen(function () {
			assert.notEqual(currentURL(), '/client-list');
		});
	});

	(0, _qunit.test)('visiting /client-list', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/client-list');

		andThen(function () {
			assert.equal(currentURL(), '/client-list');
		});
	});

	(0, _qunit.test)('client list contains an item', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/client-list');

		andThen(function () {
			// let item = document.getElements("div.div.p").textContent;
			var item = find(".nameListItem").first().text().trim();
			assert.equal(item, "Johny Bravo");
		});
	});

	(0, _qunit.test)('should transition to /client-list/1', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/client-list');

		click(".nameListItem");
		andThen(function () {
			assert.equal(currentURL(), '/client-info/1');
		});
	});

	(0, _qunit.test)('should transition to /new-client on button click', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/client-list');

		click('#newClientLinkButton');
		andThen(function () {
			assert.equal(currentURL(), '/new-client');
		});
	});
});
define('ahasweb/tests/acceptance/client-list-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/client-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/client-list-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/create-contact-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | create contact');

  (0, _qunit.test)('visiting /create-contact', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/create-contact');

    andThen(function () {
      assert.equal(currentURL(), '/create-contact');
    });
  });

  (0, _qunit.test)('creating new contact successful', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/create-contact');

    fillIn('#first_name', "Kristy");
    fillIn('#last_name', "Newbury");
    fillIn('#phoneNumber', "123-123-1234");
    fillIn('#faxNumber', "123-123-1233");
    fillIn('#email', "k@gmail.ca");
    fillIn('#address', "12 st 53 ave");
    click('#create-contact-button');

    andThen(function () {
      assert.equal(currentURL(), '/search-contacts');
    });
  });

  (0, _qunit.test)('creating new contact no first name', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/create-contact');

    fillIn('#last_name', "Newbury");
    fillIn('#phoneNumber', "123-123-1234");
    fillIn('#faxNumber', "123-123-1233");
    fillIn('#email', "k@gmail.ca");
    fillIn('#address', "12 st 53 ave");
    click('#create-contact-button');

    andThen(function () {
      assert.equal(find('#statusBad').text(), 'First name cannot be blank');
    });
  });
});
define('ahasweb/tests/acceptance/create-contact-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/create-contact-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/create-contact-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/create-medical-record-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | create medical record');

  (0, _qunit.test)('visiting /view-patient/1/medical-record', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/view-patient/1/medical-record');

    andThen(function () {
      assert.equal(currentURL(), '/view-patient/1/medical-record');
    });
  });

  (0, _qunit.test)('create medical record success', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/view-patient/1/medical-record');

    //any touch to the signature pad should count as signature....
    //also dont really need to fill in any of the fields just for this test
    click('#signature');
    click('#create-medical-button');

    andThen(function () {
      assert.equal(find('#statusGood').text(), 'Record created, record is editable until 12pm tonight');
    });
  });

  (0, _qunit.test)('create medical record without signature', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/view-patient/1/medical-record');

    click('#create-medical-button');

    andThen(function () {
      assert.equal(find('#statusBad').text(), 'Record cannot be created without a signature');
    });
  });
});
define('ahasweb/tests/acceptance/create-medical-record-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/create-medical-record-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/create-medical-record-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/create-patient-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | create patient');

  (0, _qunit.test)('visiting /new-patient/1', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/new-patient/1');

    andThen(function () {
      assert.equal(currentURL(), '/new-patient/1');
    });
  });
});
define('ahasweb/tests/acceptance/create-patient-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/create-patient-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/create-patient-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/create-user-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | create user');

  (0, _qunit.test)('visiting /create-user', function (assert) {
    visit('/create-user');

    andThen(function () {
      assert.equal(currentURL(), '/create-user');
    });
  });

  (0, _qunit.test)('adding new user valid', function (assert) {
    visit('/create-user');

    fillIn('#name', "kristy");
    fillIn('#username', "user@gmail.ca");
    fillIn('#password', "password");
    fillIn('#passwordConfirm', "password");
    click('#create-user-button');
    andThen(function () {
      assert.equal(find('#statusGood').text(), 'Account created!');
      assert.notEqual(find('#statusBad').text(), "Incorrect email format");
    });
  });

  (0, _qunit.test)('adding invalid user, too short password', function (assert) {
    visit('/create-user');

    var pass = 'pass';

    fillIn('#name', "kristy");
    fillIn('#username', "auser@gmail.com");
    fillIn('#password', pass);
    fillIn('#passwordConfirm', pass);
    click('#create-user-button');
    andThen(function () {
      assert.equal(find('#statusBad').text(), "Password too short, must be at least 7 characters!");
      assert.notEqual(find('#statusGood').text(), "Password too short, must be at least 7 characters!");
    });
  });

  (0, _qunit.test)('adding invalid user, incorrect format email', function (assert) {
    visit('/create-user');

    fillIn('#name', "kristy");
    fillIn('#username', "usermail.ca");
    fillIn('#password', "password");
    fillIn('#passwordConfirm', "password");
    click('#create-user-button');
    andThen(function () {
      assert.equal(find('#statusBad').text(), "Incorrect email format");
    });
  });

  (0, _qunit.test)('adding invalid user, name is blank', function (assert) {
    visit('/create-user');

    fillIn('#username', "usermail@gmail.ca");
    fillIn('#password', "password");
    fillIn('#passwordConfirm', "password");
    click('#create-user-button');
    andThen(function () {
      assert.equal(find('#statusBad').text(), "Name cannot be blank");
    });
  });
});
define('ahasweb/tests/acceptance/create-user-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/create-user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/create-user-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/edit-contact-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | edit contact');

  (0, _qunit.test)('visiting /edit-contact/1', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/edit-contact/1');

    andThen(function () {
      assert.equal(currentURL(), '/edit-contact/1');
    });
  });

  (0, _qunit.test)('checking info added correctly', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/edit-contact/1');

    andThen(function () {
      //this is all we can check on this page since we cannot grab input element values for some reason
      assert.equal(find('.heading').text().trim(), 'Editing: Justin Barclay');
    });
  });

  (0, _qunit.test)('checking we can click done button', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/edit-contact/1');

    fillIn('#phoneNumber', '780-555-5555');
    click('#done-edit-button');

    andThen(function () {
      assert.equal(currentURL(), '/view-contact/1');
    });
  });
});
define('ahasweb/tests/acceptance/edit-contact-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/edit-contact-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/edit-contact-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/login-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | login');

  (0, _qunit.test)('visiting /search-patient while authenticated', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/search-patient');

    andThen(function () {
      assert.equal(currentURL(), '/search-patient');
    });
  });

  (0, _qunit.test)('visiting /search-patient while not authenticated', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.invalidateSession)(this.application);
    visit('/search-patient');

    andThen(function () {
      assert.equal(currentURL(), '/login');
    });
  });

  (0, _qunit.test)('login with valid user, correct password', function (assert) {
    visit('/login');

    fillIn('#username', 'valid@email.ca');
    fillIn('#password', 'validpassword');
    click('#login-button');

    andThen(function () {
      assert.notEqual(currentURL(), '/login');
      assert.equal(currentURL(), '/client-list');
    });
  });
});
define('ahasweb/tests/acceptance/login-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/login-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/new-calendar-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

	(0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | new-calendar');

	(0, _qunit.test)('visiting /new-calendar/ before login', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.invalidateSession)(this.application);
		visit('new-calendar');

		andThen(function () {
			assert.notEqual(currentURL(), '/new-calendar/');
		});
	});

	(0, _qunit.test)('visiting /new-calendar/', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/new-calendar/');

		andThen(function () {
			assert.equal(currentURL(), '/new-calendar/');
		});
	});

	(0, _qunit.test)('creating new calendar unsuccessful', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/new-calendar');

		fillIn('#appointmentStart', "tttt");
		fillIn('#appointmentEnd', "sssy");
		click('#create-appointment-button');
		andThen(function () {
			assert.equal(currentURL(), '/new-calendar/');
		});
	});
});
define('ahasweb/tests/acceptance/new-calendar-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/new-calendar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/new-calendar-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/new-client-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

	//import Pretender from 'pretender';

	//let serv;

	(0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | new client');

	(0, _qunit.test)('visiting /new-client', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/new-client');

		andThen(function () {
			assert.equal(currentURL(), '/new-client');
		});
	});
	/*
 moduleForAcceptance('ajax-get component', {
 	beforeEach(){
 		serv = new Pretender();
 	},
 	afterEach(){
 		serv.shutdown();
 	}
 });*/

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

	/*test('should transition to another page', function (assert){
 	
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
 		assert.equal(currentURL(), '/search-patient');
 	});
 });*/

	// function loginToTest(){
	// 	visit('/login');
	// 	fillIn('#username', 'malajeun@ualberta.ca');
	// 	fillin('#password', '1234567');
	// 	andThen(function(){
	// 		click('button:contains(Login)');
	// 	});
	// }
});
define('ahasweb/tests/acceptance/new-client-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/new-client-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/new-client-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/new-patient-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | patient info');

  (0, _qunit.test)('visiting /new-patient', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/new-patient/1');

    andThen(function () {
      assert.equal(currentURL(), '/new-patient/1');
    });
  });

  (0, _qunit.test)('adding new user valid', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/new-patient/1');

    fillIn('#patientName', "Bob");
    fillIn('#patientSpecies', "Fred");
    fillIn('#patientGender', "M");
    fillIn('#patientStatus', "N");
    fillIn('#patientAge', "13");
    fillIn('#patientColor', "Brown");
    fillIn('#patientTatoo', "123");
    fillIn('#patientMicrochip', "111");
    click('#create-patient-button');
    andThen(function () {
      assert.equal(find('#statusGood').text());
    });
  });
});
define('ahasweb/tests/acceptance/new-patient-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/new-patient-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'acceptance/new-patient-test.js should pass jshint.\nacceptance/new-patient-test.js: line 3, col 31, \'invalidateSession\' is defined but never used.\n\n1 error');
  });
});
define('ahasweb/tests/acceptance/new-side-note-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | new side note');

  (0, _qunit.test)('visiting /new-side-note/ before login', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.invalidateSession)(this.application);
    visit('/new-side-note/');

    andThen(function () {
      assert.notEqual(currentURL(), '/new-side-note/');
    });
  });

  (0, _qunit.test)('visiting /new-side-note/', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/new-side-note/');

    andThen(function () {
      assert.equal(currentURL(), '/new-side-note/');
    });
  });

  (0, _qunit.test)('creating new side note successful', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/new-side-note');

    fillIn('#medNote', "Need to take asprine 4 times a day");
    fillIn('#medSig', "Newbury");
    click('#create-sidenote-button');
    andThen(function () {
      assert.notEqual(currentURL(), '/new-side-note/');
    });
  });

  (0, _qunit.test)('creating new side note unsuccessful', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/new-side-note');

    fillIn('#medNote', "");
    fillIn('#medSig', "");
    click('#create-sidenote-button');
    andThen(function () {
      assert.Equal(currentURL(), '/new-side-note/');
    });
  });
});
define('ahasweb/tests/acceptance/new-side-note-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/new-side-note-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/new-side-note-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/search-contacts-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | search contact');

  (0, _qunit.test)('visiting /search-contacts', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/search-contacts');

    andThen(function () {
      assert.equal(currentURL(), '/search-contacts');
    });
  });

  (0, _qunit.test)('checking search info rendered before search', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/search-contacts');

    andThen(function () {
      assert.equal(find('#veterinariansHeading').text(), 'Veterinarians');
      assert.equal(find('.veterinariansContact').first().text(), 'Tony Stark');
    });
  });

  (0, _qunit.test)('checking we can search', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/search-contacts');

    fillIn('#search-bar', 'Justin');
    click('#search-button');

    andThen(function () {
      assert.equal(find('.volunteersContact').length, 1);
      assert.equal(find('.volunteersContact').first().text(), 'Justin Barclay');
    });
  });
});
define('ahasweb/tests/acceptance/search-contacts-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/search-contacts-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/search-contacts-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/search-patient-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {
	(0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | search patient');

	(0, _qunit.test)('visiting /search-patient/ before login', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.invalidateSession)(this.application);
		visit('search-patient');

		andThen(function () {
			assert.notEqual(currentURL(), '/search-patient/');
		});
	});

	(0, _qunit.test)('visiting /search-patient/', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/search-patient/');

		andThen(function () {
			assert.equal(currentURL(), '/search-patient/');
		});
	});

	(0, _qunit.test)('checking search info rendered before search', function (assert) {
		(0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
		visit('/search-patient');

		andThen(function () {
			assert.equal(find('#patientHeading').text(), 'Patients');
		});
	});
});
define('ahasweb/tests/acceptance/search-patient-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/search-patient-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/search-patient-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/vaccine-list-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | view vaccines');

  //the test passes, but visiting this page is problematic, the component starts with inital value patiantId = 0, and
  // this doesnt seem to be a problem when running bc by the time we get o ajax it has taken real value, but in the tests
  // this will make some calls with 0 and config does not intercept?
  (0, _qunit.test)('checking list added correctly', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/view-patient/1');

    click('#vaccine-component-button');

    andThen(function () {
      assert.equal(find('.vaccineList').length, 2);
    });
  });
});
define('ahasweb/tests/acceptance/vaccine-list-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/vaccine-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/vaccine-list-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/view-contact-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | view contact');

  (0, _qunit.test)('visiting /view-contact/1', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/view-contact/1');

    andThen(function () {
      assert.equal(currentURL(), '/view-contact/1');
    });
  });

  (0, _qunit.test)('checking info added correctly', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/view-contact/1');

    andThen(function () {
      assert.equal(find('#contactName').text(), 'Contact information for: Justin Barclay');
      assert.equal(find('#contactPhoneNumber').text(), 'Phone Number: 555-555-5555');
      assert.equal(find('#contactEmail').text(), 'Email: fakejustin@ualberta.ca');
      assert.equal(find('#contactFaxNumber').text(), 'Fax Number: 555-555-5556');
      assert.equal(find('#contactAddress').text(), 'Address: 116 St & 85 Ave, Edmonton, AB T6G 2R3');
    });
  });
});
define('ahasweb/tests/acceptance/view-contact-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/view-contact-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/view-contact-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/view-medical-record-editable-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | view medical record');

  (0, _qunit.test)('visiting /view-patient/1/view-medical-record/1', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/view-patient/1/view-medical-record/1');

    andThen(function () {
      assert.equal(currentURL(), '/view-patient/1/view-medical-record/1');
    });
  });

  (0, _qunit.test)('visiting /view-patient/1/view-medical-record-editable/1', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/view-patient/1/view-medical-record-editable/1');

    andThen(function () {
      assert.equal(currentURL(), '/view-patient/1/view-medical-record-editable/1');
    });
  });

  (0, _qunit.test)('medical record info shows up', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    visit('/view-patient/1/view-medical-record/1');

    andThen(function () {
      assert.equal(find('#summary')[0].value, 'fake summary');
      assert.equal(find('#attitudeBAR')[0].checked, true);
      assert.equal(find('#attitudeDepressed')[0].checked, false);
    });
  });
});
define('ahasweb/tests/acceptance/view-medical-record-editable-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/view-medical-record-editable-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/view-medical-record-editable-test.js should pass jshint.');
  });
});
define('ahasweb/tests/acceptance/view-patient-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | view patient');

  //these are commented out because they will break all tests, becuase fake model is not correct for it is not correct in mirage/config atm

  (0, _qunit.test)('visiting /view-patient/ before login', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.invalidateSession)(this.application);
    visit('view-patient');

    andThen(function () {
      assert.notEqual(currentURL(), '/view-patient');
    });
  });

  (0, _qunit.test)('visiting /view-patient', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    //visit('/view-patient');

    andThen(function () {
      //assert.equal(currentURL(), '/view-patient');
    });
  });
});
define('ahasweb/tests/acceptance/view-patient-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/view-patient-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'acceptance/view-patient-test.js should pass jshint.\nacceptance/view-patient-test.js: line 21, col 41, \'assert\' is defined but never used.\n\n1 error');
  });
});
define('ahasweb/tests/acceptance/view-side-note-test', ['exports', 'qunit', 'ahasweb/tests/helpers/module-for-acceptance', 'ahasweb/tests/helpers/ember-simple-auth'], function (exports, _qunit, _ahaswebTestsHelpersModuleForAcceptance, _ahaswebTestsHelpersEmberSimpleAuth) {

  (0, _ahaswebTestsHelpersModuleForAcceptance['default'])('Acceptance | view contact');

  //important question: is this how we are going to structure the app's urls ? sure this reflects the structure of what we are posting to but should it be this way on our end? I am open to mulitple answers -Kristy
  (0, _qunit.test)('visiting /patients/1/medical_records/1/notes/1', function (assert) {
    (0, _ahaswebTestsHelpersEmberSimpleAuth.authenticateSession)(this.application);
    //visit('/patients/1/medical_records/1/notes/1');

    andThen(function () {
      //assert.equal(currentURL(), '/patients/1/medical_records/1/notes/1');
    });
  });
});
define('ahasweb/tests/acceptance/view-side-note-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/view-side-note-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'acceptance/view-side-note-test.js should pass jshint.\nacceptance/view-side-note-test.js: line 8, col 65, \'assert\' is defined but never used.\nacceptance/view-side-note-test.js: line 3, col 31, \'invalidateSession\' is defined but never used.\n\n2 errors');
  });
});
define('ahasweb/tests/adapters/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('ahasweb/tests/app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('ahasweb/tests/authenticators/jwt.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | authenticators/jwt.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/jwt.js should pass jshint.');
  });
});
define('ahasweb/tests/components/client-list-filter.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/client-list-filter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/client-list-filter.js should pass jshint.');
  });
});
define('ahasweb/tests/components/history-container.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/history-container.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/history-container.js should pass jshint.');
  });
});
define('ahasweb/tests/components/lab-result-history.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/lab-result-history.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/lab-result-history.js should pass jshint.\ncomponents/lab-result-history.js: line 24, col 13, \'ajaxGet\' is defined but never used.\n\n1 error');
  });
});
define('ahasweb/tests/components/medication-history.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/medication-history.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/medication-history.js should pass jshint.');
  });
});
define('ahasweb/tests/components/medication-input.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/medication-input.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/medication-input.js should pass jshint.');
  });
});
define('ahasweb/tests/components/medications-container.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/medications-container.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/medications-container.js should pass jshint.');
  });
});
define('ahasweb/tests/components/patient-history.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/patient-history.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/patient-history.js should pass jshint.');
  });
});
define('ahasweb/tests/components/vaccine-history.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/vaccine-history.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/vaccine-history.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/admin.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/admin.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/admin.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/client-info.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/client-info.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/client-info.js should pass jshint.\ncontrollers/client-info.js: line 8, col 57, Missing semicolon.\ncontrollers/client-info.js: line 23, col 57, Missing semicolon.\n\n2 errors');
  });
});
define('ahasweb/tests/controllers/client-list.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/client-list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/client-list.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/create-contact.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/create-contact.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/create-contact.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/create-user.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/create-user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/create-user.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/edit-client.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/edit-client.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/edit-client.js should pass jshint.\ncontrollers/edit-client.js: line 49, col 21, \'clearFields\' is not defined.\n\n1 error');
  });
});
define('ahasweb/tests/controllers/edit-contact.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/edit-contact.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/edit-contact.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/lab-result-upload.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/lab-result-upload.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/lab-result-upload.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/list-side-note.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/list-side-note.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/list-side-note.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/login.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/medical-record.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/medical-record.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/medical-record.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/new-calendar.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/new-calendar.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/new-calendar.js should pass jshint.\ncontrollers/new-calendar.js: line 33, col 56, Missing semicolon.\ncontrollers/new-calendar.js: line 30, col 36, \'data\' is defined but never used.\ncontrollers/new-calendar.js: line 68, col 23, \'moment\' is not defined.\n\n3 errors');
  });
});
define('ahasweb/tests/controllers/new-client.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/new-client.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/new-client.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/new-patient.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/new-patient.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/new-patient.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/new-side-note.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/new-side-note.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/new-side-note.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/radiography-upload.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/radiography-upload.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/radiography-upload.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/search-contacts.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/search-contacts.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/search-contacts.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/search-patient.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/search-patient.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/search-patient.js should pass jshint.\ncontrollers/search-patient.js: line 13, col 60, \'model\' is not defined.\n\n1 error');
  });
});
define('ahasweb/tests/controllers/user.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/user.js should pass jshint.\ncontrollers/user.js: line 8, col 17, \'button\' is defined but never used.\ncontrollers/user.js: line 15, col 13, \'self\' is not defined.\ncontrollers/user.js: line 21, col 33, \'self\' is not defined.\ncontrollers/user.js: line 22, col 21, \'self\' is not defined.\ncontrollers/user.js: line 27, col 25, \'self\' is not defined.\ncontrollers/user.js: line 28, col 25, \'self\' is not defined.\ncontrollers/user.js: line 30, col 21, \'self\' is not defined.\ncontrollers/user.js: line 21, col 21, \'clearFields\' is not defined.\n\n8 errors');
  });
});
define('ahasweb/tests/controllers/view-appointment.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/view-appointment.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/view-appointment.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/view-calendar.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/view-calendar.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/view-calendar.js should pass jshint.\ncontrollers/view-calendar.js: line 5, col 33, \'view\' is defined but never used.\ncontrollers/view-calendar.js: line 5, col 24, \'jsEvent\' is defined but never used.\n\n2 errors');
  });
});
define('ahasweb/tests/controllers/view-contact.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/view-contact.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/view-contact.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/view-medical-record-editable.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/view-medical-record-editable.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/view-medical-record-editable.js should pass jshint.');
  });
});
define('ahasweb/tests/controllers/view-patient.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/view-patient.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/view-patient.js should pass jshint.\ncontrollers/view-patient.js: line 22, col 10, \'checkUpdate\' is defined but never used.\n\n1 error');
  });
});
define('ahasweb/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
    server.shutdown();
  }
});
define('ahasweb/tests/helpers/destroy-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('ahasweb/tests/helpers/ember-cli-file-picker', ['exports', 'ember'], function (exports, _ember) {

  function createFile() {
    var content = arguments.length <= 0 || arguments[0] === undefined ? ['test'] : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var name = options.name;
    var type = options.type;
    var lastModifiedDate = options.lastModifiedDate;

    var file = new Blob(content, { type: type ? type : 'text/plain' });
    file.name = name ? name : 'test.txt';

    return file;
  }

  var uploadFileHelper = function uploadFileHelper(content, options) {
    var file = createFile(content, options);

    var event = jQuery.Event('change');
    event.target = {
      files: [file]
    };

    jQuery('.file-picker__input').trigger(event);
  };

  var uploadFile = _ember['default'].Test.registerAsyncHelper('uploadFile', function (app, content, options) {
    var file = createFile(content, options);

    return triggerEvent('.file-picker__input', 'change', { target: { files: [file] } });
  });

  exports.uploadFile = uploadFile;
  exports.uploadFileHelper = uploadFileHelper;
});
/* global Blob, jQuery */
define('ahasweb/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }
});
/* global wait */
define('ahasweb/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'ahasweb/tests/helpers/start-app', 'ahasweb/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _ahaswebTestsHelpersStartApp, _ahaswebTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _ahaswebTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _ahaswebTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('ahasweb/tests/helpers/module-for-acceptance.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('ahasweb/tests/helpers/resolver', ['exports', 'ahasweb/resolver', 'ahasweb/config/environment'], function (exports, _ahaswebResolver, _ahaswebConfigEnvironment) {

  var resolver = _ahaswebResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _ahaswebConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ahaswebConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('ahasweb/tests/helpers/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('ahasweb/tests/helpers/start-app', ['exports', 'ember', 'ahasweb/app', 'ahasweb/config/environment'], function (exports, _ember, _ahaswebApp, _ahaswebConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _ahaswebConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _ahaswebApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('ahasweb/tests/helpers/start-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('ahasweb/tests/integration/components/client-list-filter-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('client-list-filter', 'Integration | Component | client list filter', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'DZDmtG71',
      'block': '{"statements":[["append",["unknown",["client-list-filter"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'Er2y45lT',
      'block': '{"statements":[["text","\\n"],["block",["client-list-filter"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('ahasweb/tests/integration/components/client-list-filter-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/client-list-filter-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/client-list-filter-test.js should pass jshint.');
  });
});
define('ahasweb/tests/integration/components/history-container-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('history-container', 'Integration | Component | history container', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '0E0mk6qi',
      'block': '{"statements":[["append",["unknown",["history-container"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': '2yORWJrn',
      'block': '{"statements":[["text","\\n"],["block",["history-container"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('ahasweb/tests/integration/components/history-container-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/history-container-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/history-container-test.js should pass jshint.');
  });
});
define('ahasweb/tests/integration/components/lab-result-history-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('lab-result-history', 'Integration | Component | lab result history', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'FbDV5bIg',
      'block': '{"statements":[["append",["unknown",["lab-result-history"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': '/W95A9xC',
      'block': '{"statements":[["text","\\n"],["block",["lab-result-history"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('ahasweb/tests/integration/components/lab-result-history-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/lab-result-history-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/lab-result-history-test.js should pass jshint.');
  });
});
define('ahasweb/tests/integration/components/medication-history-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('medication-history', 'Integration | Component | medication history', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'VfYK5MTJ',
      'block': '{"statements":[["append",["unknown",["medication-history"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'MC21AhBt',
      'block': '{"statements":[["text","\\n"],["block",["medication-history"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('ahasweb/tests/integration/components/medication-history-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/medication-history-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/medication-history-test.js should pass jshint.');
  });
});
define('ahasweb/tests/integration/components/patient-history-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('patient-history', 'Integration | Component | patient history', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'HlaCvE5j',
      'block': '{"statements":[["append",["unknown",["patient-history"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'UojCeUg7',
      'block': '{"statements":[["text","\\n"],["block",["patient-history"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('ahasweb/tests/integration/components/patient-history-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/patient-history-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/patient-history-test.js should pass jshint.');
  });
});
define('ahasweb/tests/models/client-list.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/client-list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/client-list.js should pass jshint.');
  });
});
define('ahasweb/tests/models/contact.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/contact.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/contact.js should pass jshint.');
  });
});
define('ahasweb/tests/models/new-client.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/new-client.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/new-client.js should pass jshint.');
  });
});
define('ahasweb/tests/models/new-patient.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/new-patient.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/new-patient.js should pass jshint.');
  });
});
define('ahasweb/tests/models/signup.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/signup.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/signup.js should pass jshint.');
  });
});
define('ahasweb/tests/models/user.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/user.js should pass jshint.\nmodels/user.js: line 7, col 17, \'int\' is not defined.\n\n1 error');
  });
});
define('ahasweb/tests/models/users.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/users.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/users.js should pass jshint.');
  });
});
define('ahasweb/tests/models/view-patient.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/view-patient.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/view-patient.js should pass jshint.');
  });
});
define('ahasweb/tests/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('ahasweb/tests/router.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass jshint.\nrouter.js: line 7, col 7, \'Router\' was used before it was declared, which is illegal for \'const\' variables.\n\n1 error');
  });
});
define('ahasweb/tests/routes/admin.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/admin.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/client-info.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/client-info.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/client-info.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/client-list.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/client-list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/client-list.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/create-contact.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/create-contact.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/create-contact.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/create-user.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/create-user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/create-user.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/edit-client.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/edit-client.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/edit-client.js should pass jshint.\nroutes/edit-client.js: line 2, col 8, \'AuthenticatedRouteMixin\' is defined but never used.\n\n1 error');
  });
});
define('ahasweb/tests/routes/edit-contact.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/edit-contact.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/edit-contact.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/index.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/lab-result-upload.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/lab-result-upload.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/lab-result-upload.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/list-side-note.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/list-side-note.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/list-side-note.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/login.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/medical-record.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/medical-record.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/medical-record.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/new-calendar.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/new-calendar.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-calendar.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/new-client.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/new-client.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-client.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/new-patient.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/new-patient.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-patient.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/new-side-note.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/new-side-note.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-side-note.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/radiography-upload.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/radiography-upload.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/radiography-upload.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/search-contacts.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/search-contacts.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/search-contacts.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/search-patient.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/search-patient.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/search-patient.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/user.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/user.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/view-appointment.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/view-appointment.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/view-appointment.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/view-calendar.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/view-calendar.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/view-calendar.js should pass jshint.\nroutes/view-calendar.js: line 56, col 10, \'parseDate\' is defined but never used.\n\n1 error');
  });
});
define('ahasweb/tests/routes/view-contact.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/view-contact.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/view-contact.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/view-image-record.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/view-image-record.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/view-image-record.js should pass jshint.\nroutes/view-image-record.js: line 71, col 18, Missing semicolon.\nroutes/view-image-record.js: line 2, col 8, \'AuthenticatedRouteMixin\' is defined but never used.\n\n2 errors');
  });
});
define('ahasweb/tests/routes/view-medical-record-editable.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/view-medical-record-editable.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/view-medical-record-editable.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/view-medical-record.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/view-medical-record.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/view-medical-record.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/view-patient.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/view-patient.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/view-patient.js should pass jshint.');
  });
});
define('ahasweb/tests/routes/view-side-note.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/view-side-note.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/view-side-note.js should pass jshint.');
  });
});
define('ahasweb/tests/services/ajax.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | services/ajax.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/ajax.js should pass jshint.');
  });
});
define('ahasweb/tests/test-helper', ['exports', 'ahasweb/tests/helpers/resolver', 'ember-qunit'], function (exports, _ahaswebTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_ahaswebTestsHelpersResolver['default']);
});
define('ahasweb/tests/test-helper.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('ahasweb/tests/transforms/user.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | transforms/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transforms/user.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/application-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/client-info-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:client-info', 'Unit | Controller | client info', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/client-info-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/client-info-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/client-info-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/client-list-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:client-list', 'Unit | Controller | client list', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/client-list-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/client-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/client-list-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/create-contact-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:create-contact', 'Unit | Controller | create contact', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/create-contact-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/create-contact-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/create-contact-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/create-user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:login', 'Unit | Controller | create-user', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/create-user-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/create-user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/create-user-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/edit-client-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:edit-client', 'Unit | Controller | edit client', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/edit-client-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/edit-client-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/edit-client-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/edit-contact-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:edit-contact', 'Unit | Controller | edit contact', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/edit-contact-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/edit-contact-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/edit-contact-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/lab-result-upload-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:lab-result-upload', 'Unit | Controller | lab result upload', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/lab-result-upload-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/lab-result-upload-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/lab-result-upload-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/list-side-note-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:list-side-note', 'Unit | Controller | list side note', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/list-side-note-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/list-side-note-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/list-side-note-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:login', 'Unit | Controller | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/login-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/medical-record-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:medical-record', 'Unit | Controller | medical record', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/medical-record-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/medical-record-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/medical-record-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/new-calendar-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-calendar', 'Unit | Controller | new calendar', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/new-calendar-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/new-calendar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-calendar-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/new-client-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-client', 'Unit | Controller | new client', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/new-client-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/new-client-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-client-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/new-side-note-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new-side-note', 'Unit | Controller | new side note', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/new-side-note-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/new-side-note-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-side-note-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/radiography-upload-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:radiography-upload', 'Unit | Controller | radiography upload', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/radiography-upload-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/radiography-upload-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/radiography-upload-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/search-contacts-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:search-contacts', 'Unit | Controller | search contacts', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/search-contacts-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/search-contacts-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/search-contacts-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/view-appointment-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:view-appointment', 'Unit | Controller | view appointment', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/view-appointment-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/view-appointment-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/view-appointment-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/view-calendar-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:view-calendar', 'Unit | Controller | view calendar', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/view-calendar-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/view-calendar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/view-calendar-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/view-contact-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:view-contact', 'Unit | Controller | view contact', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/view-contact-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/view-contact-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/view-contact-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/controllers/view-medical-record-editable-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:view-medical-record-editable', 'Unit | Controller | view medical record editable', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ahasweb/tests/unit/controllers/view-medical-record-editable-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/view-medical-record-editable-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/view-medical-record-editable-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/models/client-list-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('client-list', 'Unit | Model | client list', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ahasweb/tests/unit/models/client-list-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/client-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/client-list-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/models/new-client-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('new-client', 'Unit | Model | new client', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ahasweb/tests/unit/models/new-client-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/new-client-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/new-client-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/models/person-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('person', 'Unit | Model | person', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ahasweb/tests/unit/models/person-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/person-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/person-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/models/view-patient-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('view-patient', 'Unit | Model | view patient', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ahasweb/tests/unit/models/view-patient-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/view-patient-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/view-patient-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/client-info-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:client-info', 'Unit | Route | client info', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/client-info-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/client-info-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/client-info-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/client-list-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:client-list', 'Unit | Route | client list', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/client-list-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/client-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/client-list-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/create-contact-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:create-contact', 'Unit | Route | create contact', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/create-contact-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/create-contact-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/create-contact-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/create-user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:create-user', 'Unit | Route | create user', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/create-user-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/create-user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/create-user-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/edit-client-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:edit-client', 'Unit | Route | edit client', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/edit-client-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/edit-client-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/edit-client-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/edit-contact-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:edit-contact', 'Unit | Route | edit contact', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/edit-contact-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/edit-contact-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/edit-contact-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index');

  (0, _emberQunit.test)('should transition to login route', function (assert) {
    var route = this.subject({
      replaceWith: function replaceWith(routeName) {
        assert.equal(routeName, 'login', 'replace with route name login');
      }
    });
    route.beforeModel();
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/index-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/lab-result-upload-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:lab-result-upload', 'Unit | Route | lab result upload', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/lab-result-upload-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/lab-result-upload-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/lab-result-upload-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/list-side-note-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:list-side-note', 'Unit | Route | list side note', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/list-side-note-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/list-side-note-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/list-side-note-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  //it exists test covered in index-test, cant think of any else
});
define('ahasweb/tests/unit/routes/login-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/medical-record-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:medical-record', 'Unit | Route | medical record', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/medical-record-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/medical-record-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/medical-record-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/new-calendar-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-calendar', 'Unit | Route | new calendar', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/new-calendar-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/new-calendar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-calendar-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/new-client-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-client', 'Unit | Route | new client', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/new-client-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/new-client-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-client-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/new-patient-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-patient', 'Unit | Route | new patient', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/new-patient-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/new-patient-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-patient-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/new-side-note-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:new-side-note', 'Unit | Route | new side note', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/new-side-note-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/new-side-note-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-side-note-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/radiography-upload-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:radiography-upload', 'Unit | Route | radiography upload', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/radiography-upload-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/radiography-upload-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/radiography-upload-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/search-contacts-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:search-contacts', 'Unit | Route | all contacts', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/search-contacts-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/search-contacts-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/search-contacts-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/search-patient-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:search-patient', 'Unit | Route | search patient', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/search-patient-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/search-patient-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/search-patient-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/view-appointment-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:view-appointment', 'Unit | Route | view appointment', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/view-appointment-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/view-appointment-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/view-appointment-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/view-calendar-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:view-calendar', 'Unit | Route | view calendar', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/view-calendar-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/view-calendar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/view-calendar-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/view-contact-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:view-contact', 'Unit | Route | one contact', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/view-contact-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/view-contact-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/view-contact-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/view-image-record-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:view-image-record', 'Unit | Route | view image record', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/view-image-record-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/view-image-record-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/view-image-record-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/view-medical-record-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:view-medical-record', 'Unit | Route | view medical record', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/view-medical-record-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/view-medical-record-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/view-medical-record-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/view-patient-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:view-patient', 'Unit | Route | view patient', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/view-patient-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/view-patient-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/view-patient-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/routes/view-side-note-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:view-side-note', 'Unit | Route | view side note', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ahasweb/tests/unit/routes/view-side-note-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/view-side-note-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/view-side-note-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/services/ajax-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:ajax', 'Unit | Service | ajax', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('ahasweb/tests/unit/services/ajax-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/services/ajax-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/ajax-test.js should pass jshint.');
  });
});
define('ahasweb/tests/unit/transforms/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('transform:user', 'Unit | Transform | user', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var transform = this.subject();
    assert.ok(transform);
  });
});
define('ahasweb/tests/unit/transforms/user-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/transforms/user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/user-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('ahasweb/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
