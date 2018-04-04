/*
* Methods: Insert - API Key
* Creates the users API key.
*/

Meteor.methods({
  addDriver: function( userId, obj ) {
    check( userId, Match.OneOf( Meteor.userId(), String ) );
    check( obj, Object );

    try {
       var driver = Driver.insert(  {
         "StaffName": obj.StaffName,
         "StaffEmail": obj.StaffEmail,
         "device": obj.device,
         "Designation": obj.Designation,
         "Role": obj.Role,
         "Area": obj.Area,
         "LGA": obj.LGA,
         "Status": obj.Status
       });
       return driver;
    } catch( exception ) {
      return exception;
    }
  }
});
