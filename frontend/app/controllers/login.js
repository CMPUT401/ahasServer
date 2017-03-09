import Ember from 'ember';

export default Ember.Controller.extend({  
  session: Ember.inject.service(),

  actions: {
    authenticate: function() {
      var credentials = this.getProperties('username', 'password');
      const { username, password } = credentials;
      var inputFilled = checkFields(username, password);
      if (inputFilled === false ){
        showAlert('Please fill in all fields');
      }
      else if (this.get('session.isAuthenticated')){
       showAlert('You are already logged in!');
        }
      else if(inputFilled){
        var authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, 
        credentials).catch((reason)=>{
        this.set('errorMessage', reason.error || reason);
      });     
    }
  }
}
});

//make sure that we dont post undefined to server
function checkFields(username, password){
  if(username === undefined || password === undefined){
    return false;
  }
  return true;
}
function showAlert(message) {
        
      Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        
 }