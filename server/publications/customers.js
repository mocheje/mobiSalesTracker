/*
* Publications: Example
* Data publications for the Example collection.
*/

Meteor.publish( 'customer', function(id){
  check(id, String);
  var data = Customer.find({_id: id});

  if ( data ) {
    return data;
  }

  return this.ready();
});

Meteor.publish( 'customers', function(){
  var data = Customer.find();

  if ( data ) {
    return data;
  }

  return this.ready();
});
