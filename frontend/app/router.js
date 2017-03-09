import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
  
});

Router.map(function() {
  this.route('login');
  this.route('new-patient', {path: '/new-patient/:clientID'});
  this.route('create-user');
  this.route('new-client');
  this.route('view-patient');
  this.route('search-patient');
  this.route('new-side-note');
  this.route('view-side-note');
  this.route('client-list');
  this.route('client-info', {path: '/client-info/:clientID'});
  this.route('unauthorized');
});

export default Router;

