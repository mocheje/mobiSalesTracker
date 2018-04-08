Template.orderCreate.onCreated(function(){
  // Code to run when template is created goes here.
  this.subscribe( "drivers" );
});

Template.orderCreate.onRendered(function(){
  // Code to run when template is created goes here.
  this.$('.datetimepicker').datetimepicker();
});

Template.orderCreate.events({
  'click #saveOrder': function(event){
    event.preventDefault();
    let details = {
      customer_id:  $('#customer').val(),
      order_items:  [{
        _id: $('[name="item"]').val(),
        quantity: +$('[name="quantity"]').val()
      }],
      asignedTo:  $('[name="asignedTo"]').val(),
      plannedDeliveryDate:  new Date($('[name="plannedDeliveryDate"]').val()),
    };
    console.log(details);
    let userId = Meteor.userId();

    Meteor.call( "addOrder", userId, details, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Order Successfully Created", "success" );
        // close modal
        Modal.hide('orderCreate')
      }
    });

  }
});

Template.orderCreate.helpers({
  customers: function () {
    return Customer.find();
  },
  drivers: function(){
    return Driver.find();
  },
  items: function(){
    return Item.find();
  }

});
