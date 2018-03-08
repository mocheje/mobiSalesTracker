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

Meteor.publish( 'Driver', function(id){
  check(id, String);
  var data = Driver.find({_id: id});

  if ( data ) {
    return data;
  }

  return this.ready();
});
