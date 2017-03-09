import Ember from 'ember';

export default Ember.Controller.extend({
	/*ajax: Ember.inject.service(),
	model() {
		console.log("do we even get here");
		var self = this;
		let ajaxGet=this.get('ajax').get('/api/patients/1'
			).then(function(data){
				console.log("status is " + JSON.stringify(data));
			},
			function(data){
				console.log("status is " + JSON.stringify(data));
			});
		return [ajaxGet];
	},
	*/
	clientLastName: 'Bobbertson',
	clientFirstName: 'Fred',
	clientAddress: '22554 48th Ave NW Edmonton Alberta, Canada',
	clientPhoneNumber: '666-666-6666',
	clientEmail: '123dd@5d5dd.ca',

	clientDocumentLICO: 'Confirmed',
	clientDocumentAISH: 'Confirmed',
	clientDocumentSA: 'Confirmed',
	clientNotes: 'Smells bad?',

	clientAlternativeCName: 'Jack',
	clientAlternativeCAddress: '12252 92nd Ave Edmonton, Alberta, Canada',
	clientAlternativeCPhone: '123-456-7890',
	clientAlternativeCSPhone: '999-999-9999',
	clientAlternativeCEmail: 'efijo@foji.cdoji',

});