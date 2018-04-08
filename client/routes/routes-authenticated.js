/*
* Routes: Authenticated
* Routes that are only visible to authenticated users.
*/

Router.route('chat', {
  path: '/',
  template: 'chat'
});

Router.route('index', {
  path: '/orders',
  template: 'index'
});

Router.route('customers', {
  path: '/customers',
  template: 'customerIndex'
});

Router.route('staff', {
  path: '/staff',
  template: 'driverIndex'
});

Router.route('items', {
  path: '/items',
  template: 'itemIndex'
});

Router.route('apiKey', {
  path: '/api-key',
  template: 'apiKey'
});

Router.route('driver', {
  path: '/driver/:_id',
  template: 'mapView'
});

Router.route('drivers', {
  path: '/drivers',
  template: 'generalView'
});
