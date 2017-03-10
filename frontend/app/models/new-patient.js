import DS from 'ember-data';

export default DS.Model.extend({
	patientName: DS.attr('string'),
	patientSpecies: DS.attr('string'),
	patientGender: DS.attr('string'),
	patientStatus: DS.attr('string'),
	patientAge: DS.attr('string'),
	patientColor: DS.attr('string'),
	patientTatoo: DS.attr('string'),
	patientMicrochip: DS.attr('string')

});
