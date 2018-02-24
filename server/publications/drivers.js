/*
* Publications: Example
* Data publications for the Example collection.
*/

Meteor.publish( 'Drivers', function(){
  var data = Driver.find();

  if ( data ) {
    return data;
  }

  return this.ready();
});
