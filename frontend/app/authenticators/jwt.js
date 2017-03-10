import Ember from 'ember';  
import Base from 'ember-simple-auth/authenticators/base';  
import config from '../config/environment';
const { RSVP: { Promise } } = Ember;
export default Base.extend({  
  ajax: Ember.inject.service(),
  tokenEndpoint: `${config.server}/api/user_token`,
  restore(data) {
    return new Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(creds) {
    const { username, password } = creds;

    return new Promise((resolve, reject) =>
    this.get('ajax').post(this.tokenEndpoint, {
        type: 'application/json',
        data: { auth: {
          email: username,
          password: password,
        }
    }
    }).then((response) => {
    const { jwt } = response;
    Ember.run(() => {
      resolve({
        token: jwt
      });
    });
    }, function() {
        showAlert("The username and password you entered do not match");
    }, (error) => {
      //not sure if we will ever need this or if it is the appropriate message for whatever this condition will be
        showAlert("There was an error logging in");
        Ember.run(() => {
          reject(error);
        });
    }));
  }, 
  invalidate(data) {
    return Promise.resolve(data);
  }
});

function showAlert(message) {

     Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
 
}