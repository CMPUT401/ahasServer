import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        var contact = {id: "1"};
        return [contact];
    }
});
