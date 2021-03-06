Location = new Meteor.Collection( 'locations' );

/*
* Allow
*/

Location.allow({
  insert: function(){
    // Disallow user inserts on the client by default.
    return false;
  },
  update: function(){
    // Disallow user updates on the client by default.
    return false;
  },
  remove: function(){
    // Disallow user removes on the client by default.
    return false;
  }
});

/*
* Deny
*/

Location.deny({
  insert: function(){
    // Deny user inserts on the client by default.
    return true;
  },
  update: function(){
    // Deny user updates on the client by default.
    return true;
  },
  remove: function(){
    // Deny user removes on the client by default.
    return true;
  }
});
