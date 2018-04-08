/*
* Publications: Example
* Data publications for the Example collection.
*/

Meteor.publish( 'item', function(id){
  check(id, String);
  var data = Item.find({_id: id});

  if ( data ) {
    return data;
  }

  return this.ready();
});

Meteor.publish( 'items', function(){
  var data = Item.find();

  if ( data ) {
    return data;
  }

  return this.ready();
});
