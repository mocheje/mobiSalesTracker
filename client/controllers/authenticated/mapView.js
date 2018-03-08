/*
 *  Controller: mapView
 *  Template: /client/views/authenticated/mapView.html
 */

/*
 * Created
 */

Template.mapView.onCreated(function(){
  // Code to run when template is created goes here.
  let self = this;
  self.subscribe('Locations', Router.current().params._id);
  self.subscribe('Driver', Router.current().params._id);
});

/*
 * Rendered
 */

Template.mapView.onRendered(function() {
  let self = this;
  this.$('.datetimepicker').datetimepicker();
  // Code to run when template is rendered goes here.
  var allMarkers = [];
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 6.507, lng: 3.337},
    zoom: 12
  });
  self.autorun(function(){
    locations = Location.find();
    driver = Driver.findOne();

    var markers = locations.map(function(location) {
      const geocoder = new google.maps.Geocoder;
      const infowindow = new google.maps.InfoWindow;

      geocoder.geocode({'location': {lat: location.latitude, lng: location.longitude}}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            map.setZoom(11);
            const marker = new google.maps.Marker({
              position: {lat: location.latitude, lng: location.longitude},
              map: map,
              title: driver.StaffName,
            });
            const contentString = `<div id="content">
              <div id="siteNotice">
              </div>
              <h1 id="firstHeading" class="firstHeading">${results[0].formatted_address}</h1>
              <div id="bodyContent">
                <p><b>${driver.StaffName}</b>, @ ${moment(location.time)} .</p>
                <p> Email : ${driver.StaffEmail}</p>
                <p>Device : ${driver.device}</p>
                <p>Designation : ${driver.Designation}</p>
                <p>Assinged Area / LGA :${driver.Area} / ${driver.LGA}</p>
              </div>
            </div>`;
            infowindow.setContent(contentString);

            marker.addListener('click', function () {
              infowindow.open(map, marker);
            });
            map.setCenter(marker.getPosition());
            return marker;

          }
        }
      })
    })

    allMarkers = allMarkers.concat(markers);
  })
});

/*
 * Helpers
 */

Template.mapView.helpers({
  driver: function(){
    // Code to run for helper function.
    return Driver.findOne();
  }
});

/*
 * Events
 */

Template.mapView.events({
  'click .employee': function(){

  }
});
