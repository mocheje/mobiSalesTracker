/*
*  Controller: Index
*  Template: /client/views/index.html
*/

/*
* Created
*/

Template.index.onCreated(function(){
  // Code to run when template is created goes here.
  this.subscribe( "Drivers" );

  var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
  };
  var fields = ['StaffName', 'StaffEmail'];
  this.isSearchView = new ReactiveVar;
  driverSearch = new SearchSource('drivers', fields, options);
});

/*
* Rendered
*/

Template.index.onRendered(function() {
  // Code to run when template is rendered goes here.
  let self = this;
  self.isSearchView.set(false);
});

/*
* Helpers
*/

Template.index.helpers({
  drivers: function(){
    return Driver.find();
  },
  getdriverSearch: function() {
    return driverSearch.getData();
  },
  isSearchView: function() {
    return Template.instance().isSearchView.get();
  },
  isLoading: function() {
    return driverSearch.getStatus().loading;
  },
});

/*
* Events
*/

Template.index.events({
  'click .employee': function(){

  },
  'click #newDriver': function(event){
    event.preventDefault();
    Modal.show('driverCreate');
  },
  "keyup #search-box": _.throttle(function(e, tmpl) {
    var text = $(e.target).val().trim();

    if (text && text.trim().length > 0) {
      tmpl.isSearchView.set(true);
      driverSearch.search(text);
    } else {
      tmpl.isSearchView.set(false);
    }
  }, 200),
});
