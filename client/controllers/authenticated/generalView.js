/*
 *  Controller: generalView
 *  Template: /client/views/authenticated/generalView.html
 */

/*
 * Created
 */

Template.generalView.onCreated(function(){
  // Code to run when template is created goes here.
  let self = this;
  self.dict = new ReactiveDict();
  Meteor.call('getLastKnownLocations', function(err, res){
    self.dict.set("locationData", res);
  });
  //self.subscribe('Locations.all.drivers');
  self.subscribe('Drivers');
});

/*
 * Rendered
 */

Template.generalView.onRendered(function() {
  let self = this;
  // Code to run when template is rendered goes here.
  var allMarkers = [];
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 6.507, lng: 3.337},
    zoom: 12
  });



  self.autorun(function(){
    locations = self.dict.get("locationData");

    if(locations) {
      var fnMarker = function(obj, index) {
        const location = obj.location;
        const infowindow = new google.maps.InfoWindow;

        const driver = Driver.findOne({device: location.device});
        if(driver){
          const staffName = driver.StaffName || "Driver";
          const time = moment(location.time) || "";
          const email = driver.StaffEmail || "";
          const deviceID = driver.device || "";
          const desig = driver.Designation || "";
          const area = driver.Area || "";
          const lga = driver.LGA || "";

          map.setZoom(11);
          const marker = new google.maps.Marker({
            position: {lat: location.latitude, lng: location.longitude},
            map: map,
            title: staffName,
          });

          const contentString = `<div id="content">
              <div id="siteNotice">
              </div>
              <h1 id="firstHeading" class="firstHeading">${location.address}</h1>
              <div id="bodyContent">
                <p><b>${staffName}</b>, @ ${time} .</p>
                <p> Email : ${email}</p>
                <p>Device : ${deviceID}</p>
                <p>Designation : ${desig}</p>
                <p>Assinged Area / LGA :${area} / ${lga}</p>
              </div>
            </div>`;
          infowindow.setContent(contentString);

          marker.addListener('click', function () {
            infowindow.open(map, marker);
          });
          map.setCenter(marker.getPosition());
          allMarkers = allMarkers.concat(marker)
          return procMarker(index);
        }
      };

      var procMarker = function(index) {
        if (index > 0) {
          return fnMarker(locations[index - 1], index - 1);
        } else {
          return ;
        }
      };
      procMarker(locations.length);

    }
  })
});

/*
 * Helpers
 */

Template.generalView.helpers({
  driver: function(){
    // Code to run for helper function.
    return Driver.findOne();
  }
});

/*
 * Events
 */

Template.generalView.events({
  'click .employee': function(){

  }
});
