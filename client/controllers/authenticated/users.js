/*
*  Controller: Index
*  Template: /client/views/index.html
*/

/*
* Created
*/

Template.users.onCreated(function(){
  // Code to run when template is created goes here.
  this.subscribe( "users" );

  var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
  };
  var fields = ['email.address', 'profile.name'];
  this.isSearchView = new ReactiveVar;
  userSearch = new SearchSource('users', fields, options);
});

/*
* Rendered
*/

Template.users.onRendered(function() {
  // Code to run when template is rendered goes here.
  let self = this;
  self.isSearchView.set(false);
});

/*
* Helpers
*/

Template.users.helpers({
  users: function(){
    return Meteor.users.find();
  },
  getuserSearch: function() {
    return userSearch.getData();
  },
  isSearchView: function() {
    return Template.instance().isSearchView.get();
  },
  isLoading: function() {
    return driverSearch.getStatus().loading;
  },
  address: function(emails) {
    return emails[0].address;
  }
});

/*
* Events
*/

Template.users.events({

  'click #newUser': function(event){
    event.preventDefault();
    Modal.show('userCreate');
  },
  "keyup #search-box": _.throttle(function(e, tmpl) {
    var text = $(e.target).val().trim();

    if (text && text.trim().length > 0) {
      tmpl.isSearchView.set(true);
      userSearch.search(text);
    } else {
      tmpl.isSearchView.set(false);
    }
  }, 200),
  'click .deleteUser': function (e, tmpl) {
    const userId = e.currentTarget.id;
    Meteor.call('deleteUser', userId, function(error, response){
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "User successfully deleted", "success" );
      }
    })
  }
});
