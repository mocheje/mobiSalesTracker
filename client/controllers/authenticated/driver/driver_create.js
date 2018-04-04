Template.driverCreate.events({
  'click #saveDriver': function(event){
    event.preventDefault();
    let details = {
      StaffName:  $('[name="name"]').val(),
      StaffEmail:  $('[name="email"]').val(),
      device:  $('[name="device"]').val(),
      Designation:  $('[name="designation"]').val(),
      Role:  $('[name="role"]').val(),
      Area:  $('[name="area"]').val(),
      LGA:  $('[name="lga"]').val(),
      Status:  $('[name="status"]').val()
    };
    console.log(details);

    let userId = Meteor.userId();

    Meteor.call( "addDriver", userId, details, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Driver Successfully Created", "success" );
        // close modal
        Modal.hide('driverCreate')
      }
    });

  }
});

Template.driverCreate.helpers({

});
