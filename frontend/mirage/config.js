export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

   this.urlPrefix = 'https://ahas.herokuapp.com';    // make this `http://localhost:8080`, for example, if your API is on a different server
   this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

   this.post('/user_token' , {"jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"});
   this.post('/signup', { success: true }, 201);

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
  // this.namespace = 'https://ahas.herokuapp.com/api';

  // this.get('/client', 'new-client');
  this.get('/client', () =>{
    return {
      success: true,
      clients: [{
        firstName: "Johny",
        lastName: "Bravo",
        id: "1"
      }]
    };
  });

  this.get('client/1', ()=>{
    return{
      success: true,
      client: {
        id: 1,
        firstName: "Johny",
        lastName: "Bravo",
        address: "123 Office dr Edmonton, AB A6S 1F3",
        phoneNumber: "780-555-1122",
        email: "jbravo@email.ca",
        licos: "123",
        aish: "234",
        socialAssistance: "345",
        pets: "boby",
        notes: "don't say anything about his hair",
        created_at: "017-03-09T02:50:38.757Z",
        updated_at: "017-03-09T02:50:38.757Z",
        alternativeContactFirstName: "Bob",
        alternativeContactLastName: "Mackenzie",
        alternativeContactEmail: "bmackenzie@email.com",
        alternativeContactPhoneNumber: "780-555-2211",
        alternativeContact2ndPhone: "780-555-3321",
        alternativeContactAddress: "4142 Office ave Edmonton, AB V2F 4A1",
        patients: [{"id":40,"first_name":"Dinkle","last_name":"Burg"}]
      }
    };
  });
  
}
