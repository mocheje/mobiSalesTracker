/*
* Publications: Example
* Data publications for the Example collection.
*/

Meteor.publish( 'order', function(id){
  check(id, String);
  var data = Order.find({_id: id});

  if ( data ) {
    return data;
  }

  return this.ready();
});

Meteor.publish( 'orders', function(){
  var data = Order.find();

  if ( data ) {
    return data;
  }

  return this.ready();
});
