import Ember from 'ember';
 
export default Ember.Controller.extend({
    actions: {
        clicked(event, jsEvent, view){
            this.showModal(event);
        },

        viewAgenda(){
        	Ember.$('.full-calendar').full-calendar('next');
        }
    }
});