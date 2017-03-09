import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized;
  },

  serialize: function(deserialized, options) {
    if (options.lowercase){
    return deserialized.toLowerCase();
    }
  }
});
