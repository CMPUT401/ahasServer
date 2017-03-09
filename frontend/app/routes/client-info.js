import Ember from 'ember';

export default Ember.Route.extend({
	// TODO: load from /api/client/{id}
	ajax: Ember.inject.service(),
	model(param) {
		var self = this;
		// console.log("param is " + param.clientID);
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/client/' + param.clientID
			).then(function(data){
				console.log("data is " + JSON.stringify(data));
				Ember.run(function() {
				if(JSON.stringify(data.client.alternativeContact2ndPhone != null)){
					resolve({
						firstName: JSON.stringify(data.client.firstName).replace(/\"/g, ""),
						lastName: JSON.stringify(data.client.lastName).replace(/\"/g, ""),
						phoneNumber: JSON.stringify(data.client.phoneNumber).replace(/\"/g, ""),
						email: JSON.stringify(data.client.email).replace(/\"/g, ""),
						address: JSON.stringify(data.client.address).replace(/\\n/g, " <br> " ).replace(/\"/g, ""),

						licos: JSON.stringify(data.client.licos).replace(/\"/g, ""),
						aish: JSON.stringify(data.client.aish).replace(/\"/g, ""),
						socialAssistance: JSON.stringify(data.client.socialAssistance).replace(/\"/g, ""),
						pets: JSON.stringify(data.client.pets).replace(/\"/g, ""),
						
						created_at: JSON.stringify(data.client.created_at).replace(/\"/g, "").slice(0, 10),
						updated_at: JSON.stringify(data.client.updated_at).replace(/\"/g, "").slice(0, 10),
						notes: JSON.stringify(data.client.notes).replace(/\"/g, "").replace(/\\n/g, ' <br> ' ),

						alternativeContactFirstName: JSON.stringify(
							data.client.alternativeContactFirstName).replace(/\"/g, ""),
						alternativeContactLastName: JSON.stringify(
							data.client.alternativeContactLastName).replace(/\"/g, ""),
						alternativeContactPhoneNumber: JSON.stringify(
							data.client.alternativeContactPhoneNumber).replace(/\"/g, ""),
						alternativeContact2ndPhone: JSON.stringify(
							data.client.alternativeContact2ndPhone).replace(/\"/g, ""),
						alternativeContactAddress: JSON.stringify(
							data.client.alternativeContactAddress).replace(/\\n/g, " <br> " ).replace(/\"/g, ""),
						alternativeContactEmail: JSON.stringify(
								data.client.alternativeContactEmail).replace(/\"/g, ""),

						clientID: JSON.stringify(data.client.id).replace(/\"/g, "")
					});
				}else{
		   			resolve({ 
						firstName: JSON.stringify(data.client.firstName).replace(/\"/g, ""),
						lastName: JSON.stringify(data.client.lastName).replace(/\"/g, ""),
						phoneNumber: JSON.stringify(data.client.phoneNumber).replace(/\"/g, ""),
						email: JSON.stringify(data.client.email).replace(/\"/g, ""),
						address: JSON.stringify(data.client.address).replace(/\\n/g, " <br> " ).replace(/\"/g, ""),

						licos: JSON.stringify(data.client.licos).replace(/\"/g, ""),
						aish: JSON.stringify(data.client.aish).replace(/\"/g, ""),
						socialAssistance: JSON.stringify(data.client.socialAssistance).replace(/\"/g, ""),
						pets: JSON.stringify(data.client.pets).replace(/\"/g, ""),
						
						created_at: JSON.stringify(data.client.created_at).replace(/\"/g, "").slice(0, 10),
						updated_at: JSON.stringify(data.client.updated_at).replace(/\"/g, "").slice(0, 10),
						notes: JSON.stringify(data.client.notes).replace(/\"/g, "").replace(/\\n/g, ' <br> ' ),

						alternativeContactFirstName: JSON.stringify(
							data.client.alternativeContactFirstName).replace(/\"/g, ""),
						alternativeContactLastName: JSON.stringify(
							data.client.alternativeContactLastName).replace(/\"/g, ""),
						alternativeContactPhoneNumber: JSON.stringify(
							data.client.alternativeContactPhoneNumber).replace(/\"/g, ""),
						alternativeContactAddress: JSON.stringify(
							data.client.alternativeContactAddress).replace(/\\n/g, " <br> " ).replace(/\"/g, ""),
						alternativeContactEmail: JSON.stringify(
								data.client.alternativeContactEmail).replace(/\"/g, "")
					});
				}
			  });
			
			},
			function(data){
				if (data === false){
					self.transitionTo('/unauthorized');
					console.log("status is " + JSON.stringify(data));
				}
		}));
		return ajaxGet;
	},
});
// function deserialAttributes(client){
// 	firstName: JSON.stringify(client.firstName).replace(/\"/g, "");
// 	lastName: JSON.stringify(client.lastName).replace(/\"/g, "");
// 	phoneNumber: JSON.stringify(client.phoneNumber).replace(/\"/g, "");
// 	email: JSON.stringify(client.email).replace(/\"/g, "");
// 	address: JSON.stringify(client.address).replace(/\"/g, "");
// }
