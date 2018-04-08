Template.customerCreate.onCreated(function(){

});

Template.customerCreate.events({
  'click #saveCustomer': function(event){
    event.preventDefault();
    let details = {
      name:  $('[name="name"]').val(),
      address:  $('[name="address"]').val(),
      lat:  $('[name="lat"]').val(),
      lon:  $('[name="lon"]').val(),
      status:  $('[name="status"]').val()
    };
    console.log(details);

    let userId = Meteor.userId();

    Meteor.call( "addCustomer", userId, details, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Customer Successfully Created", "success" );
        // close modal
        Modal.hide('customerCreate')
      }
    });

  },
  'blur [name="address"]': function(event){
    //render loading template
    var view = Blaze.render(Template.loading, document.getElementById('loading'));
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'address': $(event.target).val()}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
        if(status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          $('[name="lat"]').val(latitude);
          $('[name="lon"]').val(longitude);
          Blaze.remove(view);
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
});

Template.driverCreate.helpers({

});
