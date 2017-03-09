import DS from 'ember-data';

export default DS.Model.extend({
	clientName: DS.attr('string'),
	clientAddress: DS.attr('string'),
	clientPhone: DS.attr('string'),
	clientEmail: DS.attr('string'),
	clientID: DS.attr('string')

	// TODO
	//add other info
});
