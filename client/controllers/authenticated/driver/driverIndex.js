/*
*  Controller: Index
*  Template: /client/views/index.html
*/

/*
* Created
*/

Template.driverIndex.onCreated(function(){
  // Code to run when template is created goes here.
  this.subscribe( "Drivers" );
});

/*
* Rendered
*/

Template.driverIndex.onRendered(function() {
  // Code to run when template is rendered goes here.
});

/*
* Helpers
*/

Template.driverIndex.helpers({
  drivers: function(){
    return Driver.find();
  }
});

/*
* Events
*/

Template.driverIndex.events({
  'click #driver': function(event){
    event.preventDefault();
    Router.go('drivers');
  },
  'click #newDriver': function(event){
    event.preventDefault();
    Modal.show('driverCreate');
  },
});
