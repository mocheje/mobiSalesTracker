/*
* Publications: Example
* Data publications for the Example collection.
*/

Meteor.publish( 'Locations', function(){
  var data = Location.find();

  if ( data ) {
    return data;
  }

  return this.ready();
});
