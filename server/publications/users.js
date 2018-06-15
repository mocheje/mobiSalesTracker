/*
* Publications: Example
* Data publications for the Example collection.
*/
Meteor.publish( 'users', function(){
  const data = Meteor.users.find({},{
    fields: {
      "emails": true,
      "profile.name": true
    }
  });

  if ( data ) {
    return data;
  }

  return this.ready();
});
