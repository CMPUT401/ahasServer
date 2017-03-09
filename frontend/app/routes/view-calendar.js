import Ember from 'ember';
 
export default Ember.Route.extend({
    model: function() {
        return {
        	defaultView: 'agendaWeek',
            events: Ember.A([{
                title: 'Partayyyy',
                start: '2017-03-06T10:10:10',
                end: '2017-03-06T11:11:11'},
                {
                title: 'Dance',
                start: '2017-03-03T10:10:10',
                end: '2017-03-03T11:11:11'

            }])
  	};
    }
});