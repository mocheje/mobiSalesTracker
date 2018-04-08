/*
*  Controller: Index
*  Template: /client/views/index.html
*/

/*
* Created
*/

Template.orderIndex.onCreated(function(){
  // Code to run when template is created goes here.
  this.subscribe( "Orders" );
});

/*
* Rendered
*/

Template.orderIndex.onRendered(function() {
  // Code to run when template is rendered goes here.
});

/*
* Helpers
*/

Template.orderIndex.helpers({
  orders: function(){
    return Order.find();
  }
});

/*
* Events
*/

Template.orderIndex.events({
  'click #newOrder': function(event){
    event.preventDefault();
    Modal.show('orderCreate');
  }
});
