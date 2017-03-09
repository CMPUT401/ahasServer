import DS from 'ember-data';

export default DS.Model.extend({
	patientID: DS.attr('string'),
	patientSpecies: DS.attr('string'),
	patientName: DS.attr('string'),
	patientAge: DS.attr('string'),
	patientColor: DS.attr('string'),
	patientTatoo: DS.attr('string'),
	patientMicrochip: DS.attr('string'),
	patientStatus: DS.attr('string'),
	patientCreatedDate: DS.attr('string'),
	patientEditDate:DS.attr('string'),
	patientClientID: DS.attr('string'),
	patientGender: DS.attr('string')
});
