Template.userCreate.events({
  'click #saveUser': function(event){
    event.preventDefault();
    let details = {
      name:  $('[name="name"]').val(),
      email:  $('[name="email"]').val(),
      password:  $('[name="password"]').val(),
      password_repeat:  $('[name="password_repeat"]').val(),
      Role:  $('[name="role"]').val(),
    };
    console.log(details);
    // check if password and password repeat matches
    if(details.password === details.password_repeat){
      let userId = Meteor.userId();

      Meteor.call( "addUser", userId, details, function( error, response ) {
        if ( error ) {
          Bert.alert( error.reason, "danger" );
        } else {
          Bert.alert( "Admin User Successfully Created", "success" );
          // close modal
          Modal.hide('userCreate')
        }
      });
    } else {
      Bert.alert( 'passwords does not match', "danger" );
    }


  }
});

Template.driverCreate.helpers({

});
