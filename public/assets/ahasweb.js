"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ahasweb/adapters/application', ['exports', 'active-model-adapter', 'ember-simple-auth/mixins/data-adapter-mixin', 'ahasweb/config/environment', 'ember-data', 'ember-ajax/mixins/ajax-support'], function (exports, _activeModelAdapter, _emberSimpleAuthMixinsDataAdapterMixin, _ahaswebConfigEnvironment, _emberData, _emberAjaxMixinsAjaxSupport) {
	exports['default'] = _activeModelAdapter['default'].extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
		host: '' + _ahaswebConfigEnvironment['default'].host
	});
	exports['default'] = _emberData['default'].JSONAPIAdapter.extend(_emberAjaxMixinsAjaxSupport['default'], {});
});
define('ahasweb/app', ['exports', 'ember', 'ahasweb/resolver', 'ember-load-initializers', 'ahasweb/config/environment'], function (exports, _ember, _ahaswebResolver, _emberLoadInitializers, _ahaswebConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _ahaswebConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ahaswebConfigEnvironment['default'].podModulePrefix,
    Resolver: _ahaswebResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _ahaswebConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ahasweb/authenticators/jwt', ['exports', 'ember', 'ember-simple-auth/authenticators/base', 'ahasweb/config/environment'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase, _ahaswebConfigEnvironment) {
  var Promise = _ember['default'].RSVP.Promise;
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    ajax: _ember['default'].inject.service(),
    tokenEndpoint: _ahaswebConfigEnvironment['default'].server + '/api/user_token',
    restore: function restore(data) {
      return new Promise(function (resolve, reject) {
        if (!_ember['default'].isEmpty(data.token)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },
    authenticate: function authenticate(creds) {
      var _this = this;

      var username = creds.username;
      var password = creds.password;

      return new Promise(function (resolve, reject) {
        return _this.get('ajax').post(_this.tokenEndpoint, {
          type: 'application/json',
          data: { auth: {
              email: username,
              password: password
            }
          }
        }).then(function (response) {
          var jwt = response.jwt;

          _ember['default'].run(function () {
            resolve({
              token: jwt
            });
          });
        }, function () {
          showAlert("The username and password you entered do not match");
        }, function (error) {
          //not sure if we will ever need this or if it is the appropriate message for whatever this condition will be
          showAlert("There was an error logging in");
          _ember['default'].run(function () {
            reject(error);
          });
        });
      });
    },
    invalidate: function invalidate(data) {
      return Promise.resolve(data);
    }
  });

  function showAlert(message) {

    _ember['default'].$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
  }
});
define('ahasweb/components/as-scrollable', ['exports', 'ember-scrollable/components/ember-scrollable'], function (exports, _emberScrollableComponentsEmberScrollable) {
  exports['default'] = _emberScrollableComponentsEmberScrollable['default'].extend({
    classNames: 'as-scrollable'
  });
});
define('ahasweb/components/bootstrap-datepicker-inline', ['exports', 'ember', 'ember-cli-bootstrap-datepicker/components/bootstrap-datepicker-inline'], function (exports, _ember, _emberCliBootstrapDatepickerComponentsBootstrapDatepickerInline) {
  exports['default'] = _emberCliBootstrapDatepickerComponentsBootstrapDatepickerInline['default'];
});
define('ahasweb/components/bootstrap-datepicker', ['exports', 'ember', 'ember-cli-bootstrap-datepicker/components/bootstrap-datepicker'], function (exports, _ember, _emberCliBootstrapDatepickerComponentsBootstrapDatepicker) {
  exports['default'] = _emberCliBootstrapDatepickerComponentsBootstrapDatepicker['default'];
});
define('ahasweb/components/client-list-filter', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		classNames: ['client-list-filter'],
		value: '',

		init: function init() {
			var _this = this;

			this._super.apply(this, arguments);
			this.get('filter')('').then(function (results) {
				return _this.set('results', results);
			});
		},

		actions: {
			handleClientFilterEntry: function handleClientFilterEntry() {
				var _this2 = this;

				var filterInputValue = this.get('value');
				var filterAction = this.get('filter');
				filterAction(filterInputValue).then(function (filterResults) {
					return _this2.set('results', filterResults);
				});
			}
		}
	});
});
define('ahasweb/components/ember-scrollable', ['exports', 'ember-scrollable/components/ember-scrollable'], function (exports, _emberScrollableComponentsEmberScrollable) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberScrollableComponentsEmberScrollable['default'];
    }
  });
});
define('ahasweb/components/ember-scrollbar', ['exports', 'ember-scrollable/components/ember-scrollbar'], function (exports, _emberScrollableComponentsEmberScrollbar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberScrollableComponentsEmberScrollbar['default'];
    }
  });
});
define('ahasweb/components/file-picker', ['exports', 'ember-cli-file-picker/components/file-picker'], function (exports, _emberCliFilePickerComponentsFilePicker) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFilePickerComponentsFilePicker['default'];
    }
  });
});
define('ahasweb/components/full-calendar', ['exports', 'ember-fullcalendar/components/full-calendar'], function (exports, _emberFullcalendarComponentsFullCalendar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFullcalendarComponentsFullCalendar['default'];
    }
  });
});
define('ahasweb/components/history-container', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		chronoIsVisible: true,
		medicationIsVisible: false,
		patientID: 0,
		actions: {
			showChronological: function showChronological() {
				// console.log("show chrono, the id is " + patientId);
				this.set('chronoIsVisible', true);
				this.set('medicationIsVisible', false);
			},
			showMedication: function showMedication() {
				// console.log("show medication, the id is " + patientId);
				this.set('chronoIsVisible', false);
				this.set('medicationIsVisible', true);
			}
		}
	});
});
define('ahasweb/components/medication-history', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		isVisible: false,
		patientId: 0,
		ajax: _ember['default'].inject.service(),
		medicationList: [],
		router: _ember['default'].inject.service('-routing'),
		actions: {
			newEntry: function newEntry() {
				console.log("making a new medical history entry");
			},
			toggleVisibility: (function () {
				// console.log("show medication, the id is " + patientId);
				if (this.get('isVisible')) {
					this.set('isVisible', false);
				} else {
					this.set('isVisible', true);
				}
			}).observes('isVisible'),
			viewEntry: function viewEntry(recordID) {
				//this.get('router').transitionTo('view-medical-record', [this.patientId, recordID]);
				console.log('view entry ' + recordID);
				this.get('router').transitionTo('view-medical-record', [this.patientId, recordID]);
			}
		},
		init: function init() {
			var _this = this;

			this._super.apply(this, arguments);
			console.log("calling ajax for medcation List");
			var self = this;
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('api/patients/' + _this.patientId + '/medications').then(function (data) {
					console.log("data is" + JSON.stringify(data));
					_ember['default'].run(function () {
						resolve({
							medications: deserialAttributes(data.medications)
						});
						// console.log(deserialAttributes(data.medical_records));
						self.set('medicationList', deserialAttributes(data.medications));
					});
				}, function (data) {
					if (data === false) {
						// self.transitionTo('/unauthorized');
						// self.get('router').transitionTo('unauthorized'); //not sure if this works
						console.log("status is " + JSON.stringify(data));
					}
				});
			});
			console.log(this.medicationList);
		}
	});

	function deserialAttributes(meds) {
		var deserial = [];
		for (var i = 0; i < meds.length; i++) {
			var entry = meds[i];
			if (entry.med_type.toLowerCase() === "medicine") {
				entry.recordId = JSON.stringify(meds[i].id).replace(/\"/g, "");
				if (JSON.stringify(meds[i].medical_record_id) != null) {
					entry.medical_record_id = JSON.stringify(meds[i].medical_record_id).replace(/\"/g, "");
				}
				// if(JSON.stringify(meds[i].med_type) === "medicine"){
				if (JSON.stringify(meds[i].name) != null) {
					entry.name = JSON.stringify(meds[i].name).replace(/\"/g, "");
				}
				if (JSON.stringify(meds[i].created_at) != null) {
					var partialDate = JSON.stringify(meds[i].created_at).replace(/\"/g, "").slice(0, 10);
					var partialDate2 = partialDate.split("-");
					entry.date = partialDate2[1] + "/" + partialDate2[2] + "/" + partialDate2[0];
				}
				deserial.push(entry);
			}

			// }else{
			// 	console.log(JSON.stringify(meds[i].med_type));
			// }
		}
		return deserial;
	}
});
define('ahasweb/components/medication-input', ['exports', 'ember'], function (exports, _ember) {

	// Simple container to capture state from entry boxes
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			// Set update action to callback passed in to component
			update: function update() {
				//this.update(this.index, this.name, this.date);
			},
			'delete': function _delete() {
				// Set delete action to delete callback passed in
				//this.delete(this.index);
			}
		}
	});
});
define('ahasweb/components/medications-container', ['exports', 'ember'], function (exports, _ember) {

  // This component dynamically renders new medications entries
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      addMedication: function addMedication() {
        // Push an empty object to medicationList
        console.log("med list", this.get('medicationList'));
        this.get('medicationList').pushObject({
          med_type: this.medType,
          name: "",
          reminder: ""
        });
      },
      updateMed: function updateMed(index, name, date) {
        // On focus change from either element update the entire entry
        _ember['default'].set(this.get('medicationList').objectAt(index), 'name', name);
        _ember['default'].set(this.get('medicationList').objectAt(index), 'reminder', date);
      },
      deleteMed: function deleteMed(index) {
        // Remove current medication from the container
        this.get('medicationList').removeAt(index);
      }
    }
  });
});
define('ahasweb/components/nav-link-to', ['exports', 'ember-bootstrap-nav-link/components/nav-link-to'], function (exports, _emberBootstrapNavLinkComponentsNavLinkTo) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapNavLinkComponentsNavLinkTo['default'];
    }
  });
});
define('ahasweb/components/patient-history', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		isVisible: true,
		patientId: 0,
		ajax: _ember['default'].inject.service(),
		medicalRecord: [],
		router: _ember['default'].inject.service('-routing'),
		actions: {
			newEntry: function newEntry() {
				this.get('router').transitionTo('medical-record', [this.patientId]);
			},
			toggleVisibility: (function () {
				// console.log("show chrono, the id is " + patientId);
				if (this.get('isVisible')) {
					this.set('isVisible', false);
				} else {
					this.set('isVisible', true);
				}
			}).observes('isVisible'),
			viewEntry: function viewEntry(recordID, date) {
				var check = checkUpdate(date);
				if (check) {
					this.get('router').transitionTo('view-medical-record-editable', [this.patientId, recordID]);
				} else {
					this.get('router').transitionTo('view-medical-record', [this.patientId, recordID]);
				}
			}
		},
		init: function init() {
			var _this = this;

			this._super.apply(this, arguments);
			console.log("calling ajax");
			var self = this;
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('api/patients/' + _this.patientId + '/medical_records').then(function (data) {
					console.log("data is" + JSON.stringify(data));
					_ember['default'].run(function () {
						resolve({
							history: deserialAttributes(data.medical_records)
						});
						// console.log(deserialAttributes(data.medical_records));
						self.set('medicalRecord', deserialAttributes(data.medical_records));
					});
				}, function (data) {
					if (data === false) {
						// self.transitionTo('/unauthorized');
						console.log("status is " + JSON.stringify(data));
					}
				});
			});
			console.log(this.medicalRecord);
		}
	});

	function deserialAttributes(history) {
		var deserial = [];
		for (var i = 0; i < history.length; i++) {
			var entry = history[i];
			entry.recordId = JSON.stringify(history[i].id).replace(/\"/g, "");
			if (JSON.stringify(history[i].exam_notes) != null) {
				entry.examNotes = JSON.stringify(history[i].summary).replace(/\"/g, "");
			} else {
				entry.examNotes = JSON.stringify(history[i].summary);
			}
			if (JSON.stringify(history[i].created_at) !== null) {
				//convert from unix time to a date string
				var formattedDateCreated = format(history[i].created_at);
				entry.dateToDisplay = formattedDateCreated;
				//also want to keep one unix time for our checkUpdate function
				entry.date = history[i].created_at;
			} else {
				//not sure when we would ever get here...
				var formattedDateOrig = format(history[i].date);
				entry.dateToDisplay = formattedDateOrig;
				entry.date = history[i].date;
			}
			deserial.push(entry);
		}
		return deserial;
	}

	function checkUpdate(olddate) {

		var date = new Date(olddate * 1000);

		var day = date.getDay();
		var month = date.getMonth();
		var year = date.getFullYear();

		var current = new Date();

		var currentDay = current.getDay();
		var currentMonth = current.getMonth();
		var currentYear = current.getFullYear();
		var currentHours = current.getHours();

		//exact minute of midnight is when we will autofinalize
		if (currentDay === day && currentMonth === month && currentYear === year && currentHours <= 24) {
			return true;
		}
		return false;
	}

	function format(date) {
		var entryDate = new Date(JSON.stringify(date).replace(/\"/g, "") * 1000);
		var day = (entryDate.getDate() < 10 ? '0' : '') + entryDate.getDate();
		var month = (entryDate.getMonth() < 10 ? '0' : '') + (entryDate.getMonth() + 1);
		var year = entryDate.getFullYear();
		var newDate = month + "/" + day + "/" + year;
		return newDate;
	}
});
define('ahasweb/components/resize-detector', ['exports', 'ember-element-resize-detector/components/resize-detector'], function (exports, _emberElementResizeDetectorComponentsResizeDetector) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberElementResizeDetectorComponentsResizeDetector['default'];
    }
  });
});
define('ahasweb/components/scroll-content-element', ['exports', 'ember-scrollable/components/scroll-content-element'], function (exports, _emberScrollableComponentsScrollContentElement) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberScrollableComponentsScrollContentElement['default'];
    }
  });
});
define('ahasweb/components/signature-pad', ['exports', 'ember', 'ember-signature-pad/components/signature-pad'], function (exports, _ember, _emberSignaturePadComponentsSignaturePad) {
  exports['default'] = _emberSignaturePadComponentsSignaturePad['default'];
});
define('ahasweb/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('ahasweb/controllers/admin', ['exports', 'ember', 'npm:fuse.js'], function (exports, _ember, _npmFuseJs) {
    exports['default'] = _ember['default'].Controller.extend({
        users: [],
        filterOn: "",
        init: function init() {
            this._super(arguments);
            this.addObserver('model', this, 'modelDidChange');
        },
        modelDidChange: function modelDidChange() {
            this.set('users', this.get('model.users'));
        },
        actions: {
            filterUsers: function filterUsers() {
                var results = undefined;
                var options = {
                    shouldSort: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: ["name", "email"]
                };
                var fuse = new _npmFuseJs['default'](this.users, options); // "list" is the item array
                if (this.filterOn == "") {
                    results = this.model.users;
                } else {
                    results = fuse.search(this.filterOn);
                }
                this.set('users', results);
            }

        }
    });
});
define('ahasweb/controllers/application', ['exports', 'ember'], function (exports, _ember) {

  //export default Ember.Controller.extend({
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });
});
define("ahasweb/controllers/client-info", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Controller.extend({
		actions: {
			newPatient: function newPatient(clientID) {
				console.log(clientID);
				this.transitionToRoute("/new-patient/").then(function (newRoute) {
					newRoute.controller.set("c_ID", clientID);
				});
				//this.transitionTo('new-patient', { queryParams: { clientID: '1' }});
			},
			viewPatient: function viewPatient(petId) {
				console.log(petId);
				this.transitionToRoute("/view-patient/" + petId);
			},
			editClient: function editClient(clientID) {
				this.transitionToRoute('/edit-client/' + clientID);
			},

			newAppointment: function newAppointment(clientID) {
				console.log(clientID);
				this.transitionToRoute("/new-calendar/").then(function (newRoute) {
					newRoute.controller.set("c_ID", clientID);
				});
			}
		}
	});
});
define('ahasweb/controllers/client-list', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		actions: {
			filterClient: function filterClient() {
				var input = document.getElementById('search-bar').value.trim();
				if (input === "" || input === undefined) {
					this.set('model.clientsFiltered', this.get('model.clients'));
				} else {
					filter(input, this.get('model'), this);
				}
			},
			viewClient: function viewClient(clientID) {
				console.log(clientID);
				this.transitionToRoute("/client-info/" + clientID);
			},
			newClient: function newClient() {
				this.transitionToRoute("/new-client/");
			}

		}
	});

	function filter(input, model, self) {
		var results = [];
		for (var i = 0; i < model.clients.length; i++) {
			if (input === model.clients[i].firstName || input === model.clients[i].lastName) {
				var client = {
					firstName: model.clients[i].firstName,
					lastName: model.clients[i].lastName,
					id: model.clients[i].id
				};
				results.push(client);
			}
		}
		self.set('model.clientsFiltered', results);
	}
});
define('ahasweb/controllers/create-contact', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        session: _ember['default'].inject.service(),
        ajax: _ember['default'].inject.service(),
        actions: {

            showLastName: function showLastName() {
                var type = document.getElementById('type');
                var typeval = type.options[type.selectedIndex].text;

                if (typeval === "Laboratory") {
                    this.set('model.laboratory', false);
                } else {
                    this.set('model.laboratory', true);
                }
            },

            createContact: function createContact() {

                //this is to get the value in the dropdown specifically
                var type = document.getElementById('type');
                var typeval = type.options[type.selectedIndex].text;
                var self = this;

                if (this.get('first_name') === undefined) {
                    showAlert("First name cannot be blank", false);
                } else if (this.get('phoneNumber') === undefined) {
                    showAlert("Phone number cannot be blank", false);
                } else if (this.get('email') === undefined) {
                    showAlert("Email cannot be blank", false);
                } else if (this.get('address') === undefined) {
                    showAlert("Address cannot be blank", false);
                } else {

                    document.getElementById("create-contact-button").disabled = true;

                    var user = this.get('ajax').post('/api/contacts', {
                        type: 'application/json',
                        data: { contact: {
                                first_name: this.get('first_name'),
                                last_name: this.get('last_name'),
                                address: this.get('address'),
                                email: this.get('email'),
                                phone_number: this.get('phoneNumber'),
                                fax_number: this.get('faxNumber'),
                                contact_type: typeval
                            }
                        }
                    });

                    user.then(function (response) {
                        if (response.success) {
                            showAlert("Contact created!", true);
                            clearFields(self);
                            self.transitionToRoute('search-contacts');
                        }
                        //this is error from server condition
                    }, function (response) {
                        if (response === false) {
                            if (self.get('session.isAuthenticated')) {
                                self.get('session').invalidate();
                            }
                            self.transitionToRoute('/login');
                        } else {
                            showAlert(response.errors[0].title, false);
                            document.getElementById("create-contact-button").disabled = false;
                        }
                    });
                }
            }
        }
    });

    function showAlert(message, bool) {
        if (bool) {
            _ember['default'].$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">' + message + '</span></div>');
        } else {
            _ember['default'].$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
        }
    }

    function clearFields(page) {
        page.set('first_name', '');
        page.set('last_name', '');
        page.set('phoneNumber', '');
        page.set('faxNumber', '');
        page.set('email', '');
        page.set('address', '');
    }
});
define('ahasweb/controllers/create-user', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({

        ajax: _ember['default'].inject.service(),
        actions: {
            createUser: function createUser() {

                var name = document.getElementById('name').value;
                var email = document.getElementById('username').value;
                var password = document.getElementById('password').value;
                var passwordConfirm = document.getElementById('passwordConfirm').value;

                console.log('the name', name);

                if (checkFormat(password, email, passwordConfirm, name) === true) {

                    var user = this.get('ajax').post('/api/signup', {
                        type: 'application/json',
                        data: { user: {
                                name: name,
                                email: email,
                                password: password,
                                password_confirmation: passwordConfirm
                            }
                        }
                    });

                    user.then(function (response) {
                        if (response.success) {
                            showAlert("Account created!", true);
                        }
                        //this is error from server condition
                    }, function (response) {
                        console.log(response.errors[0]);
                        showAlert(response.errors[0].title, false);
                    });
                }
            }
        }

    });

    /* 
     * checks the format of the email and password provided on the createUser form
     */

    function checkFormat(password, email, passwordConfirm, name) {

        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (name === undefined || name === "") {
            showAlert("Name cannot be blank", false);
            return false;
        } else if (!re.test(email)) {
            showAlert("Incorrect email format", false);
            return false;
        } else if (password.length < 7) {
            showAlert("Password too short, must be at least 7 characters!", false);
            return false;
        } else if (password !== passwordConfirm) {
            showAlert("Password and password confirmation do not match", false);
            return false;
        }

        return true;
    }

    function showAlert(message, bool) {
        if (bool) {
            _ember['default'].$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">' + message + '</span></div>');
        } else {
            _ember['default'].$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
        }
    }
});
define("ahasweb/controllers/edit-client", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Controller.extend({
		session: _ember["default"].inject.service(),
		ajax: _ember["default"].inject.service(),
		clientId: 0,
		actions: {
			saveClient: function saveClient(client) {
				//disable button
				document.getElementById("create-client-button").disabled = true;
				console.log("saving client!" + this.clientId);
				this.clientId = client.clientID;
				//make ajax put request

				var self = this;
				var ajaxPut = this.get('ajax').put('api/client/' + this.clientId, {
					type: 'application/json',
					data: { client: {
							firstName: client.firstName,
							lastName: client.lastName,
							address: client.address,
							phoneNumber: client.phoneNumber,
							email: client.email,
							licos: client.licos,
							aish: client.aish,
							socialAssistance: client.socialAssistance,
							pets: "",
							created_at: client.created_at,
							updated_at: new Date(),
							alternativeContactFirstName: client.alternativeContactFirstName,
							alternativeContactLastName: client.alternativeContactLastName,
							alternativeContactPhoneNumber: client.alternativeContactPhoneNumber,
							alternativeContactAddress: client.alternativeContactAddress,
							notes: client.notes,
							alternativeContact2ndPhone: client.alternativeContact2ndPhone,
							alternativeContactEmail: client.alternativeContactEmail,
							patients: client.patients
						} }
				}).then(function (data) {
					console.log("status is " + JSON.stringify(data));
					self.transitionToRoute('/client-info/' + self.clientId);
				}, function (response) {
					console.log("status is " + JSON.stringify(response));
					document.getElementById("create-client-button").disabled = false;
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						clearFields(self);
						self.transitionToRoute('/login');
					}
				});
				return ajaxPut;
			}
		}
	});
});
define('ahasweb/controllers/edit-contact', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    ajax: _ember['default'].inject.service(),
    actions: {
      showLastName: function showLastName() {
        var type = document.getElementById('type');
        var typeval = type.options[type.selectedIndex].text;

        if (typeval === "Laboratory") {
          this.set('model.laboratory', true);
          this.set('model.veterinarian', false);
          this.set('model.volunteer', false);
          this.set('model.technician', false);
        } else if (typeval === "Veterinarian") {
          this.set('model.laboratory', false);
          this.set('model.veterinarian', true);
          this.set('model.volunteer', false);
          this.set('model.technician', false);
        } else if (typeval === "Volunteer") {
          this.set('model.laboratory', false);
          this.set('model.veterinarian', false);
          this.set('model.volunteer', true);
          this.set('model.technician', false);
        } else {
          this.set('model.laboratory', false);
          this.set('model.veterinarian', false);
          this.set('model.volunteer', false);
          this.set('model.technician', true);
        }
      },
      doneEditContact: function doneEditContact(id) {

        var type = document.getElementById('type');
        var typeval = type.options[type.selectedIndex].text;
        var self = this;

        var user = this.get('ajax').put('/api/contacts/' + id, {
          type: 'application/json',
          data: { contact: {
              first_name: document.getElementById('first_name').value,
              last_name: document.getElementById('last_name').value,
              address: document.getElementById('address').value,
              email: document.getElementById('email').value,
              phone_number: document.getElementById('phoneNumber').value,
              fax_number: document.getElementById('faxNumber').value,
              contact_type: typeval
            }
          }
        });
        user.then(function (response) {

          if (response.success) {

            showAlert("Record updated", true);
            self.transitionToRoute('/view-contact/' + id);
          }
          //this is error from server condition
        }, function (response) {
          showAlert("Could not update", false);
          console.log("status is " + JSON.stringify(response));
          if (response === false) {
            if (self.get('session.isAuthenticated')) {
              self.get('session').invalidate();
            }
            self.transitionToRoute('/login');
          }
        });
      }
    }
  });

  function showAlert(message, bool) {
    if (bool) {
      _ember['default'].$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">' + message + '</span></div>');
    } else {
      _ember['default'].$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
    }
  }
});
define('ahasweb/controllers/lab-result-upload', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		loadedFile: null,
		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		actions: {
			fileLoaded: function fileLoaded(file) {
				this.set('loadedFile', file);
				// console.log("name is " + file.name);
				// console.log("type is " + file.type);
				// console.log("data is ");
				// //console.log(file.data);
				// console.log("size is " + file.size + " bytes");
			},
			sendLabResults: function sendLabResults(patientId) {
				document.getElementById("saveLabResults").disabled = true;
				console.log("uploading file " + this.loadedFile.name + " " + this.loadedFile.data);
				console.log("patient id is " + patientId);
				console.log("date is " + this.get('datePicker'));
				var self = this;
				var ajaxPost = this.get('ajax').post('api/patients/' + patientId + "/images", {
					type: 'application/json',
					data: { image: {
							patient_id: patientId,
							file_name: this.loadedFile.name,
							data: this.loadedFile.data,
							picture_type: "lab result",
							date: this.get('datePicker')
						} }
				}).then(function (response) {
					console.log("status is " + JSON.stringify(response));
					self.transitionToRoute('/view-patient/' + patientId);
				}, function (response) {
					document.getElementById("saveLabResults").disabled = false;
					console.log("status is " + JSON.stringify(response));
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionToRoute('/login');
					}
				});
				return ajaxPost;
			}
		}
	});
});
define('ahasweb/controllers/list-side-note', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        actions: {
            getNote: function getNote(note) {
                //console.log("we get here", patient);
                this.transitionToRoute('/api/patients/1/medical_records/1/notes/' + note);
            },
            createSideNote: function createSideNote(patientID, medID) {
                console.log(patientID + medID);
                this.transitionToRoute('/new-side-note/' + [patientID, medID]);
            }
        }
    });
});
define('ahasweb/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service(),

    actions: {
      authenticate: function authenticate() {
        var _this = this;

        var credentials = this.getProperties('username', 'password');
        var username = credentials.username;
        var password = credentials.password;

        var inputFilled = checkFields(username, password);
        if (inputFilled === false) {
          showAlert('Please fill in all fields');
        } else if (this.get('session.isAuthenticated')) {
          showAlert('You are already logged in!');
        } else if (inputFilled) {
          var authenticator = 'authenticator:jwt';
          this.get('session').authenticate(authenticator, credentials)['catch'](function (reason) {
            _this.set('errorMessage', reason.error || reason);
          });
        }
      }
    }
  });

  //make sure that we dont post undefined to server
  function checkFields(username, password) {
    if (username === undefined || password === undefined) {
      return false;
    }
    return true;
  }
  function showAlert(message) {

    _ember['default'].$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
  }
});
define('ahasweb/controllers/medical-record', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        medicine: [],
        vaccine: [],
        other: [],
        color: '#000', // default
        height: 68, // default
        weight: 1, // default
        width: 250, // default

        signature: _ember['default'].computed(function () {
            return _ember['default'].A();
        }),

        stringifiedSignature: _ember['default'].computed('signature.[]', function () {
            return JSON.stringify(this.get('signature'));
        }),

        ajax: _ember['default'].inject.service(),

        actions: {

            show: function show() {
                var self = this;
                gatherMedications(this.get('model.patientID'), self);
            },

            createMedicalRecord: function createMedicalRecord() {

                var self = this;
                var date = Math.floor(Date.now() / 1000);

                if (this.get('signature').length !== 0) {

                    //var medications = gatherMedications(this.get('model.patientID'));

                    var bcsvalue = document.getElementById('bcsvalue');
                    var bcsVal = bcsvalue.options[bcsvalue.selectedIndex].text;

                    var unit = document.getElementById('unit');
                    var weightUnit = unit.options[unit.selectedIndex].text;

                    //note hardcoded patients id until it is passed to me.
                    //also important note: the commented out things to send are to aniticipated to be implemented on the backend later on.
                    var medicalRecord = this.get('ajax').post('/api/patients/' + this.get('model.patientID') + '/medical_records', {
                        type: 'application/json',
                        data: {
                            medical_record: {

                                date: date,
                                patient_id: this.get('model.patientID'),

                                signature: exportSignature(this.get('stringifiedSignature')),

                                //inputs
                                temperature: document.getElementById('temperatureText').value,
                                eyes: document.getElementById('eyesText').value,
                                oral: document.getElementById('oralText').value,
                                ears: document.getElementById('earsText').value,
                                glands: document.getElementById('glandsText').value,
                                skin: document.getElementById('skinText').value,
                                abdomen: document.getElementById('abdomenText').value,
                                urogential: document.getElementById('urogentialText').value,
                                nervousSystem: document.getElementById('nervousSystemText').value,
                                musculoskeletal: document.getElementById('musculoskeletalText').value,
                                cardiovascular: document.getElementById('cardiovascularText').value,
                                heart_rate: document.getElementById('hrText').value,
                                respiratory: document.getElementById('respiratoryText1').value,
                                respiratory_rate: document.getElementById('respiratoryText2').value,

                                //checkboxes
                                attitudeBAR: document.getElementById('attitudeBAR').checked,
                                attitudeQAR: document.getElementById('attitudeQAR').checked,
                                attitudeDepressed: document.getElementById('attitudeDepressed').checked,
                                eyesN: document.getElementById('eyesN').checked,
                                eyesA: document.getElementById('eyesA').checked,
                                oralN: document.getElementById('oralN').checked,
                                oralA: document.getElementById('oralA').checked,
                                mmN: document.getElementById('mmN').checked,
                                mmPale: document.getElementById('mmPale').checked,
                                mmJaundiced: document.getElementById('mmJaundiced').checked,
                                mmTacky: document.getElementById('mmTacky').checked,
                                earsN: document.getElementById('earsN').checked,
                                earsA: document.getElementById('earsA').checked,
                                earsEarMites: document.getElementById('earsEarMites').checked,
                                earsAU: document.getElementById('earsAU').checked,
                                earsAD: document.getElementById('earsAD').checked,
                                earsAS: document.getElementById('earsAS').checked,
                                glandsN: document.getElementById('glandsN').checked,
                                glandsA: document.getElementById('glandsA').checked,
                                skinN: document.getElementById('skinN').checked,
                                skinA: document.getElementById('skinA').checked,
                                abdomenN: document.getElementById('abdomenN').checked,
                                abdomenA: document.getElementById('abdomenA').checked,
                                urogentialN: document.getElementById('urogentialN').checked,
                                urogentialA: document.getElementById('urogentialA').checked,
                                nervousSystemN: document.getElementById('nervousSystemN').checked,
                                nervousSystemA: document.getElementById('nervousSystemA').checked,
                                musculoskeletalN: document.getElementById('musculoskeletalN').checked,
                                musculoskeletalA: document.getElementById('musculoskeletalA').checked,
                                cardiovascularN: document.getElementById('cardiovascularN').checked,
                                cardiovascularA: document.getElementById('cardiovascularA').checked,
                                respiratoryN: document.getElementById('respiratoryN').checked,
                                respiratoryA: document.getElementById('respiratoryA').checked,

                                mcsN: document.getElementById('mcsN').checked,
                                mcsMild: document.getElementById('mcsMild').checked,
                                mcsMod: document.getElementById('mcsMod').checked,
                                mcsSevere: document.getElementById('mcsSevere').checked,
                                weight: document.getElementById('weight').value,

                                //dropdown values
                                weightUnit: weightUnit,
                                bcsVal: bcsVal,

                                //textareas
                                follow_up_instructions: document.getElementById('followUpNotes').value,
                                exam_notes: document.getElementById('notes').value,
                                summary: document.getElementById('summary').value

                            },
                            medications: gatherMedications(this.get('model.patientID'), self)

                        }

                    });

                    medicalRecord.then(function (response) {
                        if (response.success) {
                            showAlert("Record created, record is editable until 12pm tonight", true);
                        }
                        //this is error from server condition
                    }, function (response) {
                        console.log("status is " + JSON.stringify(response), response);
                        if (response === false) {
                            if (self.get('session.isAuthenticated')) {
                                self.get('session').invalidate();
                            }
                            self.transitionToRoute('/login');
                        }
                    });
                } else {
                    showAlert("Record cannot be created without a signature", false);
                }
            },

            clearSignature: function clearSignature() {
                this.set('signature', _ember['default'].A());
            },

            checkAll: function checkAll() {
                var normals = document.getElementsByClassName("norm");
                for (var i = 0; i < normals.length; i++) {
                    normals[i].checked = true;
                }
            },
            uncheckAll: function uncheckAll() {
                var normals = document.getElementsByClassName("norm");
                for (var i = 0; i < normals.length; i++) {
                    normals[i].checked = false;
                }
            }

        }
    });

    function showAlert(message, bool) {
        if (bool) {
            _ember['default'].$('#alert_placeholder_med').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">' + message + '</span></div>');
        } else {
            _ember['default'].$('#alert_placeholder_med').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
        }
    }

    function exportSignature() {

        var canvas = document.querySelector("canvas");
        var img = canvas.toDataURL("image/png");
        return img;
    }

    function gatherMedications(id, self) {
        var medications = [];
        var formattedMedicine = formatReminders(self.get('medicine'), self.get('model.patientID'));
        var formattedVaccine = formatReminders(self.get('vaccine'), self.get('model.patientID'));
        var formattedOther = formatReminders(self.get('other'), self.get('model.patientID'));
        medications.push.apply(medications, formattedMedicine);
        medications.push.apply(medications, formattedVaccine);
        medications.push.apply(medications, formattedOther);
        console.log(medications);
        return medications;
    }

    function formatReminders(items, id) {

        var newList = [];

        for (var i = 0; i < items.length; i++) {
            if (items[i].reminder !== "") {
                var newObjectReminder = formatDate(items[i].reminder);
                var newObject1 = { patient_id: id, name: items[i].name, med_type: items[i].med_type, reminder: newObjectReminder };
                newList.push(newObject1);
            } else {
                var newObject2 = { patient_id: id, name: items[i].name, med_type: items[i].med_type, reminder: '' };
                newList.push(newObject2);
            }
        }

        return newList;
    }

    function formatDate(date) {
        var half = new Date(date);
        var formatted = Math.floor(half.getTime() / 1000);
        return formatted;
    }
});
define('ahasweb/controllers/new-calendar', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		ajax: _ember['default'].inject.service(),
		session: _ember['default'].inject.service(),
		actions: {
			submitNewCalendar: function submitNewCalendar() {
				console.log(JSON.stringify(formatDate(document.getElementById("appointmentStart").value, this.get('appointmentStartTime'))));
				document.getElementById("create-appointment-button").disabled = true;
				var self = this;
				var ajaxPost = this.get('ajax').request('/api/schedules', {
					method: 'POST',
					type: 'application/json',
					data: { schedule: {
							appointmentStartDate: JSON.stringify(formatDate(document.getElementById("appointmentStart").value, this.get('appointmentStartTime'))),
							clientId: this.get('c_ID'),
							reason: this.get('appointmentReason'),
							notes: this.get('appointmentNote'),
							location: this.get('appointmentLocation'),
							appointmentEndDate: JSON.stringify(formatDate(document.getElementById("appointmentEnd").value, this.get('appointmentEndTime')))
						}

					}

				});
				ajaxPost.then(function (data) {
					//console.log("status is " + model.clientid);
					showAlert("Appointment created!", true);
					self.transitionToRoute('view-calendar');
				}, function (data) {
					document.getElementById("create-appointment-button").disabled = false;
					if (data === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionToRoute('/unauthorized');
					}
				});
				return ajaxPost;
			}
		}

	});

	function showAlert(message, bool) {
		if (bool) {
			_ember['default'].$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">' + message + '</span></div>');
		} else {
			_ember['default'].$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
		}
	}

	function formatDate(date, time) {
		var splitdate = date.split("/");
		var splittime = time.split(":");
		var newdate = [];
		newdate.push(splitdate[2]);
		newdate.push(splitdate[0] - 1);
		newdate.push(splitdate[1]);
		var rightdate = newdate.concat(splittime);
		var formatted = moment(rightdate).unix();
		//var half = new Date(date);
		//var formatted = Math.floor(half.getTime() / 1000);
		return formatted;
	}
});
define("ahasweb/controllers/new-client", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Controller.extend({
		session: _ember["default"].inject.service(),
		ajax: _ember["default"].inject.service(),
		//let cName, let cAddress, let cPhone,
		actions: {
			submitNewClient: function submitNewClient() {
				//disable button
				document.getElementById("create-client-button").disabled = true;
				console.log("making new client!");
				//make asynch post request
				var self = this;
				//let cName = this.get('clientName');
				//TODO check inputs
				var ajaxPost = this.get('ajax').post('/api/client', {
					type: 'application/json',
					data: { client: {
							firstName: this.get('clientFirstName'),
							lastName: this.get('clientLastName'),
							address: this.get('clientAddress'),
							phoneNumber: this.get('clientPhone'),
							email: this.get('clientEmail'),
							licos: this.get('clientLICO'),
							aish: this.get('clientAISH'),
							socialAssistance: this.get('clientAS'),
							pets: "",
							created_at: new Date(),
							updated_at: "",
							alternativeContactFirstName: this.get('alternativeFirstName'),
							alternativeContactLastName: this.get('alternativeLastName'),
							alternativeContactPhoneNumber: this.get('alternativePrimaryPhone'),
							alternativeContactAddress: this.get('alternativeAddress'),
							notes: this.get('clientNotes'),
							alternativeContact2ndPhone: this.get('alternativeSecondaryPhone'),
							alternativeContactEmail: this.get('alternativeEmail')
						} }
				}).then(function (data) {
					//console.log("name is " + cName);
					// TODO display confrimation page
					// TODO prevent user from going back into this page
					console.log("status is " + JSON.stringify(data));
					clearFields(self);
					self.transitionToRoute('client-list');
				}, function (response) {
					console.log("status is " + JSON.stringify(response));
					document.getElementById("create-client-button").disabled = false;
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						clearFields(self);
						self.transitionToRoute('/login');
					}
				});
				//createNewCLient();
				//this.transitionToRoute('/login');
				return ajaxPost;
			}
		}
	});

	function clearFields(page) {
		page.set('clientFirstName', '');
		page.set('clientLastName', '');
		page.set('clientAddress', '');
		page.set('clientPhone', '');
		page.set('clientEmail', '');
		page.set('clientLICO', '');
		page.set('clientAISH', '');
		page.set('clientAS', '');
		page.set('alternativeFirstName', '');
		page.set('alternativeLastName', '');
		page.set('alternativePrimaryPhone', '');
		page.set('alternativeAddress', '');
		page.set('clientNotes', '');
		page.set('alternativeSecondaryPhone', '');
		page.set('alternativeEmail', '');
	}
});
define('ahasweb/controllers/new-patient', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		ajax: _ember['default'].inject.service(),
		//queryParams: ['clientID'],
		session: _ember['default'].inject.service(),
		actions: {

			submitNewPatient: function submitNewPatient() {
				var self = this;
				var ajaxPost = this.get('ajax').request('/api/patients', {
					method: 'POST',
					type: 'application/json',
					data: { patient: {

							client: this.get('c_ID'),
							species: this.get('patientSpecies'),
							first_name: this.get('patientFirstName'),
							last_name: this.get('patientLastName'),
							age: this.get('patientAge'),
							colour: this.get('patientColor'),
							tattoo: this.get('patientTatoo'),
							microchip: this.get('patientMicrochip'),
							gender: this.get('patientGender'),
							reproductive_status: this.get('patientStatus')

						}

					}

				});
				ajaxPost.then(function (data) {
					//console.log(this.c_ID);
					console.log("status is " + JSON.stringify(data));
					self.transitionToRoute('search-patient');
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionToRoute('/login');
					}
				});
				return ajaxPost;
			}
		}

	});
});
define('ahasweb/controllers/new-side-note', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({

		//currently commented out because backend isn't implemented
		ajax: _ember['default'].inject.service(),
		session: _ember['default'].inject.service(),
		actions: {
			submitNewNote: function submitNewNote() {
				var self = this;
				var ajaxPost = this.get('ajax').request('/api/patients/1/medical_records/1/notes', {
					method: 'POST',
					type: 'application/json',
					data: { note: {
							medical_record_id: "1",
							body: this.get('medNotes'),
							initials: this.get('medSignature')

						}

					}

				});
				ajaxPost.then(function (data) {
					console.log("status is " + data);
					self.transitionTo('/api/patients/1/medical_records/1');
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
					}
				});
				return ajaxPost;
			}
		}

	});
});
define('ahasweb/controllers/search-contacts', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        actions: {
            getContact: function getContact(contact) {
                console.log("we get here", contact);
                this.transitionToRoute('/view-contact/' + contact);
            },
            filterContact: function filterContact() {
                var input = document.getElementById('search-bar').value.trim();
                if (input === "" || input === undefined) {

                    //on empty input reset to show all

                    this.set('model.contactsFilteredVeterinarian', this.get('model.contactsVeterinarian'));
                    this.set('model.contactsFilteredVolunteer', this.get('model.contactsVolunteer'));
                    this.set('model.contactsFilteredLaboratory', this.get('model.contactsLaboratory'));
                } else {

                    var lowerCaseInput = input.toLowerCase();

                    filter(lowerCaseInput, this.get('model'), this);
                }
            }
        }
    });

    function filter(input, model, self) {

        var reg = new RegExp(input);
        console.log(reg);

        //filter volunteers
        var resultVolunteer = [];
        for (var i = 0; i < model.contactsVolunteer.length; i++) {

            var firstNameVolunteer = model.contactsVolunteer[i].first_name.toLowerCase();
            var lastNameVolunteer = model.contactsVolunteer[i].last_name.toLowerCase();
            var volunteerFullName = firstNameVolunteer + " " + lastNameVolunteer;

            if (input === firstNameVolunteer || input === lastNameVolunteer || input === volunteerFullName || reg.test(volunteerFullName)) {

                var contactVolunteer = { first_name: model.contactsVolunteer[i].first_name, last_name: model.contactsVolunteer[i].last_name, id: model.contactsVolunteer[i].id };
                resultVolunteer.push(contactVolunteer);
            }
        }

        self.set('model.contactsFilteredVolunteer', resultVolunteer);

        //filter veterinarians
        var resultVeterinarian = [];
        for (var x = 0; x < model.contactsVeterinarian.length; x++) {

            var firstNameVeterinarian = model.contactsVeterinarian[x].first_name.toLowerCase();
            var lastNameVetrinarian = model.contactsVeterinarian[x].last_name.toLowerCase();
            var veterinarianFullName = firstNameVeterinarian + " " + lastNameVetrinarian;

            if (input === firstNameVeterinarian || input === lastNameVetrinarian || input === veterinarianFullName || reg.test(veterinarianFullName)) {

                var contactVeterinarian = { first_name: model.contactsVeterinarian[x].first_name, last_name: model.contactsVeterinarian[x].last_name, id: model.contactsVeterinarian[x].id };
                resultVeterinarian.push(contactVeterinarian);
            }
        }
        self.set('model.contactsFilteredVeterinarian', resultVeterinarian);

        //filter laboratory
        var resultLaboratory = [];
        for (var j = 0; j < model.contactsLaboratory.length; j++) {

            var firstNameLaboratory = model.contactsLaboratory[j].first_name.toLowerCase();
            var lastNameLaboratory = model.contactsLaboratory[j].last_name.toLowerCase();
            var LaboratoryFullName = firstNameLaboratory + " " + lastNameLaboratory;

            if (input === firstNameLaboratory || input === lastNameLaboratory || input === LaboratoryFullName || reg.test(LaboratoryFullName)) {

                var contactLaboratory = { first_name: model.contactsLaboratory[j].first_name, last_name: model.contactsLaboratory[j].last_name, id: model.contactsLaboratory[j].id };
                resultLaboratory.push(contactLaboratory);
            }
        }
        self.set('model.contactsFilteredLaboratory', resultLaboratory);
    }
});
define('ahasweb/controllers/search-patient', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        actions: {
            getPatient: function getPatient(patient) {
                console.log("we get here", patient);
                this.transitionToRoute('/view-patient/' + patient);
            },
            filterPatient: function filterPatient() {
                var input = document.getElementById('search-bar').value.trim();
                if (input === "" || input === undefined) {
                    this.set('model.patientFiltered', this.get(model.patients));
                } else {
                    filter(input, this.get('model'), this);
                }
            }
        }
    });

    function filter(input, model, self) {
        var results = [];
        for (var i = 0; i < model.patients.length; i++) {
            if (input === model.patients[i].first_name || input === model.patients[i].last_name) {
                var patient = {
                    first_name: model.patients[i].first_name,
                    last_name: model.patients[i].last_name,
                    id: model.patients[i].id
                };
                results.push(patient);
            }
        }
        self.set('model.patientFiltered', results);
    }
});
define("ahasweb/controllers/test", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Controller.extend({
        nullObject: { "hello": "null", "world": "null", "there": "null" },
        actions: {
            fixnull: function fixnull() {
                var keys = Object.keys(this.nullObject);
                var newNullObject = this.nullObject;
                keys.forEach(function (key) {
                    if (newNullObject[key] === "null") {
                        _ember["default"].set(newNullObject, key, "Blah");
                    }
                });
                this.set('nullObject', newNullObject);
            }
        }
    });
});
define("ahasweb/controllers/user", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Controller.extend({
        session: _ember["default"].inject.service(),
        ajax: _ember["default"].inject.service(),
        actions: {
            resetPassword: function resetPassword() {
                var button = document.getElementById("reset");
                // Empty functions
            },
            deleteUser: function deleteUser() {
                var deleteButton = document.getElementById("delete");
                deleteButton.disable = true;
                // Empty functions
                self = this;
                var user = this.get('ajax')["delete"]('/api/users/' + this.get('model.user').id);

                user.then(function (response) {
                    if (response.success) {
                        showAlert("User deleted!", true);
                        clearFields(self);
                        self.transitionToRoute('search-contacts');
                    }
                    //this is error from server condition
                }, function (response) {
                    if (response === false) {
                        if (self.get('session.isAuthenticated')) {
                            self.get('session').invalidate();
                        }
                        self.transitionToRoute('/login');
                    } else {
                        showAlert(response.error, false);
                        deleteButton.disable = false;
                    }
                });
            }
        }
    });

    function showAlert(message, bool) {
        if (bool) {
            _ember["default"].$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">' + message + '</span></div>');
        } else {
            _ember["default"].$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
        }
    }
});
define('ahasweb/controllers/view-appointment', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define("ahasweb/controllers/view-calendar", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Controller.extend({
        actions: {
            clicked: function clicked(event, jsEvent, view) {
                //console.log(`${event.id} was clicked!`);
                //console.log(`${event.id}`);
                var appointmentid = "" + event.id;
                //console.log(appointmentid);
                this.transitionToRoute("/view-appointment/" + appointmentid);
            }
        }
    });
});
define('ahasweb/controllers/view-contact', ['exports', 'ember'], function (exports, _ember) {
   exports['default'] = _ember['default'].Controller.extend({
      actions: {
         gotoEditContact: function gotoEditContact(id) {
            this.transitionToRoute('/edit-contact/' + id);
         }
      }
   });
});
define('ahasweb/controllers/view-medical-record-editable', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        medicine: [],
        vaccine: [],
        other: [],
        ajax: _ember['default'].inject.service(),
        actions: {

            show: function show(id) {
                var self = this;
                gatherMedications(id, self);
            },

            updateMedicalRecord: function updateMedicalRecord(id) {

                var self = this;

                var bcsvalue = document.getElementById('bcsvalue');
                var bcsVal = bcsvalue.options[bcsvalue.selectedIndex].text;

                var unit = document.getElementById('unit');
                var weightUnit = unit.options[unit.selectedIndex].text;

                var medicalRecord = this.get('ajax').put('/api/patients/' + id + '/medical_records/19', {
                    type: 'application/json',
                    data: {
                        medical_record: {

                            //things that are not updateable on our form
                            date: this.get('model.unixDate'),
                            patient_id: id,
                            signature: this.get('model.signature'),

                            //inputs
                            temperature: document.getElementById('temperatureText').value,
                            eyes: document.getElementById('eyesText').value,
                            oral: document.getElementById('oralText').value,
                            ears: document.getElementById('earsText').value,
                            glands: document.getElementById('glandsText').value,
                            skin: document.getElementById('skinText').value,
                            abdomen: document.getElementById('abdomenText').value,
                            urogential: document.getElementById('urogentialText').value,
                            nervousSystem: document.getElementById('nervousSystemText').value,
                            musculoskeletal: document.getElementById('musculoskeletalText').value,
                            cardiovascular: document.getElementById('cardiovascularText').value,
                            heart_rate: document.getElementById('hrText').value,
                            respiratory: document.getElementById('respiratoryText1').value,
                            respiratory_rate: document.getElementById('respiratoryText2').value,

                            //checkboxes
                            attitudeBAR: document.getElementById('attitudeBAR').checked,
                            attitudeQAR: document.getElementById('attitudeQAR').checked,
                            attitudeDepressed: document.getElementById('attitudeDepressed').checked,
                            eyesN: document.getElementById('eyesN').checked,
                            eyesA: document.getElementById('eyesA').checked,
                            oralN: document.getElementById('oralN').checked,
                            oralA: document.getElementById('oralA').checked,
                            mmN: document.getElementById('mmN').checked,
                            mmPale: document.getElementById('mmPale').checked,
                            mmJaundiced: document.getElementById('mmJaundiced').checked,
                            mmTacky: document.getElementById('mmTacky').checked,
                            earsN: document.getElementById('earsN').checked,
                            earsA: document.getElementById('earsA').checked,
                            earsEarMites: document.getElementById('earsEarMites').checked,
                            earsAU: document.getElementById('earsAU').checked,
                            earsAD: document.getElementById('earsAD').checked,
                            earsAS: document.getElementById('earsAS').checked,
                            glandsN: document.getElementById('glandsN').checked,
                            glandsA: document.getElementById('glandsA').checked,
                            skinN: document.getElementById('skinN').checked,
                            skinA: document.getElementById('skinA').checked,
                            abdomenN: document.getElementById('abdomenN').checked,
                            abdomenA: document.getElementById('abdomenA').checked,
                            urogentialN: document.getElementById('urogenitalN').checked,
                            urogentialA: document.getElementById('urogenitalA').checked,
                            nervousSystemN: document.getElementById('nervousSystemN').checked,
                            nervousSystemA: document.getElementById('nervousSystemA').checked,
                            musculoskeletalN: document.getElementById('musculoskeletalN').checked,
                            musculoskeletalA: document.getElementById('musculoskeletalA').checked,
                            cardiovascularN: document.getElementById('cardiovascularN').checked,
                            cardiovascularA: document.getElementById('cardiovascularA').checked,
                            respiratoryN: document.getElementById('respiratoryN').checked,
                            respiratoryA: document.getElementById('respiratoryA').checked,

                            mcsN: document.getElementById('mcsN').checked,
                            mcsMild: document.getElementById('mcsMild').checked,
                            mcsMod: document.getElementById('mcsMod').checked,
                            mcsSevere: document.getElementById('mcsSevere').checked,
                            weight: document.getElementById('weight').value,

                            //dropdown values
                            weightUnit: weightUnit,
                            bcsVal: bcsVal,

                            //textareas
                            follow_up_instructions: document.getElementById('followUpNotes').value,
                            exam_notes: document.getElementById('notes').value,
                            summary: document.getElementById('summary').value

                        },
                        medications: gatherMedications(id, self)

                    }
                });
                medicalRecord.then(function (response) {
                    if (response.success) {
                        showAlert("Record updated, record is editable until 12pm tonight", true);
                    }
                    //this is error from server condition
                }, function (response) {
                    showAlert("Could not update", false);
                    console.log("status is " + JSON.stringify(response));
                    if (response === false) {
                        if (self.get('session.isAuthenticated')) {
                            self.get('session').invalidate();
                        }
                        self.transitionToRoute('/login');
                    }
                });
            },
            // checks all of the N's and the BAR
            checkAll: function checkAll() {
                var normals = document.getElementsByClassName("norm");
                for (var i = 0; i < normals.length; i++) {
                    normals[i].checked = true;
                }
            },
            // unchecks all of N's and BAR
            uncheckAll: function uncheckAll() {
                var normals = document.getElementsByClassName("norm");
                for (var i = 0; i < normals.length; i++) {
                    normals[i].checked = false;
                }
            }
        }
    });

    //gathers all of the medications from the medication inputs and sorts them into an appropriate list to be sent to server
    function gatherMedications(id, self) {
        var medications = [];
        var formattedMedicine = formatReminders(self.get('model.medicine'));
        var formattedVaccine = formatReminders(self.get('model.vaccine'));
        var formattedOther = formatReminders(self.get('model.other'));
        medications.push.apply(medications, formattedMedicine);
        medications.push.apply(medications, formattedVaccine);
        medications.push.apply(medications, formattedOther);
        console.log(medications);
        return medications;
    }

    function formatReminders(items) {

        var newList = [];

        for (var i = 0; i < items.length; i++) {
            if (items[i].reminder !== "") {
                var newObjectReminder = formatDate(items[i].reminder);
                var newObject1 = { name: items[i].name, med_type: items[i].med_type, reminder: newObjectReminder };
                newList.push(newObject1);
            } else {
                var newObject2 = { name: items[i].name, med_type: items[i].med_type, reminder: '' };
                newList.push(newObject2);
            }
        }

        return newList;
    }

    function formatDate(date) {
        var half = new Date(date);
        var formatted = Math.floor(half.getTime() / 1000);
        return formatted;
    }

    function showAlert(message, bool) {
        if (bool) {
            _ember['default'].$('#alert_placeholder_med').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">' + message + '</span></div>');
        } else {
            _ember['default'].$('#alert_placeholder_med').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
        }
    }
});
define("ahasweb/controllers/view-patient", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Controller.extend({
        actions: {
            gotoMedicalRoute: function gotoMedicalRoute(patient) {
                this.transitionToRoute("/view-patient/" + patient + "/medical-record");
            },
            viewMedicalRecords: function viewMedicalRecords(patient) {
                //want to be passed a date here from whatever med rec was clicked viewMedicalRecords(patient, date){
                // if ( checkUpdate(date) ){
                //    this.transitionToRoute('/view-patient/'+patient+'/view-medical-record-editable/1');
                //}
                //else{
                this.transitionToRoute('/view-patient/' + patient + '/view-medical-record/' + 23);
                //}
                //this is still hardcoded for med rec number until i actually have a list to come from
            }

        }

    });

    function checkUpdate(date) {

        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();

        var current = new Date();

        var currentDay = current.getDay();
        var currentMonth = current.getMonth();
        var currentYear = current.getFullYear();
        var currentHours = current.getHours();

        //exact minute of midnight is when we will autofinalize
        if (currentDay === day && currentMonth === month && currentYear === year && currentHours <= 24) {
            return true;
        }
        return false;
    }
});
define('ahasweb/helpers/app-version', ['exports', 'ember', 'ahasweb/config/environment'], function (exports, _ember, _ahaswebConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _ahaswebConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('ahasweb/helpers/is-after', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/is-after'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersIsAfter) {
  exports['default'] = _emberMomentHelpersIsAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/is-before', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/is-before'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersIsBefore) {
  exports['default'] = _emberMomentHelpersIsBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/is-between', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/is-between'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersIsBetween) {
  exports['default'] = _emberMomentHelpersIsBetween['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/is-same-or-after', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/is-same-or-after'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersIsSameOrAfter) {
  exports['default'] = _emberMomentHelpersIsSameOrAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/is-same-or-before', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/is-same-or-before'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersIsSameOrBefore) {
  exports['default'] = _emberMomentHelpersIsSameOrBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/is-same', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/is-same'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersIsSame) {
  exports['default'] = _emberMomentHelpersIsSame['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/moment-add', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/moment-add'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersMomentAdd) {
  exports['default'] = _emberMomentHelpersMomentAdd['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/moment-calendar', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersMomentCalendar) {
  exports['default'] = _emberMomentHelpersMomentCalendar['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _emberMomentHelpersMomentDuration) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentDuration['default'];
    }
  });
});
define('ahasweb/helpers/moment-format', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/moment-from-now', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/moment-from', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/moment-from'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersMomentFrom) {
  exports['default'] = _emberMomentHelpersMomentFrom['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/moment-subtract', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/moment-subtract'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersMomentSubtract) {
  exports['default'] = _emberMomentHelpersMomentSubtract['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/moment-to-date', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/moment-to-date'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersMomentToDate) {
  exports['default'] = _emberMomentHelpersMomentToDate['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/moment-to-now', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/moment-to', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/helpers/moment-to'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentHelpersMomentTo) {
  exports['default'] = _emberMomentHelpersMomentTo['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('ahasweb/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _emberMomentHelpersUnix) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix['default'];
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix.unix;
    }
  });
});
define('ahasweb/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _emberMomentHelpersMoment) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMoment['default'];
    }
  });
});
define('ahasweb/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _emberMomentHelpersNow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersNow['default'];
    }
  });
});
define('ahasweb/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ahasweb/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ahasweb/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _emberMomentHelpersUnix) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix['default'];
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix.unix;
    }
  });
});
define("ahasweb/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('ahasweb/initializers/allow-link-action', ['exports', 'ember-link-action/initializers/allow-link-action'], function (exports, _emberLinkActionInitializersAllowLinkAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLinkActionInitializersAllowLinkAction['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLinkActionInitializersAllowLinkAction.initialize;
    }
  });
});
define('ahasweb/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ahasweb/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _ahaswebConfigEnvironment) {
  var _config$APP = _ahaswebConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('ahasweb/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ahasweb/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ahasweb/initializers/ember-cli-mirage', ['exports', 'ember-cli-mirage/utils/read-modules', 'ahasweb/config/environment', 'ahasweb/mirage/config', 'ember-cli-mirage/server', 'lodash/object/assign'], function (exports, _emberCliMirageUtilsReadModules, _ahaswebConfigEnvironment, _ahaswebMirageConfig, _emberCliMirageServer, _lodashObjectAssign) {
  exports.startMirage = startMirage;
  exports['default'] = {
    name: 'ember-cli-mirage',
    initialize: function initialize(application) {
      if (arguments.length > 1) {
        // Ember < 2.1
        var container = arguments[0],
            application = arguments[1];
      }

      if (_shouldUseMirage(_ahaswebConfigEnvironment['default'].environment, _ahaswebConfigEnvironment['default']['ember-cli-mirage'])) {
        startMirage(_ahaswebConfigEnvironment['default']);
      }
    }
  };

  function startMirage() {
    var env = arguments.length <= 0 || arguments[0] === undefined ? _ahaswebConfigEnvironment['default'] : arguments[0];

    var environment = env.environment;
    var modules = (0, _emberCliMirageUtilsReadModules['default'])(env.modulePrefix);
    var options = (0, _lodashObjectAssign['default'])(modules, { environment: environment, baseConfig: _ahaswebMirageConfig['default'], testConfig: _ahaswebMirageConfig.testConfig });

    return new _emberCliMirageServer['default'](options);
  }

  function _shouldUseMirage(env, addonConfig) {
    var userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    var defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    var usingInDev = env === 'development' && !addonConfig.usingProxy;
    var usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }
});
define('ahasweb/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ahasweb/initializers/ember-simple-auth', ['exports', 'ahasweb/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ahaswebConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',

    initialize: function initialize(registry) {
      var config = _ahaswebConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _ahaswebConfigEnvironment['default'].rootURL || _ahaswebConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('ahasweb/initializers/export-application-global', ['exports', 'ember', 'ahasweb/config/environment'], function (exports, _ember, _ahaswebConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_ahaswebConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _ahaswebConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_ahaswebConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ahasweb/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ahasweb/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ahasweb/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("ahasweb/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ahasweb/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',

    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('ahasweb/mirage/config', ['exports'], function (exports) {
  exports['default'] = function () {

    // These comments are here to help you get started. Feel free to delete them.

    /*
      Config (with defaults).
       Note: these only affect routes defined *after* them!
    */

    this.urlPrefix = 'https://ahas.herokuapp.com'; // make this `http://localhost:8080`, for example, if your API is on a different server
    this.namespace = '/api'; // make this `/api`, for example, if your API is namespaced
    //this.timing = 400;      // delay for each request, automatically set to 0 during testing

    // for user creation
    this.post('/signup', { success: true }, 201);

    this.post('patients/:id/medical_records', { success: true }, 201);

    //this is for viewing one medical record
    this.get('patients/:id/medical_records/:id', {
      success: true,
      medical_record: {
        id: 15,
        temperature: null,
        exam_notes: null,
        medications: null,
        eyes: null,
        oral: null,
        ears: null,
        glands: null,
        skin: null,
        abdomen: null,
        urogential: null,
        nervousSystem: null,
        musculoskeletal: null,
        cardiovascular: null,
        heart_rate: null,
        respiratory: null,
        respiratory_rate: null,
        attitudeBAR: true,
        attitudeQAR: false,
        attitudeDepressed: false,
        eyesN: false,
        eyesA: false,
        mmN: false,
        mmPale: false,
        mmJaundiced: false,
        mmTacky: false,
        earsN: false,
        earsA: false,
        earsEarMites: false,
        earsAU: false,
        earsAD: false,
        earsAS: false,
        glandsN: false,
        glandsA: false,
        skinN: false,
        skinA: false,
        abdomenN: false,
        abdomenA: false,
        urogentialN: false,
        urogentialA: false,
        nervousSystemN: false,
        nervousSystemA: false,
        musculoskeletalN: false,
        musculoskeletalA: false,
        cardiovascularN: false,
        cardiovascularA: false,
        respiratoryN: true,
        respiratoryA: true,
        created_at: "2017-03-10T06:35:47.841Z",
        updated_at: "2017-03-10T06:35:47.841Z",
        patient_id: 1,
        summary: "fake summary",
        signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAABECAYAAABatSq0AAAFcUlEQVR4Xu2dPasfRRSHn8TEJL6jhID4EQJ+ALVSUllYCaKgSR3sLEUEG0s7Ky3EQiwsFCxELfQDCAHBUlCQNAHF1/jG8e6fm3u9/7u7/9nZnZl9FlLkZubMzHPO/DIzO/fsCXxSCPwDfA88NNLIb8AZ4MTIehaXQFUEDPDd3XUTOJUgEorM7uytWQkBBWZ3R/3diUsKQ0Vmd/7WrIBAyuSoYHhZuxjboz+B04mtbETmCvB2oi2rS6AoAgrMbu74CziZsD063Opl4C0gVkW37dYla0mgPAIKzG4+idXLL8Cdu1XfWivsxqNfJgaruWUIGMjjuYcIxJ9YweR4pjjbydEvbUpgNAEFZhyyqbdG21qPs53YKumfcf6xdGEEDODhDrkGXJxx0vuGabhvLFkoAQVmuGNiWxQrmLj7MtejyMxF2nayEFBghmFd8lxEkRnmI0sVSECB6XdK6o3d/hb6Sygy/YwsUSABBabfKbE1+hm4q79o1hKKTFa8Gs9BQIE5nmqIS0mX3xSZHLNAm9kIKDDb0S557nKcw32FnW06aHhqAgrM0UT/6H7HqFQ+pYrf1PGpvcoJlDqBlsYaW6MQmcjZUupT2vatVE72a0ECCsz/4de0OgiRuQR8smAM2bQEthJQYA6i+RU4O+Nt3dTQ9DwmlaD1sxJQYA7irXHbUdOKK2swa7w8AgrMvk9qnqg1CmN5s8EeTU5AgdlHGpP0OeDdySnPYzD6/wTw6TzN2YoE+gkoMHuMcud46fdEeonazo/SR6yF4gkoMHt5dVvJveJN3+Kn3Lo6uHaBiSTbL3TZ6TbpKmuPAEWmdg821P81C8wHwFMVvZIeE3aRL/hco2Mbw8GyCxNYq8C0LC6bkHIls/Dksvl15nxdg7goMs7uIgiscQUTZy03gPuL8ED+TsyVqDz/SGyhOgJrE5i1XkiLcUdmvturi1A7XDWBNQlMzTd1U4MsMvLd4aFvKkbrjyWwFoFxm7D3JUrfLI2dIZZPIrAGgfkKeNj/vf+LE4U2abpYeSyBNQhMnD/Ebd3TY+E0Wr6FX4to1DXtDat1gXEyHR2zweVL4LH2QtoRlUSgZYFZ86FuX4y5Veoj5L9PQqBVgSk9afckzks04qvrRIBW7yfQosC80+V1aXFs/R4dXuJH4G4Pv4cDs+R4Aq1Nwg+BJ500gwPhp+6Lla3FwWAAFsxLoKXAaimvS16vH7TuecyctFfWVu0C8wXwyC0rltrHs1T4xXnM790XFZbqg+02SKD2CXkNuFjY96NrDJNYxYTInKqx8/a5XAK1C0y5ZOvq2XXgvGdXdTmtht4qMDV4aZ4+/gBcUGTmgb2WVhSYej39BvA08MDEW5u4oOhWqd64KKrnCswy7ngVeBZ4sMvRcrKnG3P5afNtpc+WwWKrrRGYK3Bb47ZtPJFz5U3g0W67cab7JErq+DdfPIg3Pd8CLwPvpxq1vgRyE1BgxhN+HbjaJXAaUnuTRS+SPn0DvAJ8PKSiZSRQOwEFZt+D7wGPA/ce4dQQicPpHuJn8Xo3svd/B3wEvFR7QNh/CUxJoFWBOQu8CDzf5YKJtyMhBvG7N5sn/n5P99G1zc+O+/halP8cuDSlA7QlgZYJtCowcRbyGvBMJyz3dZfxQnhuFZMQjbisdxn4umVHOzYJLEGgVYFZgqVtSkAChwgoMIaEBCSQjYACkw2thiUgAQXGGJCABLIRUGCyodWwBCSgwBgDEpBANgIKTDa0GpaABBQYY0ACEshGQIHJhlbDEpCAAmMMSEAC2QgoMNnQalgCElBgjAEJSCAbAQUmG1oNS0ACCowxIAEJZCOgwGRDq2EJSECBMQYkIIFsBBSYbGg1LAEJ/AsR6ZhFIBvwNwAAAABJRU5ErkJggg==", date: null },
      medications: [{ med_type: "medicine", name: "med1", reminder: "" }, { med_type: "vaccine", name: "vac1", reminder: "" }]
    });

    //for the login
    this.post('/user_token', { "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9" });

    //ontact creation
    this.post('/contacts', { success: true }, 201);

    //contact editing
    this.put('/contacts/:id', { success: true }, 201);

    //for getting one contact
    this.get('/contacts/:id', function () {
      return {
        success: true,
        contact: {
          first_name: "Justin",
          last_name: "Barclay",
          address: "116 St & 85 Ave, Edmonton, AB T6G 2R3",
          email: "fakejustin@ualberta.ca",
          phone_number: "555-555-5555",
          fax_number: "555-555-5556",
          contact_type: "Veterinarian",
          id: 1
        }
      };
    });

    //this is for get all contacts
    this.get('/contacts', function () {
      return {
        success: true,
        contacts: [{ "first_name": "Justin", "last_name": "Barclay", "id": 1, "contact_type": "Volunteer" }, { "first_name": "Simon", "last_name": "Cowell", "id": 2, "contact_type": "Volunteer" }, { "first_name": "Tony", "last_name": "Stark", "id": 3, "contact_type": "Veterinarian" }]
      };
    });

    //this is for get all patients
    this.get('/patients', function () {
      return {
        success: true,
        patients: [{ first_name: "Chairman", last_name: "Meow", id: 1 }]
      };
    });
    /*
      Shorthand cheatsheet:
       this.get('/posts');
      this.post('/posts');
      this.get('/posts/:id');
      this.put('/posts/:id'); // or this.patch
      this.del('/posts/:id');
       http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
    */

    // this.get('/client', 'new-client');
    //this is for getting one client
    this.get('/client', function () {
      return {
        success: true,
        clients: [{
          firstName: "Johny",
          lastName: "Bravo",
          id: "1"
        }]
      };
    });

    this.get('client/:id', function () {
      return {
        success: true,
        client: {
          id: 1,
          firstName: "Johny",
          lastName: "Bravo",
          address: "123 Office dr Edmonton, AB A6S 1F3",
          phoneNumber: "780-555-1122",
          email: "jbravo@email.ca",
          licos: "123",
          aish: "234",
          socialAssistance: "345",
          pets: "boby",
          notes: "don't say anything about his hair",
          created_at: "017-03-09T02:50:38.757Z",
          updated_at: "017-03-09T02:50:38.757Z",
          alternativeContactFirstName: "Bob",
          alternativeContactLastName: "Mackenzie",
          alternativeContactEmail: "bmackenzie@email.com",
          alternativeContactPhoneNumber: "780-555-2211",
          alternativeContact2ndPhone: "780-555-3321",
          alternativeContactAddress: "4142 Office ave Edmonton, AB V2F 4A1",
          patients: [{ "id": 40, "first_name": "Dinkle", "last_name": "Burg" }]
        }
      };
    });

    this.get('/patients/:id/medical_records/:id/notes/:id', function () {
      return {
        success: true,
        notes: {
          id: 1,
          body: "hey listen\njjj",
          initials: "jb",
          medical_record_id: 1,
          created_at: "2017-03-09T19:43:59.816Z",
          updated_at: "2017-03-09T19:43:59.816Z"
        }
      };
    });

    //this is wrong/broken at the moment/ just wrong format
    this.get('patients/:id', function () {
      return {
        success: true,
        patient: {
          id: 1,
          clientLastName: 'Bobbertson',
          clientFirstName: 'Fred',
          clientAddress: '22554 48th Ave NW Edmonton Alberta, Canada',
          clientPhoneNumber: '666-666-6666',
          clientEmail: '123dd@5d5dd.ca',

          clientDocumentLICO: 'Confirmed',
          clientDocumentAISH: 'Confirmed',
          clientDocumentSA: 'Confirmed',
          clientNotes: 'Smells bad?',

          clientAlternativeCName: 'Jack',
          clientAlternativeCAddress: '12252 92nd Ave Edmonton, Alberta, Canada',
          clientAlternativeCPhone: '123-456-7890',
          clientAlternativeCSPhone: '999-999-9999',
          clientAlternativeCEmail: 'efijo@foji.cdoji'
        }
      };
    });
  };
});
define("ahasweb/mirage/factories/user", ["exports", "ember-cli-mirage"], function (exports, _emberCliMirage) {
  exports["default"] = _emberCliMirage["default"].Factory.extend({
    email: "user@gmail.ca",
    password: "password"
  });
});
define('ahasweb/mirage/models/login', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
    exports['default'] = _emberCliMirage.Model.extend({
        jwt: 'string'
    });
});
define('ahasweb/mirage/models/signup', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage.Model.extend({});
});
define('ahasweb/mirage/models/user', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage.Model.extend({});
});
define("ahasweb/mirage/scenarios/default", ["exports"], function (exports) {
  exports["default"] = function () /* server */{

    /*
      Seed your development database using your factories.
      This data will not be loaded in your tests.
       Make sure to define a factory for each model you want to create.
    */

    // server.createList('post', 10);
  };
});
define('ahasweb/mirage/serializers/application', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage.JSONAPISerializer.extend({});
});
define('ahasweb/mixins/link-action', ['exports', 'ember-link-action/mixins/link-action'], function (exports, _emberLinkActionMixinsLinkAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLinkActionMixinsLinkAction['default'];
    }
  });
});
define('ahasweb/models/client-list', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		firstName: _emberData['default'].attr('string'),
		lastName: _emberData['default'].attr('string'),
		clientId: _emberData['default'].attr()
	});
});
define('ahasweb/models/contact', ['exports', 'ember-data'], function (exports, _emberData) {
        exports['default'] = _emberData['default'].Model.extend({
                ID: _emberData['default'].attr('string'),
                first_name: _emberData['default'].attr('string'),
                last_name: _emberData['default'].attr('string'),
                email: _emberData['default'].attr('string'),
                address: _emberData['default'].attr('string'),
                phone_number: _emberData['default'].attr('string'),
                fax_number: _emberData['default'].attr('string'),
                type: _emberData['default'].attr('string')
        });
});
define('ahasweb/models/new-client', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		clientName: _emberData['default'].attr('string'),
		clientAddress: _emberData['default'].attr('string'),
		clientPhone: _emberData['default'].attr('string'),
		clientEmail: _emberData['default'].attr('string'),
		clientID: _emberData['default'].attr('string')

		// TODO
		//add other info
	});
});
define('ahasweb/models/new-patient', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		name: _emberData['default'].attr('string'),
		patientName: _emberData['default'].attr('string'),
		patientSpecies: _emberData['default'].attr('string'),
		patientGender: _emberData['default'].attr('string'),
		patientStatus: _emberData['default'].attr('string'),
		patientAge: _emberData['default'].attr('string'),
		patientColor: _emberData['default'].attr('string'),
		patientTatoo: _emberData['default'].attr('string'),
		patientMicrochip: _emberData['default'].attr('string')

	});
});
define('ahasweb/models/signup', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].Model.extend({

        email: _emberData['default'].attr('string', {
            lowercase: true
        }),
        password: _emberData['default'].attr('string')

    });
});
define('ahasweb/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].Model.extend({

        email: _emberData['default'].attr(),
        password: _emberData['default'].attr(),
        id: _emberData['default'].attr(int)

    });
});
define('ahasweb/models/users', ['exports', 'ember-data'], function (exports, _emberData) {
   exports['default'] = _emberData['default'].Model.extend({
      email: _emberData['default'].attr('string'),
      name: _emberData['default'].attr('string'),
      id: _emberData['default'].attr('integer')
   });
});
define('ahasweb/models/view-patient', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		patientID: _emberData['default'].attr('string'),
		patientSpecies: _emberData['default'].attr('string'),
		patientName: _emberData['default'].attr('string'),
		patientAge: _emberData['default'].attr('string'),
		patientColor: _emberData['default'].attr('string'),
		patientTatoo: _emberData['default'].attr('string'),
		patientMicrochip: _emberData['default'].attr('string'),
		patientStatus: _emberData['default'].attr('string'),
		patientCreatedDate: _emberData['default'].attr('string'),
		patientEditDate: _emberData['default'].attr('string'),
		patientClientID: _emberData['default'].attr('string'),
		patientGender: _emberData['default'].attr('string')
	});
});
define('ahasweb/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ahasweb/router', ['exports', 'ember', 'ahasweb/config/environment'], function (exports, _ember, _ahaswebConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _ahaswebConfigEnvironment['default'].locationType,
    rootURL: _ahaswebConfigEnvironment['default'].rootURL

  });

  Router.map(function () {
    this.route('login');
    this.route('new-patient');
    this.route('create-user', { path: '/creat-user/:token' });
    this.route('new-client');

    this.route('view-patient', { path: '/view-patient/:patientID' });

    this.route('view-contact', { path: '/view-contact/:contact_id' });
    this.route('search-contacts');
    this.route('edit-contact', { path: '/edit-contact/:contact_id' });
    this.route('search-patient');
    this.route('new-side-note');
    this.route('view-side-note');
    this.route('client-list');
    this.route('client-info', { path: '/client-info/:clientID' });
    this.route('medical-record', { path: '/view-patient/:patientID/medical-record' });
    this.route('view-medical-record-editable', { path: '/view-patient/:patientID/view-medical-record-editable/:recordID' });
    this.route('view-medical-record', { path: '/view-patient/:patientID/view-medical-record/:recordID' });

    this.route('view-calendar');
    this.route('new-calendar');
    this.route('list-side-note');
    this.route('create-contact');
    this.route('test');
    this.route('edit-client', { path: 'edit-client/:clientID' });
    this.route('lab-result-upload', { path: '/lab-result-upload/:patientID' });
    this.route('admin');
    this.route('user', { path: '/admin/users/:id' });

    this.route('view-appointment', { path: '/view-appointment/:appointmentid' });
  });

  exports['default'] = Router;
});
define('ahasweb/routes/admin', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin', 'ember'], function (exports, _emberSimpleAuthMixinsAuthenticatedRouteMixin, _ember) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		model: function model() {
			var _this = this;

			var self = this;
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/users').then(function (data) {
					_ember['default'].run(function () {
						var users = deserialAttributes(data.users);
						resolve({
							users: users
						});
					});
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
					}
				});
			});
			return ajaxGet;
		}
	});

	function deserialAttributes(users) {
		var deserial = [];
		for (var i = 0; i < users.length; i++) {
			var user = {};
			user.id = users[i].id;
			user.email = users[i].email;
			user.name = users[i].name;
			deserial.push(user);
		}
		return deserial;
	}
});
define('ahasweb/routes/application', ['exports', 'ember'], function (exports, _ember) {

  // Ensure the application route exists for ember-simple-auth's `setup-session-restoration` initializer
  exports['default'] = _ember['default'].Route.extend();
});
define('ahasweb/routes/client-info', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		model: function model(param) {
			var _this = this;

			var self = this;
			// console.log("param is " + param.clientID);
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/client/' + param.clientID).then(function (data) {
					console.log("data is " + JSON.stringify(data));
					_ember['default'].run(function () {
						resolve({
							firstName: deserialFirstName(data.client),
							lastName: deserialLastName(data.client),
							phoneNumber: deserialPhoneNumber(data.client),
							email: deserialEmail(data.client),
							address: deserialAddress(data.client),

							licos: deserialLICOS(data.client),
							aish: deserialAISH(data.client),
							socialAssistance: deserialSA(data.client),

							created_at: deserialCreateAt(data.client),
							updated_at: deserialUpdatedAt(data.client),
							notes: deserialNotes(data.client),

							alternativeContactFirstName: deserialAltFirstName(data.client),
							alternativeContactLastName: deserialAltLastName(data.client),
							alternativeContactPhoneNumber: deserialAltPhoneNumber(data.client),
							alternativeContact2ndPhone: deserialAlt2ndPhone(data.client),
							alternativeContactAddress: deserialAltAddress(data.client),
							alternativeContactEmail: deserialAltEmail(data.client),

							clientID: deserialClientId(data.client),
							patients: deserialPatients(data.client.patients)
						});
					});
				}, function (data) {
					if (data === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
						console.log("status is " + JSON.stringify(data));
					}
				});
			});
			return ajaxGet;
		}
	});

	function deserialPatients(patients) {
		var deserial = [];
		for (var i = 0; i < patients.length; i++) {
			var patient = patients[i];
			patient.id = JSON.stringify(patients[i].id).replace(/\"/g, "");
			patient.firstName = JSON.stringify(patients[i].first_name).replace(/\"/g, "");
			patient.lastName = JSON.stringify(patients[i].last_name).replace(/\"/g, "");

			deserial.push(patient);
		}
		return deserial;
	}

	function deserialFirstName(client) {
		var fName = client.firstName;
		if (fName != null) {
			return JSON.stringify(fName).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialLastName(client) {
		var lName = client.lastName;
		if (lName != null) {
			return JSON.stringify(lName).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialPhoneNumber(client) {
		var phoneNumber = client.phoneNumber;
		if (phoneNumber != null) {
			return JSON.stringify(phoneNumber).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialEmail(client) {
		var email = client.email;
		if (email != null) {
			return JSON.stringify(email).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAddress(client) {
		var address = client.address;
		if (address != null) {
			return JSON.stringify(address).replace(/\\n/g, " <br> ").replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialLICOS(client) {
		var lico = client.licos;
		if (lico != null) {
			return JSON.stringify(lico).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAISH(client) {
		var aish = client.aish;
		if (aish != null) {
			return JSON.stringify(aish).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialSA(client) {
		var socialAssistance = client.socialAssistance;
		if (socialAssistance != null) {
			return JSON.stringify(socialAssistance).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialCreateAt(client) {
		var createdAt = client.created_at;
		if (createdAt != null) {
			return JSON.stringify(createdAt).replace(/\"/g, "").slice(0, 10);
		} else {
			return "";
		}
	}

	function deserialUpdatedAt(client) {
		var updatedAt = client.updated_at;
		if (updatedAt != null) {
			return JSON.stringify(updatedAt).replace(/\"/g, "").slice(0, 10);
		} else {
			return "";
		}
	}

	function deserialNotes(client) {
		var notes = client.notes;
		if (notes != null) {
			return JSON.stringify(notes).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAltFirstName(client) {
		var altFName = client.alternativeContactFirstName;
		if (altFName != null) {
			return JSON.stringify(altFName).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAltLastName(client) {
		var altLName = client.alternativeContactLastName;
		if (altLName != null) {
			return JSON.stringify(altLName).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAltPhoneNumber(client) {
		var altPhoneNumber = client.alternativeContactPhoneNumber;
		if (altPhoneNumber != null) {
			return JSON.stringify(altPhoneNumber).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAlt2ndPhone(client) {
		var altPhone = client.alternativeContact2ndPhone;
		if (altPhone != null) {
			return JSON.stringify(altPhone).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAltAddress(client) {
		var altAddress = client.alternativeContactAddress;
		if (altAddress != null) {
			return JSON.stringify(altAddress).replace(/\\n/g, " <br> ").replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAltEmail(client) {
		var altEmail = client.alternativeContactEmail;
		if (altEmail != null) {
			return JSON.stringify(altEmail).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialClientId(client) {
		var clientId = client.id;
		if (clientId != null) {
			return JSON.stringify(clientId).replace(/\"/g, "");
		} else {
			return "";
		}
	}
});
define('ahasweb/routes/client-list', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		model: function model() {
			var _this = this;

			var self = this;

			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/client').then(function (data) {
					_ember['default'].run(function () {
						resolve({
							clients: deserialAttributes(data.clients),
							clientsFiltered: deserialAttributes(data.clients)
						});
					});
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
					}
				});
			});
			return ajaxGet;
		}
	});

	function deserialAttributes(clients) {
		var deserial = [];
		for (var i = 0; i < clients.length; i++) {
			var client = clients[i];
			client.id = JSON.stringify(clients[i].id).replace(/\"/g, "");
			client.firstName = JSON.stringify(clients[i].firstName).replace(/\"/g, "");
			client.lastName = JSON.stringify(clients[i].lastName).replace(/\"/g, "");
			deserial.push(client);
		}
		return deserial;
	}
});
define('ahasweb/routes/create-contact', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
    exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
        model: function model() {
            return {
                laboratory: true
            };
        }
    });
});
define('ahasweb/routes/create-user', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ahasweb/routes/edit-client', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend({
		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		model: function model(param) {
			var _this = this;

			var self = this;
			clearFields(self); //clear the entryfields before setting them
			//ajax get request to populate field
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/client/' + param.clientID).then(function (data) {
					console.log("data is " + JSON.stringify(data));
					_ember['default'].run(function () {
						resolve({
							firstName: deserialFirstName(data.client),
							lastName: deserialLastName(data.client),
							phoneNumber: deserialPhoneNumber(data.client),
							email: deserialEmail(data.client),
							address: deserialAddress(data.client),

							licos: deserialLICOS(data.client),
							aish: deserialAISH(data.client),
							socialAssistance: deserialSA(data.client),

							created_at: deserialCreateAt(data.client),
							updated_at: deserialUpdatedAt(data.client),
							notes: deserialNotes(data.client),

							alternativeContactFirstName: deserialAltFirstName(data.client),
							alternativeContactLastName: deserialAltLastName(data.client),
							alternativeContactPhoneNumber: deserialAltPhoneNumber(data.client),
							alternativeContact2ndPhone: deserialAlt2ndPhone(data.client),
							alternativeContactAddress: deserialAltAddress(data.client),
							alternativeContactEmail: deserialAltEmail(data.client),

							clientID: deserialClientId(data.client),
							patients: deserialPatients(data.client.patients)
						});
					});
				}, function (data) {
					if (data === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
						console.log("status is " + JSON.stringify(data));
					}
				});
			});
			return ajaxGet;
		}
	});

	function clearFields(page) {
		page.set('clientFirstName', '');
		page.set('clientLastName', '');
		page.set('clientAddress', '');
		page.set('clientPhone', '');
		page.set('clientEmail', '');
		page.set('clientLICO', '');
		page.set('clientAISH', '');
		page.set('clientAS', '');
		page.set('alternativeFirstName', '');
		page.set('alternativeLastName', '');
		page.set('alternativePrimaryPhone', '');
		page.set('alternativeAddress', '');
		page.set('clientNotes', '');
		page.set('alternativeSecondaryPhone', '');
		page.set('alternativeEmail', '');
	}

	function deserialPatients(patients) {
		var deserial = [];
		for (var i = 0; i < patients.length; i++) {
			var patient = patients[i];
			patient.id = JSON.stringify(patients[i].id).replace(/\"/g, "");
			patient.firstName = JSON.stringify(patients[i].first_name).replace(/\"/g, "");
			patient.lastName = JSON.stringify(patients[i].last_name).replace(/\"/g, "");

			deserial.push(patient);
		}
		return deserial;
	}

	function deserialFirstName(client) {
		var fName = client.firstName;
		if (fName != null) {
			return JSON.stringify(fName).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialLastName(client) {
		var lName = client.lastName;
		if (lName != null) {
			return JSON.stringify(lName).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialPhoneNumber(client) {
		var phoneNumber = client.phoneNumber;
		if (phoneNumber != null) {
			return JSON.stringify(phoneNumber).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialEmail(client) {
		var email = client.email;
		if (email != null) {
			return JSON.stringify(email).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAddress(client) {
		var address = client.address;
		if (address != null) {
			return JSON.stringify(address).replace(/\\n/g, " <br> ").replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialLICOS(client) {
		var lico = client.licos;
		if (lico != null) {
			return JSON.stringify(lico).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAISH(client) {
		var aish = client.aish;
		if (aish != null) {
			return JSON.stringify(aish).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialSA(client) {
		var socialAssistance = client.socialAssistance;
		if (socialAssistance != null) {
			return JSON.stringify(socialAssistance).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialCreateAt(client) {
		var createdAt = client.created_at;
		if (createdAt != null) {
			return JSON.stringify(createdAt).replace(/\"/g, "").slice(0, 10);
		} else {
			return "";
		}
	}

	function deserialUpdatedAt(client) {
		var updatedAt = client.updated_at;
		if (updatedAt != null) {
			return JSON.stringify(updatedAt).replace(/\"/g, "").slice(0, 10);
		} else {
			return "";
		}
	}

	function deserialNotes(client) {
		var notes = client.notes;
		if (notes != null) {
			return JSON.stringify(notes).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAltFirstName(client) {
		var altFName = client.alternativeContactFirstName;
		if (altFName != null) {
			return JSON.stringify(altFName).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAltLastName(client) {
		var altLName = client.alternativeContactLastName;
		if (altLName != null) {
			return JSON.stringify(altLName).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAltPhoneNumber(client) {
		var altPhoneNumber = client.alternativeContactPhoneNumber;
		if (altPhoneNumber != null) {
			return JSON.stringify(altPhoneNumber).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAlt2ndPhone(client) {
		var altPhone = client.alternativeContact2ndPhone;
		if (altPhone != null) {
			return JSON.stringify(altPhone).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAltAddress(client) {
		var altAddress = client.alternativeContactAddress;
		if (altAddress != null) {
			return JSON.stringify(altAddress).replace(/\\n/g, " <br> ").replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialAltEmail(client) {
		var altEmail = client.alternativeContactEmail;
		if (altEmail != null) {
			return JSON.stringify(altEmail).replace(/\"/g, "");
		} else {
			return "";
		}
	}

	function deserialClientId(client) {
		var clientId = client.id;
		if (clientId != null) {
			return JSON.stringify(clientId).replace(/\"/g, "");
		} else {
			return "";
		}
	}
});
define('ahasweb/routes/edit-contact', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
    exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
        ajax: _ember['default'].inject.service(),
        model: function model(params) {
            var _this = this;

            var self = this;
            var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
                return _this.get('ajax').request('/api/contacts/' + params.contact_id).then(function (data) {
                    console.log(JSON.stringify(data));
                    _ember['default'].run(function () {
                        resolve({
                            first_name: JSON.stringify(data.contact.first_name).replace(/\"/g, ""),
                            last_name: JSON.stringify(data.contact.last_name).replace(/\"/g, ""),
                            phone_number: JSON.stringify(data.contact.phone_number).replace(/\"/g, ""),
                            email: JSON.stringify(data.contact.email).replace(/\"/g, ""),
                            fax_number: JSON.stringify(data.contact.fax_number).replace(/\"/g, ""),
                            address: JSON.stringify(data.contact.address).replace(/\"/g, ""),
                            id: JSON.stringify(data.contact.id).replace(/\"/g, ""),
                            veterinarian: checkVeterinarian(JSON.stringify(data.contact.contact_type).replace(/\"/g, "")),
                            volunteer: checkVolunteer(JSON.stringify(data.contact.contact_type).replace(/\"/g, "")),
                            laboratory: checkLaboratory(JSON.stringify(data.contact.contact_type).replace(/\"/g, "")),
                            technician: checkTechnician(JSON.stringify(data.contact.contact_type).replace(/\"/g, ""))
                        });
                    });
                }, function (response) {
                    if (response === false) {
                        if (self.get('session.isAuthenticated')) {
                            self.get('session').invalidate();
                        }
                        self.transitionToRoute('/unauthorized');
                    }
                });
            });
            return ajaxGet;
        }
    });

    function checkVeterinarian(contact) {

        if (contact === 'Veterinarian') {

            return true;
        }
        return false;
    }

    function checkVolunteer(contact) {

        if (contact === 'Volunteer') {

            return true;
        }
        return false;
    }

    function checkLaboratory(contact) {

        if (contact === 'Laboratory') {

            return true;
        }
        return false;
    }

    function checkTechnician(contact) {

        if (contact === 'Technician') {

            return true;
        }
        return false;
    }
});
define('ahasweb/routes/index', ['exports', 'ember'], function (exports, _ember) {
     exports['default'] = _ember['default'].Route.extend({
          beforeModel: function beforeModel() {
               this.replaceWith('login');
          }
     });
});
define("ahasweb/routes/lab-result-upload", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Route.extend({
		init: function init() {
			checkFileApiSupport();
			//document.getElementById('files').addEventListener('change', handleFileSelect, false);
			//console.log(document.getElementById('files'));
		},
		model: function model(param) {
			return {
				patientId: param.patientID
			};
		}
	});

	function checkFileApiSupport() {
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			console.log("File API is supported");
			return true;
		} else {
			console.log("File API is not supported");
			alert("The File APIs are not fully supported in this browser. ");
			return false;
		}
	}
	// function handleFileSelect(evt){
	// 	console.log("handling file select");
	// 	var files = evt.target.files; // FileList object of File objects

	// 	var output = [];
	// 	for(var i = 0, f; f = files[i]; i++){
	// 		output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
	// 			f.size, 'bytes, last modified: ', f.lastModifiedDate ?
	// 			f.lastModifiedDatetoLocalDateString(): 'n/a', '</li>');
	// 	}
	// 	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	// }
});
define('ahasweb/routes/list-side-note', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		ajax: _ember['default'].inject.service(),
		model: function model() {
			var _this = this;

			var self = this;

			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/patients/1/medical_records/1/notes/').then(function (data) {
					_ember['default'].run(function () {
						resolve({
							notesW: data.notes,
							patientID: "1", //param.patientID
							medID: "1" //param.medID
						});
						console.log("status is " + data.notes);
						console.log(data.notes instanceof String);
					});
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/unauthorized');
					}
				});
			});

			return ajaxGet;
		}
	});
});
define('ahasweb/routes/login', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
    exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {
        actions: {
            invalidateSession: function invalidateSession() {
                this.get('session').invalidate();
            }

        }
    });
});
define('ahasweb/routes/medical-record', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
    exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
        model: function model(params) {
            return {
                patientID: params.patientID,
                date: parseDate()
            };
        }
    });

    function parseDate() {
        var date = new Date();
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();
        var hours = date.getHours();
        var mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        var whole = days[day] + " " + months[month] + " " + year.toString() + " " + hours.toString() + ":" + mins.toString();
        return whole;
    }
});
define('ahasweb/routes/new-calendar', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		model: function model(params) {
			return {
				clientid: params.clientID
			};
		}
	});
});
define('ahasweb/routes/new-client', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		model: function model() {
			return this.store.createRecord('newClient');
		}
		// actions:{
		// 	createNewClient(){
		// 		// let clientInfo = this.modelFor(this.routeName);
		// 		// clientInfo.save().then(function () {
		// 		// 	//sendRequest();
		// 		// 	//this.transitionTo('new-client');
		// 		// }).catch(function (reason){

		// 		// });
		// 		console.log("made new client");
		// 		this.transitionTo('new-client');
		// 	}
		// }
	});
});
define('ahasweb/routes/new-patient', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		model: function model(params) {
			return {
				clientid: params.clientID
			};
		}
	});
});
define('ahasweb/routes/new-side-note', ['exports', 'ember'], function (exports, _ember) {
  //import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

  exports['default'] = _ember['default'].Route.extend({});
});
define('ahasweb/routes/search-contacts', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		model: function model() {
			var _this = this;

			var self = this;
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/contacts').then(function (data) {
					_ember['default'].run(function () {
						resolve({

							contactsVolunteer: deserialAttributesVolunteer(data.contacts),
							contactsFilteredVolunteer: deserialAttributesVolunteer(data.contacts),
							contactsVeterinarian: deserialAttributesVeterinarian(data.contacts),
							contactsFilteredVeterinarian: deserialAttributesVeterinarian(data.contacts),
							contactsLaboratory: deserialAttributesLaboratory(data.contacts),
							contactsFilteredLaboratory: deserialAttributesLaboratory(data.contacts)

						});
					});
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
					}
				});
			});
			return ajaxGet;
		}

	});

	function deserialAttributesVolunteer(contacts) {
		var deserial = [];
		for (var i = 0; i < contacts.length; i++) {

			if (contacts[i].contact_type === 'Volunteer') {
				var contact = contacts[i];
				contact.id = contacts[i].id;
				contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
				contact.last_name = JSON.stringify(contacts[i].last_name).replace(/\"/g, "");
				contact.contact_type = JSON.stringify(contacts[i].contact_type).replace(/\"/g, "");
				deserial.push(contact);
			}
		}
		return deserial;
	}

	function deserialAttributesVeterinarian(contacts) {
		var deserial = [];
		for (var i = 0; i < contacts.length; i++) {

			if (contacts[i].contact_type === 'Veterinarian') {
				var contact = contacts[i];
				contact.id = contacts[i].id;
				contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
				contact.last_name = JSON.stringify(contacts[i].last_name).replace(/\"/g, "");
				contact.contact_type = JSON.stringify(contacts[i].contact_type).replace(/\"/g, "");
				deserial.push(contact);
			}
		}

		return deserial;
	}

	function deserialAttributesLaboratory(contacts) {
		var deserial = [];
		for (var i = 0; i < contacts.length; i++) {

			if (contacts[i].contact_type === 'Laboratory') {
				var contact = contacts[i];
				contact.id = contacts[i].id;
				contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
				contact.last_name = JSON.stringify(contacts[i].last_name).replace(/\"/g, "");
				contact.contact_type = JSON.stringify(contacts[i].contact_type).replace(/\"/g, "");
				deserial.push(contact);
			}
		}
		return deserial;
	}
});
define('ahasweb/routes/search-patient', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		ajax: _ember['default'].inject.service(),
		model: function model() {
			var _this = this;

			var self = this;

			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/patients/').then(function (data) {
					_ember['default'].run(function () {
						resolve({
							patients: deserialAttributes(data.patients),
							patientFiltered: deserialAttributes(data.patients)
						});
						console.log("status is " + JSON.stringify(data));
					});
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/unauthorized');
					}
				});
			});

			return ajaxGet;
		}
	});

	function deserialAttributes(patients) {

		var deserial = [];
		for (var i = 0; i < patients.length; i++) {
			var patient = patients[i];
			patient.id = JSON.stringify(patients[i].id).replace(/\"/g, "");
			patient.first_name = JSON.stringify(patients[i].first_name).replace(/\"/g, "");
			patient.last_name = JSON.stringify(patients[i].last_name).replace(/\"/g, "");
			deserial.push(patient);
		}
		return deserial;
	}
});
define('ahasweb/routes/user', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin', 'ember'], function (exports, _emberSimpleAuthMixinsAuthenticatedRouteMixin, _ember) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		model: function model(params) {
			var _this = this;

			var self = this;
			console.log(params);
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/users/' + params.id).then(function (data) {
					_ember['default'].run(function () {
						console.log(data.user);
						resolve({
							user: data.user
						});
					});
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
					}
				});
			});
			return ajaxGet;
		}
	});
});
define('ahasweb/routes/view-appointment', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		model: function model(params) {
			var _this = this;

			//console.log(this.get("a_ID"));
			var self = this;
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/schedules/' + params.appointmentid).then(function (data) {
					//console.log(data, data.success, data.contacts);
					_ember['default'].run(function () {
						resolve({
							start: parseDate(new Date(data.schedule.appointmentStartDate * 1000)),
							reason: JSON.stringify(data.schedule.reason).replace(/\"/g, ""),
							notes: JSON.stringify(data.schedule.notes).replace(/\"/g, ""),
							location: JSON.stringify(data.schedule.location).replace(/\"/g, ""),
							end: parseDate(new Date(data.schedule.appointmentEndDate * 1000))

						});
					});
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
					}
				});
			});
			return ajaxGet;
		}

	});

	function parseDate(date) {
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var day = date.getDay();
		var month = date.getMonth();
		var year = date.getFullYear();
		var hours = date.getHours();
		var mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
		var whole = days[day] + " " + months[month] + " " + year.toString() + " " + hours.toString() + ":" + mins.toString();
		return whole;
	}
});
define('ahasweb/routes/view-calendar', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {

		ajax: _ember['default'].inject.service(),
		model: function model() {
			var _this = this;

			var self = this;
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/schedules').then(function (data) {
					_ember['default'].run.later(function () {
						resolve({ events: convertUnix(data.schedules)
						});
						console.log("we getdont here");
						//this.get('ajax').request('/api/client/1');
					});
					console.log("status is " + JSON.stringify(data));
					//console.log("status is " + JSON.stringify(data.patient.name));
				}, function (data) {
					if (data === false) {
						self.transitionTo('/unauthorized');
						console.log("status is " + JSON.stringify(data));
					}
				});
			});
			return ajaxGet;
		}

	});
	//weee splitter
	/*
  	model: function() {
    return {
      events: Ember.A([
        {title: "Hackathon \n ayelmao \n ayelmao2", start: Date.now()},
      ])
    };
  }*/

	function convertUnix(schedules) {
		var newsched = [];
		for (var i = 0; i < schedules.length; i++) {
			var schedule = schedules[i];
			schedule.start = new Date(schedules[i].appointmentStartDate * 1000);
			schedule.title = schedules[i].reason;
			newsched.push(schedule);
		}
		return newsched;
	}

	function parseDate(date) {
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var day = date.getDay();
		var month = date.getMonth();
		var year = date.getFullYear();
		var hours = date.getHours();
		var mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
		var whole = months[month] + " " + days[day] + " " + year.toString() + " " + hours.toString() + ":" + mins.toString();
		return whole;
	}
});
define('ahasweb/routes/view-contact', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {

		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		model: function model(params) {
			var _this = this;

			var self = this;
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/contacts/' + params.contact_id).then(function (data) {
					console.log(JSON.stringify(data));
					_ember['default'].run(function () {
						resolve({
							first_name: JSON.stringify(data.contact.first_name).replace(/\"/g, ""),
							last_name: JSON.stringify(data.contact.last_name).replace(/\"/g, ""),
							phone_number: JSON.stringify(data.contact.phone_number).replace(/\"/g, ""),
							email: JSON.stringify(data.contact.email).replace(/\"/g, ""),
							fax_number: JSON.stringify(data.contact.fax_number).replace(/\"/g, ""),
							address: JSON.stringify(data.contact.address).replace(/\"/g, ""),
							id: JSON.stringify(data.contact.id).replace(/\"/g, ""),
							type: JSON.stringify(data.contact.contact_type).replace(/\"/g, "")

						});
					});
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
					}
				});
			});
			return ajaxGet;
		}

	});
});
define('ahasweb/routes/view-medical-record-editable', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    ajax: _ember['default'].inject.service(),
    index: 1,
    model: function model(params) {
      var _this = this;

      var self = this;

      var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
        return _this.get('ajax').request('/api/patients/' + params.patientID + '/medical_records/' + params.recordID).then(function (data) {

          _ember['default'].run(function () {
            resolve({

              unixDate: data.medical_record.date,
              date: parseDate(new Date(data.medical_record.date * 1000)),
              date_created: data.medical_record.created_at,
              patient_id: data.medical_record.patient_id,

              signature: data.medical_record.signature,

              temperature: data.medical_record.temperature,
              eyes: data.medical_record.eyes,
              oral: data.medical_record.oral,
              ears: data.medical_record.ears,
              glands: data.medical_record.glands,
              skin: data.medical_record.skin,
              abdomen: data.medical_record.abdomen,
              urogential: data.medical_record.urogential,
              nervousSystem: data.medical_record.nervousSystem,
              musculoskeletal: data.medical_record.musculoskeletal,
              cardiovascular: data.medical_record.cardiovascular,
              heart_rate: data.medical_record.heart_rate,
              respiratory: data.medical_record.respiratory,
              respiratory_rate: data.medical_record.respiratory_rate,

              attitudeBAR: data.medical_record.attitudeBAR,
              attitudeQAR: data.medical_record.attitudeQAR,
              attitudeDepressed: data.medical_record.attitudeDepressed,
              eyesN: data.medical_record.eyesN,
              eyesA: data.medical_record.eyesA,
              oralN: data.medical_record.oralN,
              oralA: data.medical_record.oralA,
              mmN: data.medical_record.mmN,
              mmPale: data.medical_record.mmPale,
              mmJaundiced: data.medical_record.mmJaundiced,
              mmTacky: data.medical_record.mmTacky,
              earsN: data.medical_record.earsN,
              earsA: data.medical_record.earsA,
              earsEarMites: data.medical_record.earsEarMites,
              earsAU: data.medical_record.earsAU,
              earsAD: data.medical_record.earsAD,
              earsAS: data.medical_record.earsAS,
              glandsN: data.medical_record.glandsN,
              glandsA: data.medical_record.glandsA,
              skinN: data.medical_record.skinN,
              skinA: data.medical_record.skinA,
              abdomenN: data.medical_record.abdomenN,
              abdomenA: data.medical_record.abdomenA,
              urogenitalN: data.medical_record.urogentialN,
              urogenitalA: data.medical_record.urogentialA,
              nervousSystemN: data.medical_record.nervousSystemN,
              nervousSystemA: data.medical_record.nervousSystemA,
              musculoskeletalN: data.medical_record.musculoskeletalN,
              musculoskeletalA: data.medical_record.musculoskeletalA,
              cardiovascularN: data.medical_record.cardiovascularN,
              cardiovascularA: data.medical_record.cardiovascularA,
              respiratoryN: data.medical_record.respiratoryN,
              respiratoryA: data.medical_record.respiratoryA,

              mcsN: data.medical_record.mcsN,
              mcsMild: data.medical_record.mcsMild,
              mcsMod: data.medical_record.mcsMod,
              mcsSevere: data.medical_record.mcsSevere,
              weight: data.medical_record.weight,

              //dropdowns
              weightUnit: setDropdowns(data.medical_record.weightUnit),
              bcsVal1: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal2: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal3: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal4: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal5: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal6: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal7: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal8: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal9: setDropdownBCS(data.medical_record.bcsVal, self),

              exam_notes: data.medical_record.exam_notes,
              followUpNotes: data.medical_record.follow_up_instructions,
              summary: data.medical_record.summary,

              //to determine if edit button is disabled or not
              editable: checkUpdate(new Date(data.medical_record.date * 1000)),

              //medications
              medicine: deserialAttributesMedicines(data.medications),
              vaccine: deserialAttributesVaccines(data.medications),
              other: deserialAttributesOthers(data.medications)

            });
          });
        }, function (data) {
          if (data === false) {
            if (self.get('session.isAuthenticated')) {
              self.get('session').invalidate();
            }
            self.transitionTo('/login');
          }
        });
      });
      return ajaxGet;
    },

    setupController: function setupController(controller, model) {
      // Call _super for default behavior
      this._super(controller, model);
      //going to try to use this to fix nulls displaying problem
      //console.log(model.glands);
    }

  });

  function parseDate(date) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    var whole = days[day] + " " + months[month] + " " + year.toString() + " " + hours.toString() + ":" + mins.toString();
    return whole;
  }

  function setDropdowns(value) {
    if (value === "kg") {
      return true;
    }
    return false;
  }

  function setDropdownBCS(value, self) {
    if (value === self.get('index')) {
      self.set('index', self.get('index') + 1);
      return true;
    }
    self.set('index', self.get('index') + 1);
    return false;
  }

  function checkUpdate(date) {

    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear();

    var current = new Date();

    var currentDay = current.getDay();
    var currentMonth = current.getMonth();
    var currentYear = current.getFullYear();
    var currentHours = current.getHours();

    //exact minute of midnight is when we will autofinalize
    if (currentDay === day && currentMonth === month && currentYear === year && currentHours <= 24) {
      return true;
    }
    return false;
  }

  function deserialAttributesMedicines(medications) {
    console.log('we here', medications, medications.length);
    var deserial = [];
    for (var i = 0; i < medications.length; i++) {

      //bc at some point data was created with both (over component integration period)
      if (medications[i].med_type === 'medicine' || medications[i].med_type === 'Medicine') {
        var medication = medications[i];
        medication.name = medication.name;
        medication.reminderToDisplay = format(medication.reminder);
        deserial.push(medication);
      }
    }
    return deserial;
  }

  function deserialAttributesVaccines(vaccines) {
    var deserial = [];
    for (var i = 0; i < vaccines.length; i++) {

      if (vaccines[i].med_type === 'vaccine' || vaccines[i].med_type === 'Vaccine') {
        var vaccine = vaccines[i];
        vaccine.name = vaccine.name;
        vaccine.reminderToDisplay = format(vaccine.reminder);
        deserial.push(vaccine);
      }
    }
    return deserial;
  }

  function deserialAttributesOthers(others) {
    var deserial = [];
    for (var i = 0; i < others.length; i++) {

      if (others[i].med_type === 'other' || others[i].med_type === 'Other') {
        var other = others[i];
        other.name = other.name;
        other.reminderToDisplay = format(other.reminder);
        deserial.push(other);
      }
    }
    return deserial;
  }

  function format(date) {
    var partialDate = new Date(date * 1000);
    var day = (partialDate.getDate() < 10 ? '0' : '') + partialDate.getDate();
    var month = (partialDate.getMonth() < 10 ? '0' : '') + (partialDate.getMonth() + 1);
    return month + "/" + day + "/" + partialDate.getFullYear();
  }
});
define('ahasweb/routes/view-medical-record', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    ajax: _ember['default'].inject.service(),
    index: 1,
    model: function model(params) {
      var _this = this;

      var self = this;

      var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
        return _this.get('ajax').request('/api/patients/' + params.patientID + '/medical_records/' + params.recordID).then(function (data) {

          _ember['default'].run(function () {
            resolve({

              date: parseDate(new Date(data.medical_record.date * 1000)),
              date_created: data.medical_record.created_at,
              patient_id: data.medical_record.id,

              signature: data.medical_record.signature,

              temperature: data.medical_record.temperature,
              eyes: data.medical_record.eyes,
              oral: data.medical_record.oral,
              ears: data.medical_record.ears,
              glands: data.medical_record.glands,
              skin: data.medical_record.skin,
              abdomen: data.medical_record.abdomen,
              urogential: data.medical_record.urogential,
              nervousSystem: data.medical_record.nervousSystem,
              musculoskeletal: data.medical_record.musculoskeletal,
              cardiovascular: data.medical_record.cardiovascular,
              heart_rate: data.medical_record.heart_rate,
              respiratory: data.medical_record.respiratory,
              respiratory_rate: data.medical_record.respiratory_rate,

              attitudeBAR: data.medical_record.attitudeBAR,
              attitudeQAR: data.medical_record.attitudeQAR,
              attitudeDepressed: data.medical_record.attitudeDepressed,
              eyesN: data.medical_record.eyesN,
              eyesA: data.medical_record.eyesA,
              oralN: data.medical_record.oralN,
              oralA: data.medical_record.oralA,
              mmN: data.medical_record.mmN,
              mmPale: data.medical_record.mmPale,
              mmJaundiced: data.medical_record.mmJaundiced,
              mmTacky: data.medical_record.mmTacky,
              earsN: data.medical_record.earsN,
              earsA: data.medical_record.earsA,
              earsEarMites: data.medical_record.earsEarMites,
              earsAU: data.medical_record.earsAU,
              earsAD: data.medical_record.earsAD,
              earsAS: data.medical_record.earsAS,
              glandsN: data.medical_record.glandsN,
              glandsA: data.medical_record.glandsA,
              skinN: data.medical_record.skinN,
              skinA: data.medical_record.skinA,
              abdomenN: data.medical_record.abdomenN,
              abdomenA: data.medical_record.abdomenA,
              urogenitalN: data.medical_record.urogentialN,
              urogenitalA: data.medical_record.urogentialA,
              nervousSystemN: data.medical_record.nervousSystemN,
              nervousSystemA: data.medical_record.nervousSystemA,
              musculoskeletalN: data.medical_record.musculoskeletalN,
              musculoskeletalA: data.medical_record.musculoskeletalA,
              cardiovascularN: data.medical_record.cardiovascularN,
              cardiovascularA: data.medical_record.cardiovascularA,
              respiratoryN: data.medical_record.respiratoryN,
              respiratoryA: data.medical_record.respiratoryA,

              mcsN: data.medical_record.mcsN,
              mcsMild: data.medical_record.mcsMild,
              mcsMod: data.medical_record.mcsMod,
              mcsSevere: data.medical_record.mcsSevere,
              weight: data.medical_record.weight,

              //dropdowns
              weightUnit: setDropdowns(data.medical_record.weightUnit),
              bcsVal1: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal2: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal3: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal4: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal5: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal6: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal7: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal8: setDropdownBCS(data.medical_record.bcsVal, self),
              bcsVal9: setDropdownBCS(data.medical_record.bcsVal, self),

              exam_notes: data.medical_record.exam_notes,
              followUpNotes: data.medical_record.follow_up_instructions,
              summary: data.medical_record.summary,

              //medications
              medications: deserialAttributesMedicines(data.medications),
              vaccines: deserialAttributesVaccines(data.medications),
              others: deserialAttributesOthers(data.medications)

            });
          });
        }, function (data) {
          if (data === false) {
            if (self.get('session.isAuthenticated')) {
              self.get('session').invalidate();
            }
            self.transitionTo('/login');
          }
        });
      });
      return ajaxGet;
    }

  });

  function parseDate(date) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    var whole = days[day] + " " + months[month] + " " + year.toString() + " " + hours.toString() + ":" + mins.toString();
    return whole;
  }

  function setDropdowns(value) {
    if (value === "kg") {
      return true;
    }
    return false;
  }

  function setDropdownBCS(value, self) {
    if (value === self.get('index')) {
      self.set('index', self.get('index') + 1);
      return true;
    }
    self.set('index', self.get('index') + 1);
    return false;
  }

  function deserialAttributesMedicines(medications) {
    var deserial = [];
    for (var i = 0; i < medications.length; i++) {

      if (medications[i].med_type === 'medicine' || medications[i].med_type === 'Medicine') {
        var medication = medications[i];
        medication.name = medication.name;
        medication.reminderToDisplay = format(medication.reminder);
        deserial.push(medication);
      }
    }
    return deserial;
  }

  function deserialAttributesVaccines(vaccines) {
    var deserial = [];
    for (var i = 0; i < vaccines.length; i++) {

      if (vaccines[i].med_type === 'vaccine' || vaccines[i].med_type === 'Vaccine') {
        var vaccine = vaccines[i];
        vaccine.name = vaccine.name;
        vaccine.reminderToDisplay = format(vaccine.reminder);
        deserial.push(vaccine);
      }
    }
    return deserial;
  }

  function deserialAttributesOthers(others) {
    var deserial = [];
    for (var i = 0; i < others.length; i++) {

      if (others[i].med_type === 'other' || others[i].med_type === 'Other') {
        var other = others[i];
        other.name = other.name;
        other.reminderToDisplay = format(other.reminder);
        deserial.push(other);
      }
    }
    return deserial;
  }

  function format(date) {
    var partialDate = new Date(date * 1000);
    var day = (partialDate.getDate() < 10 ? '0' : '') + partialDate.getDate();
    var month = (partialDate.getMonth() < 10 ? '0' : '') + (partialDate.getMonth() + 1);
    return month + "/" + day + "/" + partialDate.getFullYear();
  }
});
define('ahasweb/routes/view-patient', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	//import RSVP from 'rsvp';

	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		model: function model(param) {
			var _this = this;

			var self = this;
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/patients/' + param.patientID).then(function (data) {
					_ember['default'].run.later(function () {
						resolve({ id: JSON.stringify(data.patient.id).replace(/\"/g, ""),
							first_name: JSON.stringify(data.patient.first_name).replace(/\"/g, ""),
							last_name: JSON.stringify(data.patient.last_name).replace(/\"/g, ""),
							species: JSON.stringify(data.patient.species).replace(/\"/g, ""),
							age: JSON.stringify(data.patient.age).replace(/\"/g, ""),
							colour: JSON.stringify(data.patient.colour).replace(/\"/g, ""),
							tattoo: JSON.stringify(data.patient.tattoo).replace(/\"/g, ""),
							microchip: JSON.stringify(data.patient.microchip).replace(/\"/g, ""),
							status: JSON.stringify(data.patient.reproductive_status).replace(/\"/g, ""),
							client_id: JSON.stringify(data.patient.client_id).replace(/\"/g, ""),
							gender: JSON.stringify(data.patient.gender).replace(/\"/g, ""),
							firstName: JSON.stringify(data.patient.client.firstName).replace(/\"/g, ""),
							lastName: JSON.stringify(data.patient.client.lastName).replace(/\"/g, ""),
							address: JSON.stringify(data.patient.client.address).replace(/\"/g, "").replace(/\\n/g, " <br> "),
							phoneNumber: JSON.stringify(data.patient.client.phoneNumber).replace(/\"/g, ""),
							email: JSON.stringify(data.patient.client.email).replace(/\"/g, ""),
							licos: JSON.stringify(data.patient.client.licos).replace(/\"/g, ""),
							aish: JSON.stringify(data.patient.client.aish).replace(/\"/g, ""),
							socialAssistance: JSON.stringify(data.patient.client.socialAssistance).replace(/\"/g, ""),
							notes: JSON.stringify(data.patient.client.notes).replace(/\"/g, "").replace(/\\n/g, " <br> "),
							alternativeContactFirstName: JSON.stringify(data.patient.client.alternativeContactFirstName).replace(/\"/g, ""),
							alternativeContactEmail: JSON.stringify(data.patient.client.alternativeContactEmail).replace(/\"/g, ""),
							alternativeContactLastName: JSON.stringify(data.patient.client.alternativeContactLastName).replace(/\"/g, ""),
							alternativeContactPhoneNumber: JSON.stringify(data.patient.client.alternativeContactPhoneNumber).replace(/\"/g, ""),
							alternativeContact2ndPhone: JSON.stringify(data.patient.client.alternativeContact2ndPhone).replace(/\"/g, ""),
							alternativeContactAddress: JSON.stringify(data.patient.client.alternativeContactAddress).replace(/\"/g, "").replace(/\\n/g, " <br> ")
						});
						console.log("we getdont here");
						//this.get('ajax').request('/api/client/1');
					});
					console.log("status is " + JSON.stringify(data));
					console.log('/api/client/' + JSON.stringify(param.patientID));
					//var self = this;
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
					}
				});
			});
			return ajaxGet;
		}

	});
});
define('ahasweb/routes/view-side-note', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	//import RSVP from 'rsvp';

	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {

		session: _ember['default'].inject.service(),
		ajax: _ember['default'].inject.service(),
		model: function model() {
			var _this = this;

			var self = this;
			var ajaxGet = new _ember['default'].RSVP.Promise(function (resolve) {
				return _this.get('ajax').request('/api/patients/1/medical_records/1/notes/1').then(function (data) {
					_ember['default'].run.later(function () {
						resolve({ id: JSON.stringify(data.note.id).replace(/\"/g, ""),
							body: JSON.stringify(data.note.body).replace(/\"/g, "").replace(/\\n/g, " <br> "),
							initials: JSON.stringify(data.note.initials).replace(/\"/g, "")
						});
						console.log("we getdont here");
						//this.get('ajax').request('/api/client/1');
					});
					console.log("status is " + JSON.stringify(data));
					//console.log("status is " + JSON.stringify(data.appointment.sig));
				}, function (response) {
					if (response === false) {
						if (self.get('session.isAuthenticated')) {
							self.get('session').invalidate();
						}
						self.transitionTo('/login');
					}
				});
			});
			return ajaxGet;
		}

	});
});
define('ahasweb/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax', 'ember-ajax/errors'], function (exports, _ember, _emberAjaxServicesAjax, _emberAjaxErrors) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({

    host: 'https://ahas.herokuapp.com',

    session: _ember['default'].inject.service(),
    headers: _ember['default'].computed('session.data.authenticated.token', {
      get: function get() {
        var headers = {};
        var token = this.get('session.data.authenticated.token');
        if (this.get('session.isAuthenticated') && token) {
          headers['Authorization'] = token;
        }
        return headers;
      }
    }),
    handleResponse: function handleResponse() {
      var result = this._super.apply(this, arguments);
      if ((0, _emberAjaxErrors.isUnauthorizedError)(result)) {
        return false;
      } else {
        return result;
      }
    }
  });
});
define('ahasweb/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _emberCookiesServicesCookies) {
  exports['default'] = _emberCookiesServicesCookies['default'];
});
define('ahasweb/services/moment', ['exports', 'ember', 'ahasweb/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _ahaswebConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_ahaswebConfigEnvironment['default'], 'moment.outputFormat')
  });
});
define('ahasweb/services/resize-detector', ['exports', 'ember-element-resize-detector/services/resize-detector'], function (exports, _emberElementResizeDetectorServicesResizeDetector) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberElementResizeDetectorServicesResizeDetector['default'];
    }
  });
});
define('ahasweb/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('ahasweb/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("ahasweb/templates/admin", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YQn321Yo", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"users\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\" Users \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"search row\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"keyUp\",\"value\"],[\"text\",\"searchInput col-md-8\",[\"helper\",[\"action\"],[[\"get\",[null]],\"filterUsers\"],null],[\"get\",[\"filterOn\"]]]]],false],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"col-md-2 searchButton\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"filterUsers\"]],[\"flush-element\"],[\"text\",\"Search \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-2 col-md-offset-1\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-2 col-md-offset-2\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"list-group\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"users\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"a\",[]],[\"dynamic-attr\",\"href\",[\"concat\",[\"/admin/users/\",[\"unknown\",[\"user\",\"id\"]]]]],[\"static-attr\",\"class\",\"row list-group-item\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-2 col-md-offset-1\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"unknown\",[\"user\",\"name\"]],false],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-2 col-md-offset-2\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/admin.hbs" } });
});
define("ahasweb/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "d562cSVF", "block": "{\"statements\":[[\"comment\",\" TODO: reorganize navigation bar to reflect final UI \"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,4],[\"text\",\"\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"body\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\t\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"h5\",[]],[\"static-attr\",\"class\",\"navItem\"],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"invalidateSession\"]],[\"flush-element\"],[\"text\",\"Logout\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"h5\",[]],[\"static-attr\",\"class\",\"navItem\"],[\"flush-element\"],[\"text\",\"Contacts\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"h5\",[]],[\"static-attr\",\"class\",\"navItem\"],[\"flush-element\"],[\"text\",\"Patients\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"h5\",[]],[\"static-attr\",\"class\",\"navItem\"],[\"flush-element\"],[\"text\",\"Clients\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-inverse\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"nav-link-to\"],[\"client-list\"],null,3],[\"block\",[\"nav-link-to\"],[\"search-patient\"],null,2],[\"block\",[\"nav-link-to\"],[\"search-contacts\"],null,1],[\"block\",[\"nav-link-to\"],[\"login\"],null,0],[\"text\",\"\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/application.hbs" } });
});
define("ahasweb/templates/client-info", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "pLlVmD22", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"infoBlock\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Client: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"lastName\"]],false],[\"text\",\", \"],[\"append\",[\"unknown\",[\"model\",\"firstName\"]],false],[\"close-element\"],[\"text\",\"  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Address:\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"address\"]],true],[\"text\",\" \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Phone Number: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"phoneNumber\"]],false],[\"text\",\" \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Email: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"email\"]],false],[\"text\",\" \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"infoBlock\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Documentation Information: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"LICO: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"licos\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"AISH: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"aish\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"SA: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"socialAssistance\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Notes: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"notes\"]],true],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"infoBlock\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Alternate Contact: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"alternativeContactLastName\"]],false],[\"text\",\", \"],[\"append\",[\"unknown\",[\"model\",\"alternativeContactFirstName\"]],false],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Address: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"alternativeContactAddress\"]],true],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Phone Number: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"alternativeContactPhoneNumber\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Second Phone Number: \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"alternativeContact2ndPhone\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Email: \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"unknown\",[\"model\",\"alternativeContactEmail\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"infoBlock\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Pet: \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"comment\",\" TODO loop through list of pets \"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"patients\"]]],null,0],[\"text\",\"\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"infoBlock\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Created: \"],[\"close-element\"],[\"append\",[\"unknown\",[\"model\",\"created_at\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Last modified: \"],[\"close-element\"],[\"append\",[\"unknown\",[\"model\",\"updated_at\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"newPatient\",[\"get\",[\"model\",\"clientID\"]]]],[\"flush-element\"],[\"text\",\"Add A Patient\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"newAppointment\",[\"get\",[\"model\",\"clientID\"]]]],[\"flush-element\"],[\"text\",\"Add An Appointment\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editClient\",[\"get\",[\"model\",\"clientID\"]]]],[\"flush-element\"],[\"text\",\"Edit Client\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"viewPatient\",[\"get\",[\"pet\",\"id\"]]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"pet\",\"firstName\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"pet\",\"lastName\"]],false],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"pet\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/client-info.hbs" } });
});
define("ahasweb/templates/client-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Sgycwh4C", "block": "{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"search-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"filterClient\"]],[\"flush-element\"],[\"text\",\"Search\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"static-attr\",\"placeholder\",\"Search\"],[\"static-attr\",\"autofocus\",\"autofocus\"],[\"static-attr\",\"id\",\"search-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nameList\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"comment\",\" TODO: filter client list \"],[\"text\",\"\\n\"],[\"block\",[\"ember-scrollable\"],null,[[\"autoHide\"],[false]],1],[\"text\",\"\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"id\",\"newClientLinkButton\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"newClient\"]],[\"flush-element\"],[\"text\",\"Create New Client\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nameListItem\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"viewClient\",[\"get\",[\"client\",\"id\"]]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"client\",\"firstName\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"client\",\"lastName\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[\"client\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"model\",\"clientsFiltered\"]]],null,0]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/client-list.hbs" } });
});
define("ahasweb/templates/components/client-list-filter", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Un6J86cH", "block": "{\"statements\":[[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"key-up\",\"class\",\"placeholder\"],[[\"get\",[\"value\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"handleClientFilterEntry\"],null],\"light\",\"Search Client\"]]],false],[\"text\",\"\\n\"],[\"yield\",\"default\",[[\"get\",[\"results\"]]]],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/components/client-list-filter.hbs" } });
});
define("ahasweb/templates/components/file-picker", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "wv6mXHW0", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"dropzone\"]]],null,6,5],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"preview\"]]],null,4],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"progress\"]]],null,3],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\",\"accept\",\"multiple\",\"class\"],[\"file\",[\"get\",[\"file\"]],[\"get\",[\"accept\"]],[\"get\",[\"multiple\"]],\"file-picker__input\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"file-picker__progress\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"file-picker__progress__value\"],[\"dynamic-attr\",\"style\",[\"unknown\",[\"progressStyle\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"progress\",[]],[\"dynamic-attr\",\"value\",[\"unknown\",[\"progressValue\"]],null],[\"static-attr\",\"max\",\"100\"],[\"static-attr\",\"class\",\"file-picker__progress\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"progress\"]],false],[\"text\",\" %\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"isProgressSupported\"]]],null,1,0]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"showProgress\"]]],null,2]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"file-picker__preview\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"file-picker__dropzone\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"yield\",\"default\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/components/file-picker.hbs" } });
});
define("ahasweb/templates/components/history-container", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "trVY+oYj", "block": "{\"statements\":[[\"append\",[\"helper\",[\"patient-history\"],null,[[\"isVisible\",\"patientId\"],[[\"get\",[\"chronoIsVisible\"]],[\"get\",[\"patientID\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"medication-history\"],null,[[\"isVisible\",\"patientId\"],[[\"get\",[\"medicationIsVisible\"]],[\"get\",[\"patientID\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"history-selector\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"history-selector-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"showChronological\"]],[\"flush-element\"],[\"text\",\"Chronological\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"history-selector-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"showMedication\"]],[\"flush-element\"],[\"text\",\"Medication History\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/components/history-container.hbs" } });
});
define("ahasweb/templates/components/medication-history", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "9zHkgLFJ", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"new-entry-button-wrapper\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"new-entry-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"newEntry\"]],[\"flush-element\"],[\"text\",\"New Entry\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\t\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"infoBlock\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\t\\t\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"history-list\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"ember-scrollable\"],null,[[\"autoHide\"],[false]],1],[\"text\",\"\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nameListItem\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"viewEntry\",[\"get\",[\"entry\",\"medical_record_id\"]]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"entry\",\"name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"entry\",\"date\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"entry\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"medicationList\"]]],null,0]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/components/medication-history.hbs" } });
});
define("ahasweb/templates/components/medication-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "IATioqq6", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"medications\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"class\",\"placeholder\",\"focus-out\"],[[\"get\",[\"name\"]],\"light\",\"Medication...\",\"update\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"bootstrap-datepicker\"],null,[[\"class\",\"value\",\"placeholder\",\"oninput\"],[\"datePicker\",[\"get\",[\"reminder\"]],\"Reminder...\",\"update\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"svg\",[]],[\"static-attr\",\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[\"static-attr\",\"viewBox\",\"0 0 640 512\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"delete\"]],[\"flush-element\"],[\"open-element\",\"path\",[]],[\"static-attr\",\"d\",\"M555.9 156.3C543 125.9 524.5 98.5 501 75s-50.9-42-81.3-54.9C388.1 6.8 354.5 0 320 0s-68.1 6.8-99.7 20.1C189.9 33 162.5 51.5 139 75s-42 50.9-54.9 81.3C70.8 187.9 64 221.5 64 256s6.8 68.1 20.1 99.7C97 386.1 115.5 413.5 139 437s50.9 41.9 81.4 54.8c31.6 13.4 65.1 20.1 99.7 20.1s68.1-6.8 99.7-20.1c30.5-12.9 57.9-31.3 81.4-54.8s41.9-50.9 54.8-81.4c13.4-31.6 20.1-65.1 20.1-99.7s-6.9-68-20.2-99.6zm-118.2 166c3.1 3.1 3.1 8.2 0 11.3l-40 40c-3.1 3.1-8.2 3.1-11.3 0L320 307.3l-66.3 66.3c-3.1 3.1-8.2 3.1-11.3 0l-40-40c-3.1-3.1-3.1-8.2 0-11.3l66.3-66.3-66.3-66.3c-3.1-3.1-3.1-8.2 0-11.3l40-40c3.1-3.1 8.2-3.1 11.3 0l66.3 66.3 66.3-66.3c3.1-3.1 8.2-3.1 11.3 0l40 40c3.1 3.1 3.1 8.2 0 11.3L371.3 256l66.4 66.3z\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"yield\",\"default\",[[\"get\",[\"results\"]]]]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/components/medication-input.hbs" } });
});
define("ahasweb/templates/components/medications-container", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "F3dkKl4Q", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"medications\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"medicationList\"]]],null,0],[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addMedication\"]],[\"flush-element\"],[\"text\",\"Add\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"yield\",\"default\",[[\"get\",[\"results\"]]]]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"append\",[\"helper\",[\"medication-input\"],null,[[\"index\",\"reminder\",\"name\",\"update\",\"delete\"],[[\"get\",[\"index\"]],[\"get\",[\"item\",\"reminder\"]],[\"get\",[\"item\",\"name\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"updateMed\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"deleteMed\"],null]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"item\",\"index\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/components/medications-container.hbs" } });
});
define("ahasweb/templates/components/patient-history", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "XEMgPa9f", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"new-entry-button-wrapper\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"new-entry-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"newEntry\"]],[\"flush-element\"],[\"text\",\"New Entry\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\t\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"infoBlock\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\t\\t\\n\\t\\t\"],[\"comment\",\" <p>some text about the entire medical history in chronological order!</p> \"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"history-list\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"ember-scrollable\"],null,[[\"autoHide\"],[false]],1],[\"text\",\"\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nameListItem\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"viewEntry\",[\"get\",[\"entry\",\"recordId\"]],[\"get\",[\"entry\",\"date\"]]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"entry\",\"summary\"]],false],[\"text\",\"  \"],[\"append\",[\"unknown\",[\"entry\",\"dateToDisplay\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"entry\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"medicalRecord\"]]],null,0]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/components/patient-history.hbs" } });
});
define("ahasweb/templates/components/signature-pad", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vNjxV/Hp", "block": "{\"statements\":[[\"open-element\",\"canvas\",[]],[\"dynamic-attr\",\"width\",[\"unknown\",[\"width\"]],null],[\"dynamic-attr\",\"height\",[\"unknown\",[\"height\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/components/signature-pad.hbs" } });
});
define("ahasweb/templates/create-contact", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DjcrMJDE", "block": "{\"statements\":[[\"text\",\" \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputContactGroup\"],[\"flush-element\"],[\"text\",\"\\n \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\" New contact: \"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"type\"],[\"flush-element\"],[\"text\",\"What type of volunteer is this?\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"select\",[]],[\"static-attr\",\"id\",\"type\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"showLastName\"],[[\"on\"],[\"change\"]]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Veterinarian\"],[\"flush-element\"],[\"text\",\" Veterinarian \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Volunteer\"],[\"flush-element\"],[\"text\",\" Volunteer \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Laboratory\"],[\"flush-element\"],[\"text\",\" Laboratory \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\" \\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"    \\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"first_name\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"First Name:\"],[\"close-element\"],[\"text\",\"\\n \\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"value\"],[\"first_name\",\"inputContactBox\",[\"get\",[\"first_name\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"laboratory\"]]],null,0],[\"text\",\"  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"phoneNumber\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Phone Number: \"],[\"close-element\"],[\"text\",\"\\n  \\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"value\"],[\"phoneNumber\",\"inputContactBox\",[\"get\",[\"phoneNumber\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"faxNumber\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Fax Number: \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"class\",\"value\"],[\"faxNumber\",\"faxNumber\",\"inputContactBox\",[\"get\",[\"faxNumber\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Email: \"],[\"close-element\"],[\"text\",\"\\n \\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"class\",\"value\"],[\"email\",\"email\",\"inputContactBox\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"address\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Address: \"],[\"close-element\"],[\"text\",\"\\n \\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"class\",\"value\"],[\"address\",\"address\",\"inputContactBox\",[\"get\",[\"address\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"create-contact-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createContact\"]],[\"flush-element\"],[\"text\",\"Create\"],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"alert_placeholder\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"last_name\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Last Name:\"],[\"close-element\"],[\"text\",\"\\n \\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"class\",\"value\"],[\"last_name\",\"inputContactBox\",[\"get\",[\"last_name\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/create-contact.hbs" } });
});
define("ahasweb/templates/create-user", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "jiPEqddf", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" Back to the login page: \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"login\"],null,0],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\" \\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputLoginGroup\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\" Please enter your information to create an account : \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\" \\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"name\"],[\"static-attr\",\"class\",\"inputUserLabel\"],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"name\",[\"get\",[\"name\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"username\"],[\"static-attr\",\"class\",\"inputUserLabel\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"username\",[\"get\",[\"identification\"]]]]],false],[\"text\",\"\\n\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password\"],[\"static-attr\",\"class\",\"inputUserLabel\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"type\"],[\"password\",[\"get\",[\"password\"]],\"password\"]]],false],[\"text\",\"\\n\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"passwordConfirm\"],[\"static-attr\",\"class\",\"inputUserLabel\"],[\"flush-element\"],[\"text\",\"Confirm Password\"],[\"close-element\"],[\"text\",\"\\n  \\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"type\"],[\"passwordConfirm\",[\"get\",[\"confirmpassword\"]],\"password\"]]],false],[\"text\",\"\\n\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"create-user-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createUser\"]],[\"flush-element\"],[\"text\",\"Create\"],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"alert_placeholder\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Login\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/create-user.hbs" } });
});
define("ahasweb/templates/edit-client", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ezX97RYO", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\\n\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"saveClient\",[\"get\",[\"model\"]]],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Please edit the desired contact information\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"clientFirstName\"],[\"flush-element\"],[\"text\",\"Client's First Name\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"clientFirstName\",[\"get\",[\"model\",\"firstName\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"clientLastName\"],[\"flush-element\"],[\"text\",\"Client's Last Name\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"clientLastName\",[\"get\",[\"model\",\"lastName\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"clientAddress\"],[\"flush-element\"],[\"text\",\"Client's Address\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"value\",\"required\",\"cols\",\"rows\"],[\"clientAddress\",[\"get\",[\"model\",\"address\"]],\"true\",\"50\",\"4\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"clientPhone\"],[\"flush-element\"],[\"text\",\"Client's Phone Number\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"clientPhone\",[\"get\",[\"model\",\"phoneNumber\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"clientEmail\"],[\"flush-element\"],[\"text\",\"Client's Email\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"clientEmail\",[\"get\",[\"model\",\"email\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Client's documentation\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"licoDocumentation\"],[\"flush-element\"],[\"text\",\"LICO\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"clientLICO\",[\"get\",[\"model\",\"licos\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"aishDocumentation\"],[\"flush-element\"],[\"text\",\"AISH\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"clientAISH\",[\"get\",[\"model\",\"aish\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"saDocumentation\"],[\"flush-element\"],[\"text\",\"SA\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"clientSA\",[\"get\",[\"model\",\"socialAssistance\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"notesDocumentation\"],[\"flush-element\"],[\"text\",\"Notes\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"value\",\"cols\",\"rows\"],[\"clientNotes\",[\"get\",[\"model\",\"notes\"]],\"80\",\"6\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Alternative contact's contact information\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativeFirstName\"],[\"flush-element\"],[\"text\",\"Alternative Contact's First Name\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"alternativeFirstName\",[\"get\",[\"model\",\"alternativeContactFirstName\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativeLastName\"],[\"flush-element\"],[\"text\",\"Alternative Contact's Last Name\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"alternativeLastName\",[\"get\",[\"model\",\"alternativeContactLastName\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativeAddress\"],[\"flush-element\"],[\"text\",\"Alternative Contact's Address\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"value\",\"cols\",\"rows\"],[\"alternativeAddress\",[\"get\",[\"model\",\"alternativeContactAddress\"]],\"50\",\"4\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativePrimaryPhone\"],[\"flush-element\"],[\"text\",\"Alternative Contact's Primary Phone Number\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"alternativePrimaryPhone\",[\"get\",[\"model\",\"alternativeContactPhoneNumber\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativeSecondaryPhone\"],[\"flush-element\"],[\"text\",\"Alternative Contact's Secondary Phone Number\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"alternativeSecondaryPhone\",[\"get\",[\"model\",\"alternativeContact2ndPhone\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativeEmail\"],[\"flush-element\"],[\"text\",\"Alternative Contact's Email\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"alternativeEmail\",[\"get\",[\"model\",\"alternativeContactEmail\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"create-client-button\"],[\"flush-element\"],[\"text\",\"Save\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/edit-client.hbs" } });
});
define("ahasweb/templates/edit-contact", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "l/sKnlJO", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputContactGroup\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"heading\"],[\"flush-element\"],[\"text\",\" Editing: \"],[\"append\",[\"unknown\",[\"model\",\"first_name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"model\",\"last_name\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\" \\n\\n \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"type\"],[\"flush-element\"],[\"text\",\"What type of volunteer is this?\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"select\",[]],[\"static-attr\",\"id\",\"type\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"showLastName\"],[[\"on\"],[\"change\"]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"veterinarian\"]]],null,5],[\"block\",[\"if\"],[[\"get\",[\"model\",\"volunteer\"]]],null,4],[\"block\",[\"if\"],[[\"get\",[\"model\",\"laboratory\"]]],null,3],[\"block\",[\"if\"],[[\"get\",[\"model\",\"technician\"]]],null,2],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"laboratory\"]]],null,1,0],[\"text\",\"  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"phoneNumber\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Phone Number: \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"phoneNumber\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"phone_number\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"faxNumber\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Fax Number: \"],[\"close-element\"],[\"text\",\"\\n  \\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"faxNumber\"],[\"static-attr\",\"id\",\"faxNumber\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"fax_number\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Email: \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"email\"],[\"static-attr\",\"id\",\"email\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"email\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"address\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Address: \"],[\"close-element\"],[\"text\",\"\\n  \\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"address\"],[\"static-attr\",\"id\",\"address\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"address\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"done-edit-button\"],[\"static-attr\",\"class\",\"centeredButton\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"doneEditContact\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Done Editing\"],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"alert_placeholder\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"   \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"   \\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"first_name\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"First Name:\"],[\"close-element\"],[\"text\",\"\\n  \\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"first_name\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"first_name\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"last_name\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Last Name:\"],[\"close-element\"],[\"text\",\"\\n \\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"last_name\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"last_name\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"first_name\"],[\"static-attr\",\"class\",\"inputContactLabel\"],[\"flush-element\"],[\"text\",\"Name:\"],[\"close-element\"],[\"text\",\"\\n  \\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"first_name\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"first_name\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Veterinarian\"],[\"flush-element\"],[\"text\",\" Veterinarian \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Volunteer\"],[\"flush-element\"],[\"text\",\" Volunteer \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Laboratory\"],[\"flush-element\"],[\"text\",\" Laboratory \"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Technician\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" Technician \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Veterinarian\"],[\"flush-element\"],[\"text\",\" Veterinarian \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Volunteer\"],[\"flush-element\"],[\"text\",\" Volunteer \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Laboratory\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" Laboratory \"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Technician\"],[\"flush-element\"],[\"text\",\" Technician \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Veterinarian\"],[\"flush-element\"],[\"text\",\" Veterinarian \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Volunteer\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" Volunteer \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Laboratory\"],[\"flush-element\"],[\"text\",\" Laboratory \"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Technician\"],[\"flush-element\"],[\"text\",\" Technician \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Veterinarian\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" Veterinarian \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Volunteer\"],[\"flush-element\"],[\"text\",\" Volunteer \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Laboratory\"],[\"flush-element\"],[\"text\",\" Laboratory \"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"Technician\"],[\"flush-element\"],[\"text\",\" Technician \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/edit-contact.hbs" } });
});
define("ahasweb/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "NfRwH4Go", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/index.hbs" } });
});
define("ahasweb/templates/lab-result-upload", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "42fqF2XU", "block": "{\"statements\":[[\"comment\",\" <div {{action 'clickChooseFile'}}>\\n\\t<input  type = \\\"file\\\" id = \\\"files\\\" name = \\\"files[]\\\" mulitple />\\n</div>\\n<output id = \\\"list\\\"></output> \"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"sendLabResults\",[\"get\",[\"model\",\"patientId\"]]],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"file-picker\"],null,[[\"fileLoaded\",\"readAs\"],[\"fileLoaded\",\"readAsDataURL\"]],0],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"fileDatePicker\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"bootstrap-datepicker\"],null,[[\"id\",\"value\",\"autoclose\",\"placeholder\",\"class\",\"required\"],[\"datePicker\",[\"get\",[\"datePicker\"]],true,\"Date of lab result\",\"form-control\",true]]],false],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"saveLabResults\"],[\"static-attr\",\"class\",\"saveFileButton\"],[\"flush-element\"],[\"text\",\"Save\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"fileDropZone\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tDrag here or click to upload a file\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/lab-result-upload.hbs" } });
});
define("ahasweb/templates/list-side-note", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6q+zxcXo", "block": "{\"statements\":[[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createSideNote\",[\"get\",[\"model\",\"patientID\"]],[\"get\",[\"model\",\"medID\"]]]],[\"flush-element\"],[\"text\",\"New Side Note\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nameList\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"ember-scrollable\"],null,[[\"autoHide\"],[false]],1],[\"text\",\"    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"                    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nameListItem\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"getNote\",[\"get\",[\"note\",\"id\"]]]],[\"flush-element\"],[\"text\",\"\\n                            \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"note\",\"id\"]],false],[\"close-element\"],[\"text\",\"\\n                    \"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[\"note\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"model\",\"notesW\"]]],null,0]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/list-side-note.hbs" } });
});
define("ahasweb/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "uqGiBm01", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputLoginGroup\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"authenticate\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"  \\n\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLoginLabel\"],[\"static-attr\",\"for\",\"username\"],[\"flush-element\"],[\"text\",\"Username\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"username\",[\"get\",[\"username\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLoginLabel\"],[\"static-attr\",\"for\",\"password\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"type\"],[\"password\",[\"get\",[\"password\"]],\"password\"]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \\n\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"id\",\"login-button\"],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"login-button\"],[\"flush-element\"],[\"text\",\"Login\"],[\"close-element\"],[\"text\",\"\\n\\n\\n \"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"alert_placeholder\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/login.hbs" } });
});
define("ahasweb/templates/medical-record", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "XUrhHo9z", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row allMedGroup\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"medHeading\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-12 col-md-12\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\" New Medical Record \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\" Date: \"],[\"append\",[\"unknown\",[\"model\",\"date\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-7 col-md-7\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\" placeholder for pet info: \\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"rows\",\"10\"],[\"static-attr\",\"cols\",\"40\"],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Attitude \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 col-md-3\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"static-attr\",\"for\",\"attitudeBAR\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"attitude\"],[\"static-attr\",\"id\",\"attitudeBAR\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  BAR \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"static-attr\",\"for\",\"attitudeQAR\"],[\"flush-element\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"attitude\"],[\"static-attr\",\"id\",\"attitudeQAR\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  QAR \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3 labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"attitudeDepressed\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Depressed \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" Temp \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"temperatureText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Eyes \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio \"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"eyes\"],[\"static-attr\",\"id\",\"eyesN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"eyes\"],[\"static-attr\",\"id\",\"eyesA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOU\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OU \"],[\"close-element\"],[\"text\",\"\\n     \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOD\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OD \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOS\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OS \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"eyesText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Oral \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"oral\"],[\"static-attr\",\"id\",\"oralN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"oral\"],[\"static-attr\",\"id\",\"oralA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"oralText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"MM \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmPale\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Pale \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-6 col-md-6\"],[\"flush-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmJaundiced\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Jaundiced \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmTacky\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Tacky \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-2 \"],[\"flush-element\"],[\"text\",\"Ears \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"ears\"],[\"static-attr\",\"id\",\"earsN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"ears\"],[\"static-attr\",\"id\",\"earsA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-7 col-md-7 \"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsEarMites\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Ear Mites \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAU\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AU \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAD\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AD \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAS\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AS \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"checkboxMed\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"earsText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-2\"],[\"flush-element\"],[\"text\",\"Glands/Nodes \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"glands\"],[\"static-attr\",\"id\",\"glandsN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"glands\"],[\"static-attr\",\"id\",\"glandsA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"glandsText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Skin \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"skin\"],[\"static-attr\",\"id\",\"skinN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"skin\"],[\"static-attr\",\"id\",\"skinA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"skinText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Abdomen \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"abdomen\"],[\"static-attr\",\"id\",\"abdomenN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"abdomen\"],[\"static-attr\",\"id\",\"abdomenA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"abdomenText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-2\"],[\"flush-element\"],[\"text\",\"Urogential \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"urogential\"],[\"static-attr\",\"id\",\"urogentialN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"urogential\"],[\"static-attr\",\"id\",\"urogentialA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"urogentialText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Nervous System \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"nervous\"],[\"static-attr\",\"id\",\"nervousSystemN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"nervous\"],[\"static-attr\",\"id\",\"nervousSystemA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"nervousSystemText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 col-md-2\"],[\"flush-element\"],[\"text\",\"Musculoskeletal \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"musculoskeletal\"],[\"static-attr\",\"id\",\"musculoskeletalN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"musculoskeletal\"],[\"static-attr\",\"id\",\"musculoskeletalA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"musculoskeletalText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 col-md-2\"],[\"flush-element\"],[\"text\",\"Cardiovascular \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"cardiovascular\"],[\"static-attr\",\"id\",\"cardiovascularN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"cardiovascular\"],[\"static-attr\",\"id\",\"cardiovascularA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"cardiovascularText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-1\"],[\"flush-element\"],[\"text\",\" HR \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"hrText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 \"],[\"flush-element\"],[\"text\",\"Respiratory \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"respiratory\"],[\"static-attr\",\"id\",\"respiratoryN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"name\",\"respiratory\"],[\"static-attr\",\"id\",\"respiratoryA\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"respiratoryText1\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-1\"],[\"flush-element\"],[\"text\",\" RR \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-1 \"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"respiratoryText2\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"BCS  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 bcsSelect\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"select\",[]],[\"static-attr\",\"id\",\"bcsvalue\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\"/9\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-7 col-md-7\"],[\"flush-element\"],[\"text\",\"MCS \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsMild\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Mild \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsMod\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Mod \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" labelForRadio\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsSevere\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Severe \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\" Weight \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-2 \"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"weight\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-5 col-md-4\"],[\"flush-element\"],[\"text\",\"Unit  \\n    \"],[\"open-element\",\"select\",[]],[\"static-attr\",\"id\",\"unit\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"kg\"],[\"flush-element\"],[\"text\",\" kg\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"lbs\"],[\"flush-element\"],[\"text\",\" lbs\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"addButton\"],[\"static-attr\",\"id\",\"check-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"checkAll\"]],[\"flush-element\"],[\"text\",\"Check all\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"addButton\"],[\"static-attr\",\"id\",\"uncheck-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"uncheckAll\"]],[\"flush-element\"],[\"text\",\"Uncheck all\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"notes\"],[\"flush-element\"],[\"text\",\"Notes: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"id\",\"notes\"],[\"static-attr\",\"rows\",\"10\"],[\"static-attr\",\"cols\",\"70\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  Medicine\\n\"],[\"append\",[\"helper\",[\"medications-container\"],null,[[\"medType\",\"medicationList\"],[\"Medicine\",[\"get\",[\"medicine\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  Vaccines\\n\"],[\"append\",[\"helper\",[\"medications-container\"],null,[[\"medType\",\"medicationList\"],[\"Vaccine\",[\"get\",[\"vaccine\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  Other\\n\"],[\"append\",[\"helper\",[\"medications-container\"],null,[[\"medType\",\"medicationList\"],[\"Other\",[\"get\",[\"other\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3 col-sm-offset-1 col-md-offset-1\"],[\"flush-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"followUpNotes\"],[\"flush-element\"],[\"text\",\"Follow up notes: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"id\",\"followUpNotes\"],[\"static-attr\",\"rows\",\"5\"],[\"static-attr\",\"cols\",\"35\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"summary\"],[\"flush-element\"],[\"text\",\"Short summary: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"id\",\"summary\"],[\"static-attr\",\"rows\",\"5\"],[\"static-attr\",\"cols\",\"35\"],[\"static-attr\",\"value\",\"\"],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\" Veterinarian Signature: \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"append\",[\"helper\",[\"signature-pad\"],null,[[\"color\",\"height\",\"value\",\"weight\",\"width\",\"id\"],[[\"get\",[\"color\"]],[\"get\",[\"height\"]],[\"get\",[\"signature\"]],[\"get\",[\"weight\"]],[\"get\",[\"width\"]],\"signature\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"medical-button\"],[\"static-attr\",\"id\",\"clear-signature-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"clearSignature\"]],[\"flush-element\"],[\"text\",\"Clear Signature\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"medical-button\"],[\"static-attr\",\"id\",\"create-medical-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createMedicalRecord\"]],[\"flush-element\"],[\"text\",\"Create medical record\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"alert_placeholder_med\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"medical-button\"],[\"static-attr\",\"id\",\"create-medical-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"show\"]],[\"flush-element\"],[\"text\",\"show\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/medical-record.hbs" } });
});
define("ahasweb/templates/new-calendar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "4YhVAADN", "block": "{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submitNewCalendar\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Please fill in the appointment\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"appointmentStart\"],[\"flush-element\"],[\"text\",\"Start Date:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"appointmentStart\"],[\"static-attr\",\"data-provide\",\"datepicker\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"appointmentStartTime\"],[\"flush-element\"],[\"text\",\"Start Time:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"appointmentStartTime\",[\"get\",[\"appointmentStartTime\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"appointmentEnd\"],[\"flush-element\"],[\"text\",\"End Date:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"appointmentEnd\"],[\"static-attr\",\"data-provide\",\"datepicker\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"appointmentEndTime\"],[\"flush-element\"],[\"text\",\"End Time:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"appointmentEndTime\",[\"get\",[\"appointmentEndTime\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"appointmentReason\"],[\"flush-element\"],[\"text\",\"Reason:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"value\",\"required\",\"cols\",\"rows\"],[\"appointmentReason\",[\"get\",[\"appointmentReason\"]],\"true\",\"50\",\"4\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"appointmentNote\"],[\"flush-element\"],[\"text\",\"Note:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"value\",\"cols\",\"rows\"],[\"appointmentNote\",[\"get\",[\"appointmentNote\"]],\"50\",\"4\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"appointmentLocation\"],[\"flush-element\"],[\"text\",\"Location:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"appointmentLocation\",[\"get\",[\"appointmentLocation\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"create-appointment-button\"],[\"flush-element\"],[\"text\",\"Create Appointment\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/new-calendar.hbs" } });
});
define("ahasweb/templates/new-client", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "MFjnnPaT", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\\n\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submitNewClient\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Please fill in the client's contact information\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"clientFirstName\"],[\"flush-element\"],[\"text\",\"Client's First Name\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"clientFirstName\",[\"get\",[\"clientFirstName\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"clientLastName\"],[\"flush-element\"],[\"text\",\"Client's Last Name\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"clientLastName\",[\"get\",[\"clientLastName\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"clientAddress\"],[\"flush-element\"],[\"text\",\"Client's Address\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"value\",\"required\",\"cols\",\"rows\"],[\"clientAddress\",[\"get\",[\"clientAddress\"]],\"true\",\"50\",\"4\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"clientPhone\"],[\"flush-element\"],[\"text\",\"Client's Phone Number\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"clientPhone\",[\"get\",[\"clientPhone\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"clientEmail\"],[\"flush-element\"],[\"text\",\"Client's Email\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"clientEmail\",[\"get\",[\"clientEmail\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Please fill in the client's documentation\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"licoDocumentation\"],[\"flush-element\"],[\"text\",\"LICO\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"clientLICO\",[\"get\",[\"clientLICO\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"aishDocumentation\"],[\"flush-element\"],[\"text\",\"AISH\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"clientAISH\",[\"get\",[\"clientAISH\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"saDocumentation\"],[\"flush-element\"],[\"text\",\"SA\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"clientSA\",[\"get\",[\"clientSA\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"notesDocumentation\"],[\"flush-element\"],[\"text\",\"Notes\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"value\",\"cols\",\"rows\"],[\"clientNotes\",[\"get\",[\"clientNotes\"]],\"80\",\"6\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Please fill in the alternative contact's contact information\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativeFirstName\"],[\"flush-element\"],[\"text\",\"Alternative Contact's First Name\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"alternativeFirstName\",[\"get\",[\"alternativeFirstName\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativeLastName\"],[\"flush-element\"],[\"text\",\"Alternative Contact's Last Name\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"alternativeLastName\",[\"get\",[\"alternativeLastName\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativeAddress\"],[\"flush-element\"],[\"text\",\"Alternative Contact's Address\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"value\",\"cols\",\"rows\"],[\"alternativeAddress\",[\"get\",[\"alternativeAddress\"]],\"50\",\"4\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativePrimaryPhone\"],[\"flush-element\"],[\"text\",\"Alternative Contact's Primary Phone Number\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"alternativePrimaryPhone\",[\"get\",[\"alternativePrimaryPhone\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativeSecondaryPhone\"],[\"flush-element\"],[\"text\",\"Alternative Contact's Secondary Phone Number\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"alternativeSecondaryPhone\",[\"get\",[\"alternativeSecondaryPhone\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"alternativeEmail\"],[\"flush-element\"],[\"text\",\"Alternative Contact's Email\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\"],[\"alternativeEmail\",[\"get\",[\"alternativeEmail\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"create-client-button\"],[\"flush-element\"],[\"text\",\"Create Client\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/new-client.hbs" } });
});
define("ahasweb/templates/new-patient", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "8rl5Lq56", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submitNewPatient\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Please fill in the patient's current status\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"patientFirstName\"],[\"flush-element\"],[\"text\",\"Patient's First Name\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"patientFirstName\",[\"get\",[\"patientFirstName\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"patientLastName\"],[\"flush-element\"],[\"text\",\"Patient's Last Name\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"patientLastName\",[\"get\",[\"patientLastName\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"patientSpecies\"],[\"flush-element\"],[\"text\",\"Patient's Species\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"patientSpecies\",[\"get\",[\"patientSpecies\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"patientGender\"],[\"flush-element\"],[\"text\",\"Patient's Gender\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"patientGender\",[\"get\",[\"patientGender\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"patientStatus\"],[\"flush-element\"],[\"text\",\"Patient's Reproduction Status\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"patientStatus\",[\"get\",[\"patientStatus\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"patientAge\"],[\"flush-element\"],[\"text\",\"Patient's Age\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"patientAge\",[\"get\",[\"patientAge\"]],\"false\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"patientColor\"],[\"flush-element\"],[\"text\",\"Patient's Color\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"patientColor\",[\"get\",[\"patientColor\"]],\"true\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"patientTatoo\"],[\"flush-element\"],[\"text\",\"Patient's Tatoo ID\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"patientTatoo\",[\"get\",[\"patientTatoo\"]],\"false\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"patientMicrochip\"],[\"flush-element\"],[\"text\",\"Patient's Microchip Number\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"patientMicrochip\",[\"get\",[\"patientMicrochip\"]],\"false\"]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"create-patient-button\"],[\"flush-element\"],[\"text\",\"Create Patient\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"reset\"],[\"static-attr\",\"id\",\"reset-patient-button\"],[\"flush-element\"],[\"text\",\"Reset Form\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"checkid-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"checkid\"]],[\"flush-element\"],[\"text\",\"checkid\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/new-patient.hbs" } });
});
define("ahasweb/templates/new-side-note", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "p5L9UjcP", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submitNewNote\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" Please Enter your new side note \"],[\"close-element\"],[\"text\",\"\\n  \\t\\t\\t\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"medNotes\"],[\"flush-element\"],[\"text\",\"Side Note:\"],[\"close-element\"],[\"text\",\"\\n  \\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n  \\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"value\",\"cols\",\"rows\"],[\"medNotes\",[\"get\",[\"medNotes\"]],\"80\",\"6\"]]],false],[\"text\",\"\\n  \\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n  \\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"inputLabel\"],[\"static-attr\",\"for\",\"medSig\"],[\"flush-element\"],[\"text\",\"Signature:\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"inputBox\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"value\",\"required\"],[\"medSignature\",[\"get\",[\"medSignature\"]],\"true\"]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n  \\t\\t\"],[\"close-element\"],[\"text\",\"\\n  \\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \\t\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"create-sidenote-button\"],[\"flush-element\"],[\"text\",\"Create Note\"],[\"close-element\"],[\"text\",\"\\n  \\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/new-side-note.hbs" } });
});
define("ahasweb/templates/search-contacts", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "osxU+oYd", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-7 col-sm-offset-1 col-md-7  col-md-offset-1\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"filterContact\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\" \\n        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"static-attr\",\"placeholder\",\"Search\"],[\"static-attr\",\"autofocus\",\"autofocus\"],[\"static-attr\",\"id\",\"search-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"search-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"filterContact\"]],[\"flush-element\"],[\"text\",\"Search\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3  col-sm-offset-1 col-md-3 col-md-offset-1\"],[\"static-attr\",\"id\",\"veterinariansHeading\"],[\"flush-element\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Veterinarians\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3  col-sm-offset-1 col-md-3 col-md-offset-1\"],[\"static-attr\",\"id\",\"volunteersHeading\"],[\"flush-element\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Volunteers\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3  col-sm-offset-1 col-md-3 col-md-offset-1\"],[\"static-attr\",\"id\",\"laboratoryHeading\"],[\"flush-element\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Laboratory\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\" col-sm-3  col-sm-offset-1 col-md-3 col-md-offset-1 contactNameList\"],[\"flush-element\"],[\"text\",\"\\n     \\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"contactsFilteredVeterinarian\"]]],null,2],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n      \\n         \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\" col-sm-3  col-sm-offset-1 col-md-3 col-md-offset-1 contactNameList\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"contactsFilteredVolunteer\"]]],null,1],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n     \\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3  col-sm-offset-1 col-md-3 col-md-offset-1 contactNameList\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"contactsFilteredLaboratory\"]]],null,0],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n                    \\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"                            \\n                                \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\" nameListItem  laboratoryContact\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"getContact\",[\"get\",[\"contact\",\"id\"]]],[[\"on\"],[\"click\"]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"contact\",\"first_name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"contact\",\"last_name\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[\"contact\"]},{\"statements\":[[\"text\",\"                           \\n                                \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\" nameListItem  volunteersContact\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"getContact\",[\"get\",[\"contact\",\"id\"]]],[[\"on\"],[\"click\"]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"contact\",\"first_name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"contact\",\"last_name\"]],false],[\"close-element\"],[\"text\",\"\\n                           \\n\\n\"]],\"locals\":[\"contact\"]},{\"statements\":[[\"text\",\"                           \\n                                \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\" nameListItem  veterinariansContact\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"getContact\",[\"get\",[\"contact\",\"id\"]]],[[\"on\"],[\"click\"]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"contact\",\"first_name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"contact\",\"last_name\"]],false],[\"close-element\"],[\"text\",\"\\n                          \\n\\n\"]],\"locals\":[\"contact\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/search-contacts.hbs" } });
});
define("ahasweb/templates/search-patient", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "qvH3a0c7", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"search\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"search-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"filterPatient\"]],[\"flush-element\"],[\"text\",\"Search\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"model\",\"notesW\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"static-attr\",\"placeholder\",\"Search\"],[\"static-attr\",\"autofocus\",\"autofocus\"],[\"static-attr\",\"id\",\"search-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3  col-sm-offset-1 col-md-3 col-md-offset-1\"],[\"static-attr\",\"id\",\"patientHeading\"],[\"flush-element\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Patients\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nameList\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"ember-scrollable\"],null,[[\"autoHide\"],[false]],1],[\"text\",\"    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"                    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"nameListItem\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"getPatient\",[\"get\",[\"patient\",\"id\"]]]],[\"flush-element\"],[\"text\",\"\\n                            \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"patient\",\"first_name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"patient\",\"last_name\"]],false],[\"close-element\"],[\"text\",\"\\n                    \"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[\"patient\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"model\",\"patientFiltered\"]]],null,0]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/search-patient.hbs" } });
});
define("ahasweb/templates/test", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "A6HL6UAo", "block": "{\"statements\":[[\"comment\",\" Example of how to instantiate a medications-container \"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  Medicine\\n\"],[\"append\",[\"helper\",[\"medications-container\"],null,[[\"medType\",\"medicationList\"],[\"Medicine\",[\"get\",[\"medicine\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  Vaccines\\n\"],[\"append\",[\"helper\",[\"medications-container\"],null,[[\"medType\",\"medicationList\"],[\"Vaccine\",[\"get\",[\"vaccine\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  Other\\n\"],[\"append\",[\"helper\",[\"medications-container\"],null,[[\"medType\",\"medicationList\"],[\"Other\",[\"get\",[\"other\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"alertMedication\"]],[\"flush-element\"],[\"text\",\"Medications Alert\"],[\"close-element\"],[\"text\",\"\\n\"],[\"comment\",\" Here is showing that we have realtime access to all data in data stored at the root.\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"medicine\"]]],null,2],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"vaccine\"]]],null,1],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"other\"]]],null,0],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\nHere\\n  \"],[\"append\",[\"unknown\",[\"nullObject\",\"hello\"]],false],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"nullObject\",\"world\"]],false],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"nullObject\",\"thing\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"fixnull\"]],[\"flush-element\"],[\"text\",\" Filter nulls \"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"unknown\",[\"item\",\"name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"item\",\"reminder\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"item\",\"med_type\"]],false],[\"text\",\" \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"item\"]},{\"statements\":[[\"text\",\"  \"],[\"append\",[\"unknown\",[\"item\",\"name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"item\",\"reminder\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"item\",\"med_type\"]],false],[\"text\",\" \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"item\"]},{\"statements\":[[\"text\",\"  \"],[\"append\",[\"unknown\",[\"item\",\"name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"item\",\"reminder\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"item\",\"med_type\"]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"item\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/test.hbs" } });
});
define("ahasweb/templates/user", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "OlvUNzLv", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"    \\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"alert_placeholder\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"static-attr\",\"style\",\"display: block;\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"user\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"id\",\"reset\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"resetPassword\"]],[\"flush-element\"],[\"text\",\"Reset password\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"id\",\"delete\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteUser\"]],[\"flush-element\"],[\"text\",\"Delete\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/user.hbs" } });
});
define("ahasweb/templates/view-appointment", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "NiVh7IZ2", "block": "{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Appointment Info\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Start Date:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"start\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"End Date:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"end\"]],true],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Reason for Appointment:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"reason\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Notes:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"notes\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Location:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"location\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/view-appointment.hbs" } });
});
define("ahasweb/templates/view-calendar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "SSyydS35", "block": "{\"statements\":[[\"append\",[\"helper\",[\"full-calendar\"],null,[[\"events\",\"eventClick\"],[[\"get\",[\"model\",\"events\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"clicked\"],null]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/view-calendar.hbs" } });
});
define("ahasweb/templates/view-contact", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "e8WJkupT", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"id\",\"contactName\"],[\"flush-element\"],[\"text\",\"Contact information for: \"],[\"append\",[\"unknown\",[\"model\",\"first_name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"model\",\"last_name\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"contactPhoneNumber\"],[\"flush-element\"],[\"text\",\"Phone Number: \"],[\"append\",[\"unknown\",[\"model\",\"phone_number\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"contactEmail\"],[\"flush-element\"],[\"text\",\"Email: \"],[\"append\",[\"unknown\",[\"model\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"contactFaxNumber\"],[\"flush-element\"],[\"text\",\"Fax Number: \"],[\"append\",[\"unknown\",[\"model\",\"fax_number\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"contactAddress\"],[\"flush-element\"],[\"text\",\"Address: \"],[\"append\",[\"unknown\",[\"model\",\"address\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"id\",\"edit-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"gotoEditContact\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Edit Info\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/view-contact.hbs" } });
});
define("ahasweb/templates/view-medical-record-editable", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2NkOvx/Y", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row allMedGroup\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"medHeading\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-12 col-md-12\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\" Medical Record \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\" Created at: \"],[\"append\",[\"unknown\",[\"model\",\"date\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-7 col-md-7\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\" placeholder for pet info: \\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"rows\",\"10\"],[\"static-attr\",\"cols\",\"40\"],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Attitude \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 col-md-3\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"static-attr\",\"for\",\"attitudeBAR\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"attitudeBAR\"]]],null,92,91],[\"text\",\"         \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"static-attr\",\"for\",\"attitudeQAR\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"attitudeQAR\"]]],null,90,89],[\"text\",\"         \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3 labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"attitudeDepressed\"]]],null,88,87],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" Temp \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"temperatureText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"temperature\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Eyes \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio \"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"eyesN\"]]],null,86,85],[\"text\",\"         \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"eyesA\"]]],null,84,83],[\"text\",\"         \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"eyesOU\"]]],null,82,81],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n     \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"eyesOD\"]]],null,80,79],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"eyesOS\"]]],null,78,77],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"eyesText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"eyes\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Oral \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"oralN\"]]],null,76,75],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"oralA\"]]],null,74,73],[\"text\",\"          \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"oralText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"oral\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"MM \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mmN\"]]],null,72,71],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mmPale\"]]],null,70,69],[\"text\",\"          \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-6 col-md-6\"],[\"flush-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mmJaundiced\"]]],null,68,67],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mmTacky\"]]],null,66,65],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-2 \"],[\"flush-element\"],[\"text\",\"Ears \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsN\"]]],null,64,63],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsA\"]]],null,62,61],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-7 col-md-7 \"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsEarMites\"]]],null,60,59],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsAU\"]]],null,58,57],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsAD\"]]],null,56,55],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsAS\"]]],null,54,53],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"checkboxMed\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"earsText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"ears\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-2\"],[\"flush-element\"],[\"text\",\"Glands/Nodes \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"glandsN\"]]],null,52,51],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"glandsA\"]]],null,50,49],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"glandsText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"glands\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Skin \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"skinN\"]]],null,48,47],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"skinA\"]]],null,46,45],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"skinText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"skin\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Abdomen \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"abdomenN\"]]],null,44,43],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"abdomenA\"]]],null,42,41],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"abdomenText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"abdomen\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-2\"],[\"flush-element\"],[\"text\",\"Urogenital \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"urogenitalN\"]]],null,40,39],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"urogenitalA\"]]],null,38,37],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"urogentialText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"urogential\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Nervous System \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"nervousSystemN\"]]],null,36,35],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"nervousSystemA\"]]],null,34,33],[\"text\",\"         \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"nervousSystemText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"nervousSystem\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 col-md-2\"],[\"flush-element\"],[\"text\",\"Musculoskeletal \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"musculoskeletalN\"]]],null,32,31],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"musculoskeletalA\"]]],null,30,29],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"musculoskeletalText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"musculoskeletal\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 col-md-2\"],[\"flush-element\"],[\"text\",\"Cardiovascular \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"cardiovascularN\"]]],null,28,27],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"cardiovascularA\"]]],null,26,25],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"cardiovascularText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"cardiovascular\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-1\"],[\"flush-element\"],[\"text\",\" HR \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"hrText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"heart_rate\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 \"],[\"flush-element\"],[\"text\",\"Respiratory \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"respiratoryN\"]]],null,24,23],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"respiratoryA\"]]],null,22,21],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"respiratoryText1\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"respiratory\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-1\"],[\"flush-element\"],[\"text\",\" RR \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-1 \"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"respiratoryText2\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"respiratory_rate\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"BCS  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 bcsSelect\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"select\",[]],[\"static-attr\",\"id\",\"bcsvalue\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal1\"]]],null,20],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal2\"]]],null,19],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal3\"]]],null,18],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal4\"]]],null,17],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal5\"]]],null,16],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal6\"]]],null,15],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal7\"]]],null,14],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal8\"]]],null,13],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal9\"]]],null,12],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\"/9\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-7 col-md-7\"],[\"flush-element\"],[\"text\",\"MCS \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mcsN\"]]],null,11,10],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mcsMild\"]]],null,9,8],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mcsMod\"]]],null,7,6],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mcsMild\"]]],null,5,4],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\" Weight \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-2 \"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"weight\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"weight\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-5 col-md-4\"],[\"flush-element\"],[\"text\",\"Unit \\n    \"],[\"open-element\",\"select\",[]],[\"static-attr\",\"id\",\"unit\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"weightUnit\"]]],null,3,2],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"addButton\"],[\"static-attr\",\"id\",\"check-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"checkAll\"]],[\"flush-element\"],[\"text\",\"Check all\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"addButton\"],[\"static-attr\",\"id\",\"uncheck-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"uncheckAll\"]],[\"flush-element\"],[\"text\",\"Uncheck all\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"notes\"],[\"flush-element\"],[\"text\",\"Notes: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"id\",\"notes\"],[\"static-attr\",\"rows\",\"10\"],[\"static-attr\",\"cols\",\"70\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"exam_notes\"]],null],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  Medicine\\n\"],[\"append\",[\"helper\",[\"medications-container\"],null,[[\"medType\",\"medicationList\"],[\"Medicine\",[\"get\",[\"model\",\"medicine\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  Vaccines\\n\"],[\"append\",[\"helper\",[\"medications-container\"],null,[[\"medType\",\"medicationList\"],[\"Vaccine\",[\"get\",[\"model\",\"vaccine\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  Other\\n\"],[\"append\",[\"helper\",[\"medications-container\"],null,[[\"medType\",\"medicationList\"],[\"Other\",[\"get\",[\"model\",\"other\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3 col-sm-offset-1 col-md-offset-1\"],[\"flush-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"followUpNotes\"],[\"flush-element\"],[\"text\",\"Follow up notes: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"id\",\"followUpNotes\"],[\"static-attr\",\"rows\",\"5\"],[\"static-attr\",\"cols\",\"35\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"followUpNotes\"]],null],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"summary\"],[\"flush-element\"],[\"text\",\"Short summary: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"id\",\"summary\"],[\"static-attr\",\"rows\",\"5\"],[\"static-attr\",\"cols\",\"35\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"summary\"]],null],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\" Veterinarian Signature: \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"signature\"]],null],[\"static-attr\",\"alt\",\"Cannot display\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"editable\"]]],null,1,0],[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"alert_placeholder_med\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n  \\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"class\",\"medical-button\"],[\"static-attr\",\"id\",\"update-medical-button\"],[\"flush-element\"],[\"text\",\"Update medical record\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"medical-button\"],[\"static-attr\",\"id\",\"update-medical-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"updateMedicalRecord\",[\"get\",[\"model\",\"patient_id\"]]]],[\"flush-element\"],[\"text\",\"Update medical record\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"       \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"kg\"],[\"flush-element\"],[\"text\",\" kg\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"lbs\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" lbs\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"kg\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" kg\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"lbs\"],[\"flush-element\"],[\"text\",\" lbs\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsSevere\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Severe\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsSevere\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Severe\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsMod\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Mod\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"       \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsMod\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Mod\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsMild\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Mild \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"       \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsMild\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Mild \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"id\",\"mcsN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"       \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"id\",\"mcsN\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"respiratoryA\"],[\"static-attr\",\"name\",\"respiratory\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"respiratoryA\"],[\"static-attr\",\"name\",\"respiratory\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"respiratoryN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"respiratory\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"respiratoryN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"respiratory\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"cardiovascularA\"],[\"static-attr\",\"name\",\"cardiovascular\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"cardiovascularA\"],[\"static-attr\",\"name\",\"cardiovascular\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"cardiovascularN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"cardiovascular\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"cardiovascularN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"cardiovascular\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"musculoskeletalA\"],[\"static-attr\",\"name\",\"musculoskeletal\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"musculoskeletalA\"],[\"static-attr\",\"name\",\"musculoskeletal\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"musculoskeletalN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"musculoskeletal\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"musculoskeletalN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"musculoskeletal\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"nervousSystemA\"],[\"static-attr\",\"name\",\"nervous\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"nervousSystemA\"],[\"static-attr\",\"name\",\"nervous\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"nervousSystemN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"nervous\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"nervousSystemN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"nervous\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"urogenitalA\"],[\"static-attr\",\"name\",\"urogenital\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"urogenitalA\"],[\"static-attr\",\"name\",\"urogenital\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"urogenitalN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"urogenital\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"urogenitalN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"urogenital\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"abdomenA\"],[\"static-attr\",\"name\",\"abdomen\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"abdomenA\"],[\"static-attr\",\"name\",\"abdomen\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"abdomenN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"abdomen\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"abdomenN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"abdomen\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"skinA\"],[\"static-attr\",\"name\",\"skin\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"skinA\"],[\"static-attr\",\"name\",\"skin\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"skinN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"skin\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"skinN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"skin\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"glandsA\"],[\"static-attr\",\"name\",\"glands\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"glandsA\"],[\"static-attr\",\"name\",\"glands\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"glandsN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"glands\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"glandsN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"glands\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAS\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AS  \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAS\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AS \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAD\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AD  \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAD\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AD \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAU\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AU  \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAU\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AU \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsEarMites\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Ear Mites \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsEarMites\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Ear Mites   \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"earsA\"],[\"static-attr\",\"name\",\"ears\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"earsA\"],[\"static-attr\",\"name\",\"ears\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"earsN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"ears\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"earsN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"ears\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmTacky\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Tacky \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmTacky\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Tacky   \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmJaundiced\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  Jaundiced \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmJaundiced\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  Jaundiced  \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmPale\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Pale\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmPale\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Pale \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"id\",\"mmN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"id\",\"mmN\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"oralA\"],[\"static-attr\",\"name\",\"oral\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"oralA\"],[\"static-attr\",\"name\",\"oral\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"oralN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"oral\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"oralN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"oral\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOS\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OS\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOS\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OS\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOD\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OD\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOD\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OD\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOU\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OU\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOU\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OU\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"eyesA\"],[\"static-attr\",\"name\",\"eyes\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"eyesA\"],[\"static-attr\",\"name\",\"eyes\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"eyesN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"eyes\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"eyesN\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"eyes\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"attitudeDepressed\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Depressed \\n           \"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"attitudeDepressed\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Depressed\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"attitudeQAR\"],[\"static-attr\",\"name\",\"attitude\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" QAR \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"attitudeQAR\"],[\"static-attr\",\"name\",\"attitude\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" QAR \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"attitudeBAR\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"attitude\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" BAR \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"attitudeBAR\"],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"name\",\"attitude\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" BAR \\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/view-medical-record-editable.hbs" } });
});
define("ahasweb/templates/view-medical-record", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "VeStTjnw", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row allMedGroup\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"medHeading\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-12 col-md-12\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\" Medical Record \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\" Created at: \"],[\"append\",[\"unknown\",[\"model\",\"date\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-7 col-md-7\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\" placeholder for pet info: \\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"rows\",\"10\"],[\"static-attr\",\"cols\",\"40\"],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Attitude \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 col-md-3\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"static-attr\",\"for\",\"attitudeBAR\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"attitudeBAR\"]]],null,93,92],[\"text\",\"         \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"static-attr\",\"for\",\"attitudeQAR\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"attitudeQAR\"]]],null,91,90],[\"text\",\"         \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3 labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"attitudeDepressed\"]]],null,89,88],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" Temp \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"temperatureText\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"temperature\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Eyes \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio \"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"eyesN\"]]],null,87,86],[\"text\",\"         \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"eyesA\"]]],null,85,84],[\"text\",\"         \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"eyesOU\"]]],null,83,82],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n     \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"eyesOD\"]]],null,81,80],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"eyesOS\"]]],null,79,78],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"eyesText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"eyes\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Oral \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"oralN\"]]],null,77,76],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"oralA\"]]],null,75,74],[\"text\",\"          \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"oralText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"oral\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"MM \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mmN\"]]],null,73,72],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mmPale\"]]],null,71,70],[\"text\",\"          \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-6 col-md-6\"],[\"flush-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mmJaundiced\"]]],null,69,68],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mmTacky\"]]],null,67,66],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-2 \"],[\"flush-element\"],[\"text\",\"Ears \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsN\"]]],null,65,64],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsA\"]]],null,63,62],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-7 col-md-7 \"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsEarMites\"]]],null,61,60],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsAU\"]]],null,59,58],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsAD\"]]],null,57,56],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" checkboxMed labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"earsAS\"]]],null,55,54],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"checkboxMed\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"earsText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"ears\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-2\"],[\"flush-element\"],[\"text\",\"Glands/Nodes \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"glandsN\"]]],null,53,52],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"glandsA\"]]],null,51,50],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"glandsText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"glands\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Skin \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"skinN\"]]],null,49,48],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"skinA\"]]],null,47,46],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"skinText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"skin\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Abdomen \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"abdomenN\"]]],null,45,44],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"abdomenA\"]]],null,43,42],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"abdomenText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"abdomen\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-2\"],[\"flush-element\"],[\"text\",\"Urogenital \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"urogenitalN\"]]],null,41,40],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"urogenitalA\"]]],null,39,38],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"urogentialText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"urogential\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"Nervous System \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"nervousSystemN\"]]],null,37,36],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"nervousSystemA\"]]],null,35,34],[\"text\",\"         \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"nervousSystemText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"nervousSystem\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 col-md-2\"],[\"flush-element\"],[\"text\",\"Musculoskeletal \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"musculoskeletalN\"]]],null,33,32],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"musculoskeletalA\"]]],null,31,30],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"musculoskeletalText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"musculoskeletal\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 col-md-2\"],[\"flush-element\"],[\"text\",\"Cardiovascular \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"cardiovascularN\"]]],null,29,28],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"cardiovascularA\"]]],null,27,26],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"cardiovascularText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"cardiovascular\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-1\"],[\"flush-element\"],[\"text\",\" HR \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"hrText\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"heart_rate\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 \"],[\"flush-element\"],[\"text\",\"Respiratory \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"respiratoryN\"]]],null,25,24],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"radioButton labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"respiratoryA\"]]],null,23,22],[\"text\",\"        \"],[\"close-element\"],[\"text\",\" \\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"respiratoryText1\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"respiratory\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-1\"],[\"flush-element\"],[\"text\",\" RR \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-1 \"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"respiratoryText2\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"respiratory_rate\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\"BCS  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2 bcsSelect\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"select\",[]],[\"static-attr\",\"id\",\"bcsvalue\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal1\"]]],null,21],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal2\"]]],null,20],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal3\"]]],null,19],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal4\"]]],null,18],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal5\"]]],null,17],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal6\"]]],null,16],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal7\"]]],null,15],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal8\"]]],null,14],[\"block\",[\"if\"],[[\"get\",[\"model\",\"bcsVal9\"]]],null,13],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-1 col-md-1\"],[\"flush-element\"],[\"text\",\"/9\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-7 col-md-7\"],[\"flush-element\"],[\"text\",\"MCS \\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mcsN\"]]],null,12,11],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" labelForRadio\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mcsMild\"]]],null,10,9],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mcsMod\"]]],null,8,7],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\" labelForRadio\"],[\"flush-element\"],[\"text\",\" \\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"mcsMild\"]]],null,6,5],[\"text\",\"         \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-2 col-md-2\"],[\"flush-element\"],[\"text\",\" Weight \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-2 \"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"weight\"],[\"static-attr\",\"class\",\"medicalTextInput\"],[\"static-attr\",\"disabled\",\"\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"weight\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-5 col-md-4\"],[\"flush-element\"],[\"text\",\"Unit \\n    \"],[\"open-element\",\"select\",[]],[\"static-attr\",\"id\",\"unit\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"weightUnit\"]]],null,4,3],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"notes\"],[\"flush-element\"],[\"text\",\"Notes: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"id\",\"notes\"],[\"static-attr\",\"rows\",\"10\"],[\"static-attr\",\"cols\",\"70\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"exam_notes\"]],null],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"medications\"],[\"flush-element\"],[\"text\",\"Medications: \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"medications\"]]],null,2],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"vaccinces\"],[\"flush-element\"],[\"text\",\"Vaccines: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"vaccines\"]]],null,1],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"other\"],[\"flush-element\"],[\"text\",\"Other: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"others\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 col-md-3 col-sm-offset-1 col-md-offset-1\"],[\"flush-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"followUpNotes\"],[\"flush-element\"],[\"text\",\"Follow up notes: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"id\",\"followUpNotes\"],[\"static-attr\",\"rows\",\"5\"],[\"static-attr\",\"cols\",\"35\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"followUpNotes\"]],null],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"summary\"],[\"flush-element\"],[\"text\",\"Short summary: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"textarea\",[]],[\"static-attr\",\"id\",\"summary\"],[\"static-attr\",\"rows\",\"5\"],[\"static-attr\",\"cols\",\"35\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"model\",\"summary\"]],null],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\" Veterinarian Signature: \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"signature\"]],null],[\"static-attr\",\"alt\",\"Cannot display\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"alert_placeholder_med\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n  \\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"otherDiv\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"other\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"other\",\"name\"]],null],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"reminderOther\"],[\"static-attr\",\"class\",\"reminderOther\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"other\",\"reminderToDisplay\"]],null],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[\"other\"]},{\"statements\":[[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"vaccineDiv\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"vaccine\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"vaccine\",\"name\"]],null],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"reminderVaccine\"],[\"static-attr\",\"class\",\"reminderVaccine\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"vaccine\",\"reminderToDisplay\"]],null],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[\"vaccine\"]},{\"statements\":[[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"medicationDiv\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"medication\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"medication\",\"name\"]],null],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"reminderMedication\"],[\"static-attr\",\"class\",\"reminderMedication\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"medication\",\"reminderToDisplay\"]],null],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[\"medication\"]},{\"statements\":[[\"text\",\"       \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"kg\"],[\"flush-element\"],[\"text\",\" kg\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"lbs\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" lbs\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"kg\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" kg\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"lbs\"],[\"flush-element\"],[\"text\",\" lbs\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsSevere\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Severe\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsSevere\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Severe\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsMod\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Mod\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"       \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsMod\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Mod\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsMild\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Mild \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"       \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mcsMild\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"Mild \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"id\",\"mcsN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"       \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"class\",\"norm\"],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"id\",\"mcsN\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n         \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"1\"],[\"static-attr\",\"selected\",\"selected\"],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"2\"],[\"flush-element\"],[\"text\",\" 2\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"3\"],[\"flush-element\"],[\"text\",\" 3\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"4\"],[\"flush-element\"],[\"text\",\" 4\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"5\"],[\"flush-element\"],[\"text\",\" 5 (ideal)\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"6\"],[\"flush-element\"],[\"text\",\" 6\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"7\"],[\"flush-element\"],[\"text\",\" 7\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"8\"],[\"flush-element\"],[\"text\",\" 8\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"9\"],[\"flush-element\"],[\"text\",\" 9\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"respiratoryA\"],[\"static-attr\",\"name\",\"respiratory\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"respiratoryA\"],[\"static-attr\",\"name\",\"respiratory\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"respiratoryN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"respiratory\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"respiratoryN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"respiratory\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"cardiovascularA\"],[\"static-attr\",\"name\",\"cardiovascular\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"cardiovascularA\"],[\"static-attr\",\"name\",\"cardiovascular\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"cardiovascularN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"cardiovascular\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"cardiovascularN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"cardiovascular\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"musculoskeletalA\"],[\"static-attr\",\"name\",\"musculoskeletal\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"musculoskeletalA\"],[\"static-attr\",\"name\",\"musculoskeletal\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"musculoskeletalN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"musculoskeletal\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"musculoskeletalN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"musculoskeletal\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"nervousSystemA\"],[\"static-attr\",\"name\",\"nervous\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"nervousSystemA\"],[\"static-attr\",\"name\",\"nervous\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"nervousSystemN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"nervous\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"nervousSystemN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"nervous\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"urogenitalA\"],[\"static-attr\",\"name\",\"urogenital\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"urogenitalA\"],[\"static-attr\",\"name\",\"urogenital\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"urogenitalN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"urogenital\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"urogenitalN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"urogenital\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"abdomenA\"],[\"static-attr\",\"name\",\"abdomen\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"abdomenA\"],[\"static-attr\",\"name\",\"abdomen\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"abdomenN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"abdomen\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"abdomenN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"abdomen\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"skinA\"],[\"static-attr\",\"name\",\"skin\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"skinA\"],[\"static-attr\",\"name\",\"skin\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"skinN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"skin\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"skinN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"skin\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"glandsA\"],[\"static-attr\",\"name\",\"glands\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"glandsA\"],[\"static-attr\",\"name\",\"glands\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"glandsN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"glands\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"glandsN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"glands\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAS\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AS  \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAS\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AS \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAD\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AD  \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAD\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AD \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAU\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" AU  \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsAU\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  AU \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsEarMites\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Ear Mites \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"earsEarMites\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Ear Mites   \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"earsA\"],[\"static-attr\",\"name\",\"ears\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"earsA\"],[\"static-attr\",\"name\",\"ears\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"earsN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"ears\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"earsN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"ears\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmTacky\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Tacky \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmTacky\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" disabled Tacky   \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmJaundiced\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  Jaundiced \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmJaundiced\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  Jaundiced  \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmPale\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Pale\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"mmPale\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Pale \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"id\",\"mmN\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"id\",\"mmN\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"oralA\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"oral\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"oralA\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"oral\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"oralN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"oral\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"oralN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"oral\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"id\",\"eyesOS\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OS\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOS\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OS\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOD\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OD\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOD\"],[\"static-attr\",\"checked\",\"true\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OD\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOU\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OU\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"eyesOU\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" OU\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"eyesA\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"eyes\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"A\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"eyesA\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"eyes\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" A \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"eyesN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"eyes\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"N\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"eyesN\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"eyes\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" N \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"           \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"attitudeDepressed\"],[\"static-attr\",\"disabled\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Depressed \\n           \"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"attitudeDepressed\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" Depressed\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"attitudeQAR\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"attitude\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" QAR \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"attitudeQAR\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"attitude\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" QAR \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"         \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"attitudeBAR\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"attitude\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" BAR \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"static-attr\",\"id\",\"attitudeBAR\"],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"name\",\"attitude\"],[\"static-attr\",\"checked\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" BAR \\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/view-medical-record.hbs" } });
});
define("ahasweb/templates/view-patient", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DPNqdEMF", "block": "{\"statements\":[[\"text\",\"\\n\\t\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"first_name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"model\",\"lastName\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Client's Basic Information\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Client's Name:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"firstName\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"model\",\"lastName\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Client's Address:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"address\"]],true],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Client's Phone Number:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"phoneNumber\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Client's Email Address:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Client's Documentation\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"LICO:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"licos\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"AISH:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"aish\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"SA:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"socialAssistance\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Notes:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"notes\"]],true],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Alternative Contact\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Alternative Contact Name:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"alternativeContactFirstName\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"model\",\"alternativeContactLastName\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Alternative Contact Address:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"alternativeContactAddress\"]],true],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Alternative Contact Phone Number:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"alternativeContactPhoneNumber\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Alternative Contact Secondary Phone:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"alternativeContact2ndPhone\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Alternative Contact Email:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"alternativeContactEmail\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Patient Info\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Patient Name:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"first_name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"model\",\"last_name\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Patient Species:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"species\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Patient Gender:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"gender\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Patient Reproduction Status:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"status\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Patient Age:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"age\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Patient Colour:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"colour\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Patient Tatoo ID:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"tattoo\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Patient MicroChip ID:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"microchip\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"id\",\"edit-patient-button\"],[\"flush-element\"],[\"text\",\"Edit Info\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"append\",[\"helper\",[\"history-container\"],null,[[\"patientID\"],[[\"get\",[\"model\",\"id\"]]]]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/view-patient.hbs" } });
});
define("ahasweb/templates/view-side-note", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "q2BopVM2", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewGroup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Side Note Information\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Notes:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"body\"]],true],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewLabel\"],[\"flush-element\"],[\"text\",\"Signature:\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"viewInfo\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"initials\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ahasweb/templates/view-side-note.hbs" } });
});
define('ahasweb/tests/mirage/mirage/config.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/config.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/config.js should pass jshint.');
  });
});
define('ahasweb/tests/mirage/mirage/factories/user.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/factories/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/user.js should pass jshint.');
  });
});
define('ahasweb/tests/mirage/mirage/models/login.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/models/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/models/login.js should pass jshint.');
  });
});
define('ahasweb/tests/mirage/mirage/models/signup.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/models/signup.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/models/signup.js should pass jshint.');
  });
});
define('ahasweb/tests/mirage/mirage/models/user.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/models/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/models/user.js should pass jshint.');
  });
});
define('ahasweb/tests/mirage/mirage/scenarios/default.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/scenarios/default.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass jshint.');
  });
});
define('ahasweb/tests/mirage/mirage/serializers/application.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/serializers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/application.js should pass jshint.');
  });
});
define('ahasweb/transforms/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Transform.extend({
    deserialize: function deserialize(serialized) {
      return serialized;
    },

    serialize: function serialize(deserialized, options) {
      if (options.lowercase) {
        return deserialized.toLowerCase();
      }
    }
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ahasweb/config/environment', ['ember'], function(Ember) {
  var prefix = 'ahasweb';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ahasweb/app")["default"].create({"name":"ahasweb","version":"0.0.0+97a4ae2a"});
}

/* jshint ignore:end */
//# sourceMappingURL=ahasweb.map
