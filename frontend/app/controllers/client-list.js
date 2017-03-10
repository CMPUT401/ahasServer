import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		filterClient: function(){
			var input = document.getElementById('search-bar').value.trim();
			if(input === "" || input === undefined){
				this.set('model.clientsFiltered', this.get(model.clients));
			}
			else {
				filter(input, this.get('model'), this);
			}
		},
		viewClient: function(clientID){
            console.log(clientID);
            this.transitionToRoute("/client-info/" + clientID);
        },
        newClient: function(){
        	this.transitionToRoute("/new-client/");
        }

	}
});

function filter(input, model, self){
	var results = [];
	for(var i = 0; i < model.clients.length; i++){
		if(input === model.clients[i].firstName || input === model.clients[i].lastName){
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
