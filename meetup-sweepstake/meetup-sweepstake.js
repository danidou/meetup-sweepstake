if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var result = HTTP.get('https://api.meetup.com/' + Meteor.settings.urlName + '?signed=true&key=' + Meteor.settings.meetupApi, 
      { 
        headers: {
          "Accept": "application/json"
        },
        params: { 
          format: 'json'
        } 
      }, 
      function (error, result) {
        if (!error) {
          console.log(result.data);
        } else {
          console.log(error);
        }
      }
    );
    
    // code to run on server at startup
  });
}
