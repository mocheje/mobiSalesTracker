/*
*  Controller: Index
*  Template: /client/views/index.html
*/

/*
* Created
*/

Template.itemIndex.onCreated(function(){
  // Code to run when template is created goes here.
  this.subscribe( "items" );
});

/*
* Rendered
*/

Template.itemIndex.onRendered(function() {
  // Code to run when template is rendered goes here.
});

/*
* Helpers
*/

Template.itemIndex.helpers({
  items: function(){
    return Item.find();
  }
});

/*
* Events
*/

Template.itemIndex.events({
  'click #newItem': function(event){
    event.preventDefault();
    Modal.show('itemCreate');
  }
});
