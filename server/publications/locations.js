/*
* Publications: Example
* Data publications for the Example collection.
*/

Meteor.publish( 'Locations', function(driver){
  check(driver, String);
  const device = Driver.findOne({_id: driver}).device;

  var data = Location.find({device: device},{sort: {time: -1}}, {limit: 10});

  if ( data ) {
    //console.log(data);
    return data;
  }

  return this.ready();
});
