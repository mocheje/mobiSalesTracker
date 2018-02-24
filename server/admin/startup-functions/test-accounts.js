/*
* Generate Test Accounts
* Creates a collection of test accounts automatically on startup.
*/

generateTestAccounts = function(){
  // Create an array of user accounts.
  var users = [
    { name: "Admin", email: "admin@mobisalestracker.com", password: "passw0rd" },
    { name: "mocheje", email: "mocheje@mobisalestracker.com", password: "passw0rd" },
    { name: "Neze", email: "neze@mobisalestracker.com", password: "passw0rd" },
    { name: "Kaci", email: "kaci@mobisalestracker.com", password: "passw0rd" },
  ];

  // Loop through array of user accounts.
  for(i=0; i < users.length; i++){
    // Check if the user already exists in the DB.
    var userEmail = users[i].email,
        checkUser = Meteor.users.findOne({"emails.address": userEmail});

    // If an existing user is not found, create the account.
    if ( !checkUser ) {
      var user = Accounts.createUser({
        email: userEmail,
        password: users[i].password,
        profile: {
          name: users[i].name
        }
      });

      Meteor.call( "initApiKey", user );

      // Load our default user up with some pizzas so we have some data
      // to work with out of the box.

    }
  }
  const driverExistence = Driver.findOne();
  if(!driverExistence) {
    for( var i = 0; i < Drivers.length; i++ ) {
      Driver.insert( Drivers[ i ] );
    }
  }

};
