import Ember from 'ember';


export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	//let cName, let cAddress, let cPhone,
	actions: {
		submitNewCient(){
			var self = this;
			//let cName = this.get('clientName');
			//TODO check inputs
			let ajaxPost = this.get('ajax').post('/api/client' , {
				type: 'application/json',
				data: {client: {
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
					clientId: this.get('clientID'),
					alternativeContactFirstName: this.get('alternativeFirstName'),
					alternativeContactLastName: this.get('alternativeLastName'),
					alternativeContactPhoneNumber: this.get('alternativePrimaryPhone'),
					alternativeContactAddress: this.get('alternativeAddress'),
					notes: this.get('clientNotes'),
					alternativeContact2ndPhone: this.get('alternativeSecondaryPhone'),
					alternativeContactEmail: this.get('alternativeEmail')
				}}, 
			}).then(function(data){
					//console.log("name is " + cName);
					// TODO display confrimation page
					// TODO prevent user from going back into this page
					console.log("status is " + JSON.stringify(data));
					self.transitionToRoute('afterlogin');
				},
				function(data){
					console.log("status is " + JSON.stringify(data));
					if (data === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
							}
						self.transitionToRoute('/unauthorized');
					}
				});
			//createNewCLient();
			//this.transitionToRoute('/login');
			return ajaxPost;
		}
	}
});
