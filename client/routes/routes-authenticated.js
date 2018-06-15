/*
* Routes: Authenticated
* Routes that are only visible to authenticated users.
*/

Router.route('index', {
  path: '/',
  template: 'index'
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

Router.route('users', {
  path: '/users',
  template: 'users'
});
