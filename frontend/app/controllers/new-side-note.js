import Ember from 'ember';

export default Ember.Controller.extend({
	/*
	currently commented out because backend isn't implemented
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	actions: 
	{
		submitNewNote()
		{
			var self = this;
				let ajaxPost = this.get('ajax').request('/api/patients',
			{
				method: 'POST',
				type: 'application/json',
				data: { patient:
					{
					client: "1",
					species: 	this.get('patientSpecies'),
					name: 		this.get('patientName'),
					age: 		this.get('patientAge'),
					colour: 	this.get('patientColor'),
					tattoo: 	this.get('patientTatoo'),
					microchip: 	this.get('patientMicrochip'),
					gender: 	this.get('patientGender'),
					reproductive_status: 	this.get('patientStatus')
				
				}
			
			}, 
		
			});
			ajaxPost.then(function(data){
				console.log("status is " + JSON.stringify(data));
			},
			function(data){
				if (data === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
							}
					self.transitionToRoute('/unauthorized');
				}
			});
		return ajaxPost;
	}
}
	*/
});