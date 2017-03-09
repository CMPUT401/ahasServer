import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		viewClient: function(clientID){
            console.log(clientID);
            this.transitionToRoute("/client-info/" + clientID);
        }

	}
});
