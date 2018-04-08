/*
* Methods: Insert - API Key
* Creates the users API key.
*/

Meteor.methods({
  addCustomer: function( userId, obj ) {
    check( userId, Match.OneOf( Meteor.userId(), String ) );
    check( obj, Object );

    try {
       var customer = Customer.insert(  {
         "name": obj.name,
         "address": obj.address,
         "lat": obj.lat,
         "lon": obj.long,
         "Status": obj.status
       });
       return customer;
    } catch( exception ) {
      return exception;
    }
  }
});
