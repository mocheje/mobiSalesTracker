/*
* Generate Seed Data
* Creates a collection of test data automatically on startup.
*/

generateTestData = function(){
  // Create test data for application.
  const foundItem = Item.findOne(),
        foundOrder = Order.findOne(),
        foundCustomer = Customer.findOne();

  if(!foundItem){
    //create seed driver
    Items.forEach(x => {
      const item = Item.insert(x);
    })
  }
  if(!foundOrder){
    //create seed driver
    Orders.forEach(x => {
      const order = Order.insert(x);
    })
  }
  if(!foundCustomer){
    //create seed driver
    Customers.forEach(x => {
      const customer = Customer.insert(x);
    })
  }
};
