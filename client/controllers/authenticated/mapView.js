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
  self.locationPeriod = new ReactiveVar;
  self.subscribe('Locations.period', Router.current().params._id, moment().format());
  self.subscribe('Driver', Router.current().params._id);
});

/*
 * Rendered
 */

Template.mapView.onRendered(function() {
  let self = this;
  this.$('.datetimepicker').datetimepicker({
      defaultDate: new Date()
    });

  // set reactivevar date
  self.locationPeriod.set(moment().format());
  // Code to run when template is rendered goes here.

  self.autorun(function(){
    var allMarkers = [];
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 6.507, lng: 3.337},
      zoom: 12
    });
    const date = self.locationPeriod.get() || moment().form(); // current date
    self.subscribe('Locations.period', Router.current().params._id, date);
    locations = Location.find();
    driver = Driver.findOne();

    var markers = locations.map(function(location) {
      const infowindow = new google.maps.InfoWindow;
      const zoom = locations.length == 1 ? 16 : 11 ;
      map.setZoom(zoom);
      const marker = new google.maps.Marker({
        position: {lat: location.latitude, lng: location.longitude},
        map: map,
        title: driver.StaffName,
      });
      const contentString = `<div id="content">
              <div id="siteNotice">
              </div>
              <h1 id="firstHeading" class="firstHeading">${location.address}</h1>
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
  },
  driverName: function () {
    const driver = Driver.findOne({});
    return driver ? driver.StaffName : '';
  },
  locations: function() {
    return Location.find();
  },
  timeFormat: function(time) {
    return moment(time).fromNow();
  }
});

/*
 * Events
 */

Template.mapView.events({
  'dp.change .datetimepicker': function(e, tmpl){
    tmpl.locationPeriod.set(e.date.format());
    //console.log($(e).data('DateTimePicker').date())
    //console.log($('.datetimepicker').data('DateTimePicker').date())
  }
});
