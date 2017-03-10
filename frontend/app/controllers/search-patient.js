import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        getContact(contact){
            console.log("we get here");
            this.transitionToRoute('/view-patient/');
        }
    }
});