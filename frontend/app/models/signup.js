import DS from 'ember-data';

export default DS.Model.extend({

    email: DS.attr('string', {
        lowercase: true
    }),
    password: DS.attr('string')

});
