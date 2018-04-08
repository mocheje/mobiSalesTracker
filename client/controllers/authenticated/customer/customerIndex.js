/*
*  Controller: Index
*  Template: /client/views/index.html
*/

/*
* Created
*/

Template.customerIndex.onCreated(function(){
  // Code to run when template is created goes here.
  this.subscribe( "customers" );
});

/*
* Rendered
*/

Template.customerIndex.onRendered(function() {
  // Code to run when template is rendered goes here.
});

/*
* Helpers
*/

Template.customerIndex.helpers({
  customers: function(){
    return Customer.find();
  }
});

/*
* Events
*/

Template.customerIndex.events({
  'click #newCustomer': function(event){
    event.preventDefault();
    Modal.show('customerCreate');
  }
});
