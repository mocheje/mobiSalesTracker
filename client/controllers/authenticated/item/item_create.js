Template.itemCreate.events({
  'click #saveItem': function(event){
    event.preventDefault();
    let details = {
      code:  $('[name="code"]').val(),
      description:  $('[name="description"]').val(),
      CurrentStockCount:  $('[name="CurrentStockCount"]').val(),
      UOM:  $('[name="UOM"]').val(),
      basePrice:  $('[name="basePrice"]').val()
    };
    console.log(details);

    let userId = Meteor.userId();

    Meteor.call( "addItem", userId, details, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Item Successfully Created", "success" );
        // close modal
        Modal.hide('itemCreate')
      }
    });

  }
});

Template.itemCreate.helpers({

});
