import Ember from 'ember';

export default Ember.Controller.extend({
     
     ajax: Ember.inject.service(),
     actions:{
     createUser: function() { 

        //reset status displayed on every button press
        var name= document.getElementById('name').value;
        var email= document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var passwordConfirm = document.getElementById('passwordConfirm').value;
        
        if (checkFormat(password, email, passwordConfirm, name) === true ){
         
        var user = this.get('ajax').post('/api/signup', {
        type: 'application/json',
        data: { user: {
          name: name, 
          email: email,
          password: password,
          password_confirmation: passwordConfirm
        }
    }
    });

        user.then(function(response){
            if(response.success){
                showAlert("Account created!", true);
            }
        //this is error from server condition
        }, function(response) {
            console.log(response.errors[0]);
            showAlert(response.errors[0].title, false);
        
        });
      }
    }
},

});

/* 
 * checks the format of the email and password provided on the createUser form
 */
function checkFormat(password, email, passwordConfirm, name) {

        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (name === undefined || name === ""){
            showAlert("Name cannot be blank", false);
            return false;
        }

        else if ( re.test(email) !== true ) {
            showAlert("Incorrect email format", false);
            return false;
        }
       
        else if (password.length < 7){
            showAlert("Password too short, must be at least 7 characters!", false);
            return false;
        }   
        else if (password !== passwordConfirm){
            showAlert("Password and password confirmation do not match", false);
            return false;
        }

        

        return true;
    }

 function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }

