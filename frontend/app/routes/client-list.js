import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin ,{
	ajax: Ember.inject.service(),
	model(){
		var self = this;

		let ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/client'
			).then(function(data){
				Ember.run(function() {
					resolve({ 
						clients: deserialAttributes(data.clients),

					});

				});
				
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
					self.transitionTo('/unauthorized');
            	}
            }));

		return ajaxGet;
	}
});

function deserialAttributes(clients){
	var deserial = [];
	for(var i = 0; i < clients.length; i++) {
		var client = clients[i];
		client.id = JSON.stringify(clients[i].id);
		client.firstName = JSON.stringify(clients[i].firstName).replace(/\"/g, "");
		client.lastName = JSON.stringify(clients[i].lastName).replace(/\"/g, "");
		deserial.push(client);

	}
	return(deserial);
}
