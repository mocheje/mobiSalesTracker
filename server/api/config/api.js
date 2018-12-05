var GoogleMapsAPI = Npm.require('googlemaps');
var publicConfig = {
  key: 'AIzaSyAGW3Jy6eNuYL6UKGoEF88H1FSK20X_740',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};

var gmAPI = new GoogleMapsAPI(publicConfig);

API = {
  authentication: function( apiKey ) {
    var getUser = APIKeys.findOne( { "key": apiKey }, { fields: { "owner": 1 } } );
    if ( getUser ) {
      return getUser.owner;
    } else {
      return false;
    }
  },
  connection: function( request ) {
    var getRequestContents = API.utility.getRequestContents( request ),
        apiKey             = API.utility.getApiKey(request),
        device             = API.utility.getDeviceId(request),
        validUser          = API.authentication( apiKey );

    if ( validUser ) {
      // Now that we've validated our user, we make sure to scrap their API key
      // from the data we received. Next, we return a new object containing our
      // user's ID along with the rest of the data they sent.
      return { owner: validUser, data: getRequestContents, device: device|| 'unknown' };
    } else {
      return { error: 401, message: "Invalid API key." };
    }
  },
  handleRequest: function( context, resource, method ) {
    var connection = API.connection( context.request );
    if ( !connection.error ) {
      API.methods[ resource ][ method ]( context, connection );
    } else {
      API.utility.response( context, 401, connection );
    }
  },
  methods: {
    pizza: {
      GET: function( context, connection ) {
        // Check to see if our request has any data. If it doesn't, we want to
        // return all pizzas for the owner. If it does, we want to search for
        // pizzas matching that query.
        var hasQuery = API.utility.hasData( connection.data );

        if ( hasQuery ) {
          connection.data.owner = connection.owner;
          // Note: we're doing a very simple find on our data here. This means that
          // with something like our Toppings parameter, we're looking for the
          // exact array passed (not the individual items in the array). To do
          // that, you'd need to parse out the array items from connection.data
          // and use the Mongo $in operator like:
          // Pizza.find( { "toppings": { $in: connection.data.toppings } } );
          var getPizzas = Pizza.find( connection.data ).fetch();

          if ( getPizzas.length > 0 ) {
            // We found some pizzas, we can pass a 200 (success) and return the
            // found pizzas.
            API.utility.response( context, 200, getPizzas );
          } else {
            // Bummer, we didn't find any pizzas. We can pass a 404 (not found)
            // and return an error message.
            API.utility.response( context, 404, { error: 404, message: "No pizzas found, dude." } );
          }
        } else {
          // Our request didn't contain any params, so we'll just return all of
          // the pizzas we have for the owner associated with the passed API key.
          var getPizzas = Pizza.find( { "owner": connection.owner } ).fetch();
          API.utility.response( context, 200, getPizzas );
        }
      },
      POST: function( context, connection ) {
        // Make sure that our request has data and that the data is valid.
        var hasData   = API.utility.hasData( connection.data ),
            validData = API.utility.validate( connection.data, { "name": String, "crust": String, "toppings": [ String ] });

        if ( hasData && validData ) {
          connection.data.owner = connection.owner;
          var pizza = Pizza.insert( connection.data );
          API.utility.response( context, 200, { "_id": pizza, "message": "Pizza successfully created!" } );
        } else {
          API.utility.response( context, 403, { error: 403, message: "POST calls must have a name, crust, and toppings passed in the request body in the correct formats." } );
        }
      },
      PUT: function( context, connection ) {
        var hasQuery  = API.utility.hasData( connection.data ),
            validData = API.utility.validate( connection.data, Match.OneOf(
              { "_id": String, "name": String },
              { "_id": String, "crust": String },
              { "_id": String, "toppings": [ String ] },
              { "_id": String, "name": String, "crust": String },
              { "_id": String, "name": String, "toppings": [ String ] },
              { "_id": String, "crust": String, "toppings": [ String ] },
              { "_id": String, "name": String, "crust": String, "toppings": [ String ] }
            ));

        if ( hasQuery && validData ) {
          // Save the ID of the pizza we want to update and then sanatize our
          // data so that it only includes name, crust, and toppings parameters.
          var pizzaId = connection.data._id;
          delete connection.data._id;

          var getPizza = Pizza.findOne( { "_id": pizzaId }, { fields: { "_id": 1 } } );

          if ( getPizza ) {
            Pizza.update( { "_id": pizzaId }, { $set: connection.data } );
            API.utility.response( context, 200, { "message": "Pizza successfully updated!" } );
          } else {
            API.utility.response( context, 404, { "message": "Can't update a non-existent pizza, homeslice." } );
          }
        } else {
          API.utility.response( context, 403, { error: 403, message: "PUT calls must have a pizza ID and at least a name, crust, or toppings passed in the request body in the correct formats (String, String, Array)." } );
        }
      },
      DELETE: function( context, connection ) {
        var hasQuery  = API.utility.hasData( connection.data ),
            validData = API.utility.validate( connection.data, { "_id": String } );

        if ( hasQuery && validData ) {
          var pizzaId  = connection.data._id;
          var getPizza = Pizza.findOne( { "_id": pizzaId }, { fields: { "_id": 1 } } );

          if ( getPizza ) {
            Pizza.remove( { "_id": pizzaId } );
            API.utility.response( context, 200, { "message": "Pizza removed!" } );
          } else {
            API.utility.response( context, 404, { "message": "Can't delete a non-existent pizza, homeslice." } );
          }
        } else {
          API.utility.response( context, 403, { error: 403, message: "DELETE calls must have an _id (and only an _id) in the request body in the correct format (String)." } );
        }
      }
    },
    locations: {
      POST: function( context, connection ) {
        // Make sure that our request has data and that the data is valid.
        var data = connection.data,
          device = connection.device,
          hasData   = API.utility.hasData( data );
          // validData = API.utility.validate( data, [{
          //   "provider": String,
          //   "time": Number,
          //   "longitude": Number,
          //   "latitude": Number,
          //   "accuracy": Number,
          //   "speed": Number,
          //   "altitude": Number,
          //   "bearing": Number,
          //   "locationProvider": Number,
          // }]);

        if ( hasData) {
          if(data.length){
            let index = 0;
            next();

            function next() {
              const location = data[index];
              let addr = 'Unnamed Address';
              const reverseGeocodeParams = {
                "latlng":  `${location.latitude},${location.longitude}`,
                "result_type":   "street_address"
              };
              location.time = new Date(Number(location.time));

              gmAPI.reverseGeocode(reverseGeocodeParams, Meteor.bindEnvironment(function (errs, response) {
                if (response && response.results[0]) {
                  addr = response.results[0].formatted_address
                }

                location.device = device;
                location.address = addr;
                console.log(location);
                Location.insert(location);
                // Do the next video now we've finished this one
                if (++index < data.length) {
                  next();
                }
              }))
            }
          }
          API.utility.response( context, 200, { "status": "received", "message": "Location succesfully sync !" } );
        } else {
          API.utility.response( context, 403, { error: 403, message: "POST calls must have a latitude, longitude, and device passed in the request body in the correct formats." } );
        }
      }
    },
    drivers: {
      GET: function( context, connection ) {
        // Check to see if our request has any data. If it doesn't, we want to
        // return all pizzas for the owner. If it does, we want to search for
        // pizzas matching that query.
        var hasQuery = API.utility.hasData( connection.data );
        if ( hasQuery ) {
          const email = connection.data.email;
          if(email){
            const driver = Driver.find({StaffEmail: email}).fetch();
            API.utility.response( context, 200, driver );
          } else {
            API.utility.response( context, 200, 'Driver not found' );
          }
        }
      }
    },
    register_device: {
      POST: function( context, connection ) {
        // Make sure that our request has data and that the data is valid.
        var data = connection.data,
          hasData   = API.utility.hasData( data ),
          validData = API.utility.validate( data, { "device": String, "email": String });

        if ( hasData && validData ) {
          console.log(data);
         //modify driver and set device using email
          const driver = Driver.findOne({device: data.device});
          if(driver){
            //deassociate device and assign to new driver
            driver.update({_id: driver._id},{$set: {device: `${driver.device}_old`}});
            //update all locations from previous driver
            location.update({device: data.device}, {$set: {device: `${data.device}_old`}});

            //API.utility.response( context, 403, { error: 403, message: "Device belongs to another driver!. Please contact admin" } );
          }
          doc = Driver.findOne({StaffEmail: data.email});
          if(doc){
            doc.device = data.device;
            const response = Driver.update({StaffEmail: data.email}, doc);
            API.utility.response( context, 200, { "status": "received", response } );
          } else {
            API.utility.response( context, 403, { error: 403, message: "Driver not found. Please contact admin" } );
          }

        } else {
          API.utility.response( context, 403, { error: 403, message: "Request payload must contain a valid device and driver as body content." } );
        }
      }
    }
  },
  utility: {
    getApiKey: function(request){
      return request.headers['x-api-key'];
    },
    getDeviceId: function(request){
      return request.headers['x-device-id'];
    },
    getRequestContents: function( request ) {
      switch( request.method ) {
        case "GET":
          return request.query;
        case "POST":
        case "PUT":
        case "DELETE":
          return request.body;
      }
    },
    hasData: function( data ) {
      return Object.keys( data ).length > 0 ? true : false;
    },
    response: function( context, statusCode, data ) {
      context.response.setHeader( 'Content-Type', 'application/json' );
      context.response.statusCode = statusCode;
      context.response.end( JSON.stringify( data ) );
    },
    validate: function( data, pattern ) {
      return Match.test( data, pattern );
    }
  }
}
