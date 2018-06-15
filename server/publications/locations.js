/*
* Publications: Example
* Data publications for the Example collection.
*/

Meteor.publish( 'Locations', function(driver){
  check(driver, String);
  const device = Driver.findOne({_id: driver}).device;
  var latest = Location.findOne({device: device}, {"sort":{"time": -1}});
  var data = Location.find({device: device, time: latest.time});

  if ( data ) {
    //console.log(data);
    return data;
  }

  return this.ready();
});

Meteor.publish( 'Locations.period', function(driver,period){
  check(driver, String);
  check(period, String);
  console.log(period);
  console.log(driver);
  const device = Driver.findOne({_id: driver}).device;
  const startPeriod = moment(period).startOf('day').format()
  const endperiod = moment(period).endOf('day').format()

  var data = Location.find({device: device, time: {$gt: new Date(startPeriod), $lt: new Date(endperiod)}}, {sort: {time: -1}});

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

