/*
*  Controller: Index
*  Template: /client/views/index.html
*/

/*
* Created
*/

Template.index.onCreated(function(){
  // Code to run when template is created goes here.
  this.subscribe( "Drivers" );
});

/*
* Rendered
*/

Template.index.onRendered(function() {
  // Code to run when template is rendered goes here.
});

/*
* Helpers
*/

Template.index.helpers({
  drivers: function(){
    return Driver.find();
  }
});

/*
* Events
*/

Template.index.events({
  'click .employee': function(){

  },
  'click #newDriver': function(event){
    event.preventDefault();
    Modal.show('driverCreate');
  }
});
