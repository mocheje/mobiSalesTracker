/*
* Methods: Insert - API Key
* Creates the users API key.
*/

Meteor.methods({
  addOrder: function( userId, obj ) {
    check( userId, Match.OneOf( Meteor.userId(), String ) );
    check( obj, Object );
    // select last order based on createdAt field
    let nextNumber = '500001';  //default number range for orders
    const lastOrder = Order.find({}, {sort: {createdAt: -1}, limit: 1}).fetch();
    if(lastOrder){
      nextNumber = String(+lastOrder[0].number + 1); //increment last number by one
    }

    try {
       var order = Order.insert(  {
         "number": nextNumber,
         "customer_id": obj.customer_id,
         "order_items": obj.order_items,
         "asignedTo": obj.asignedTo,
         "plannedDeliveryDate": obj.plannedDeliveryDate,
         "createdAt": new Date(),
         "status": "Pending",

       });
       return order;
    } catch( exception ) {
      return exception;
    }
  }
});
