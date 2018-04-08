/*
*  Controller: chat
*  Template: /client/views/chat.html
*/

/*
* Created
*/

Template.chat.onCreated(function(){

});

/*
* Rendered
*/

Template.chat.onRendered(function() {
  // Code to run when template is rendered goes here.
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "My First dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    },

    // Configuration options go here
    options: {}
  });
});

/*
* Helpers
*/

Template.chat.helpers({

});

/*
* Events
*/

Template.chat.events({

});
