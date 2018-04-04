/*
* Methods: Read - Example
* Example of a method used for reading from the database.
*/

Meteor.methods({
  getLastKnownLocations: function(){
    // Perform the read.
    const loc = Location.aggregate([
      {$sort: {"time": -1 } },
      {$group: {
        _id: "$device",
        location: { $first: "$$ROOT" }
      }
      }], {allowDiskUse: true});

    // If the read fails (no documents found), throw an error.
    if (!loc) {
      throw new Meteor.Error(500, 'Error 500: Not Found', 'No location found.');
    }

    // Return either the result or the error.
    return loc;
  }
});
