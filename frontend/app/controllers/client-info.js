import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		newPatient: function(clientID){
			console.log(clientID);
			this.transitionToRoute("/new-patient/" + clientID);
		},
		viewPatient: function(petId){
			console.log(petId);
			this.transitionToRoute("/view-patient/" + petId);
		}
	}
});
