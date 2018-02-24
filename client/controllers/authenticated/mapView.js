/*
 *  Controller: mapView
 *  Template: /client/views/authenticated/mapView.html
 */

/*
 * Created
 */

Template.mapView.onCreated(function(){
  // Code to run when template is created goes here.
  this.subscribe('Locations');
});

/*
 * Rendered
 */

Template.mapView.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();
  // Code to run when template is rendered goes here.
  var allMarkers = [];
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 6.507, lng: 3.337},
    zoom: 12
  });

  locations = Location.find().fetch();
  var markers = locations.map(function(location) {
    var marker = new google.maps.Marker({
      position: {lat: location.latitude, lng: location.longitude},
      map: map,
      title: 'Ocheje Michael'
    });
    map.setCenter(marker.getPosition());
    return marker;
  });
  allMarkers = allMarkers.concat(markers);
});

/*
 * Helpers
 */

Template.mapView.helpers({
  example: function(){
    // Code to run for helper function.
  }
});

/*
 * Events
 */

Template.mapView.events({
  'click .employee': function(){

  }
});
