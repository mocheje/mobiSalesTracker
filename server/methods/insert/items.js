/*
* Methods: Insert - API Key
* Creates the users API key.
*/

Meteor.methods({
  addItem: function( userId, obj ) {
    check( userId, Match.OneOf( Meteor.userId(), String ) );
    check( obj, Object );

    try {
       var item = Item.insert(  {
         "code": obj.code,
         "description": obj.description,
         "CurrentStockCount": obj.CurrentStockCount,
         "UOM": obj.UOM,
         "ReservedStockCount": 0,
         "basePrice": obj.basePrice,
       });
       return item;
    } catch( exception ) {
      return exception;
    }
  }
});
