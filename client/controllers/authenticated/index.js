/*
*  Controller: Index
*  Template: /client/views/index.html
*/

/*
* Created
*/

Template.index.onCreated(function(){
  // Code to run when template is created goes here.
  this.subscribe( "orders" );
  this.subscribe( "customers" );
  this.subscribe( "items" );
});

/*
* Rendered
*/

Template.index.onRendered(function() {
  // Code to run when template is rendered goes here.
});

/*
* Helpers
*/

Template.index.helpers({
  orders: function(){
    return Order.find();
  },
  customerName: function(id){
    const customer = Customer.findOne({_id: id})
    if(customer){
      return customer.name;
    }

  },
  className: function(status){
    console.log(status);
    switch (status) {
      case "Pending":
        return 'warning';
      case "Delivered":
        return 'success';
      default:
        return 'danger';
    }

  },
  indexCount: function(count){
    return count + 1;

  },
  ItemCode: function(items){
    const id = items[0]._id;
    const item = Item.findOne({_id: id});
    if (id && item) return `${item.code} - ${item.description}`;
  },
  getQuantity: function(items){
    return items[0].quantity;

  },
  getTotal: function(items){
    const id = items[0]._id;
    const quantity = items[0].quantity;
    const item = Item.findOne({_id: id});
    if (quantity && item) return +quantity * +item.basePrice;

  },
  formatDate: function(date){
    return moment(date).format("MMM Do YY");
  }
});

/*
* Events
*/

Template.index.events({
  'click #newOrder': function(event){
    event.preventDefault();
    Modal.show('orderCreate');
  }
});
