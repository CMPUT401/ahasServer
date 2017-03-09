import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import { isUnauthorizedError } from 'ember-ajax/errors';


export default AjaxService.extend({

	host: 'https://ahas.herokuapp.com',

	session: Ember.inject.service(),
  	headers: Ember.computed('session.data.authenticated.token', {
    get() {
	  let headers = {};
	  const token = this.get('session.data.authenticated.token');
      if (this.get('session.isAuthenticated') && token) {
		headers['Authorization'] =  token ; 
      }
	  return(headers);
    }
  }),
	handleResponse() {
    const result = this._super(...arguments);
    if ( isUnauthorizedError(result) ){
			return(false);
    } else {
      return result;
    }
	}
});

