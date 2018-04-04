/*
* Publications: Example
* Data publications for the Example collection.
*/

Meteor.publish( 'Locations', function(driver){
  check(driver, String);
  const device = Driver.findOne({_id: driver}).device;
  var latest = Location.findOne({device: device}, {"sort":{"time": -1}}).time;
  var data = Location.find({device: device, time: latest});

  if ( data ) {
    //console.log(data);
    return data;
  }

  return this.ready();
});

Meteor.publish( 'Locations.period', function(driver,peroid){
  check(driver, String);
  check(period, String);
  const device = Driver.findOne({_id: driver}).device;
  var latest = Location.findOne({device: device}, {"sort":{"time": -1}}).time;
  var data = Location.find({device: device, time: latest});

  if ( data ) {
    //console.log(data);
    return data;
  }

  return this.ready();
});


Meteor.publish( 'Locations.all.drivers', function(){
  // const devices = Driver.find({device: { $ne: "" }},{fields: {device: 1}});
  // const deviceArr = devices.map( (x) => { return x.device });
  // console.log(deviceArr);
  // ReactiveAggregate(this, Location, [
  //   {$sort: {"time": -1 } },
  //   {$group: {
  //     _id: "$device",
  //     location: { $first: "$$ROOT" }
  //   }
  // }]);

});

