import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['client-list-filter'],
	value: '',

	init() {
		this._super(...arguments);
		this.get('filter')('').then((results) => this.set('results', results));
	},

	actions: {
		handleClientFilterEntry() {
			let filterInputValue = this.get('value');
			let filterAction = this.get('filter');
			filterAction(filterInputValue).then((filterResults) => this.set('results', filterResults));
		}
	}
});
