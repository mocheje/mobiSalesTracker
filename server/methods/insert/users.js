/*
* Methods: Insert - API Key
* Creates the users API key.
*/

Meteor.methods({
  addUser: function( userId, obj ) {
    check( userId, Match.OneOf( Meteor.userId(), String ) );
    check( obj, Object );

    try {

        // Check if the user already exists in the DB.
        var userEmail = obj.email,
          checkUser = Meteor.users.findOne({"emails.address": userEmail});

        // If an existing user is not found, create the account.
        if ( !checkUser ) {
          var user = Accounts.createUser({
            email: userEmail,
            password: obj.password,
            profile: {
              name: obj.name
            }
          });

          Meteor.call( "initApiKey", user );

        }
    } catch( exception ) {
      return exception;
    }
  },
  deleteUser: function(userId) {
    check( userId, Match.OneOf( Meteor.userId(), String ) );
// if user is admin
    try {

     const checkUser = Meteor.users.findOne({"_id": userId});

      // If an existing user is not found, create the account.
      if ( !checkUser ) {
       throw new Meteor.Error('User does not exists');
      }

      const deletedUser = Meteor.users.remove({
        _id: userId,
      });
      // delete api keys
      const removedKey = APIKeys.remove({
        "owner": userId,
      });
    } catch( exception ) {
      return exception;
    }
  }
});
