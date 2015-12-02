mpsDB = new Mongo.Collection("meteorPaperScissors");
Router.configure({
    layoutTemplate: 'main'
});
Router.route('/', {
    name: 'home',
    template: 'home'
});
Router.route('/player1', {
  name: 'player1',
  template: 'play'
});
Router.route('/player2', {
  name: 'player2',
  template: 'play'
});

if (Meteor.isClient) {
  // This code only runs on the client
  // Template.body.helpers({
  // });
  Template.home.events({
    "click .playerButton": function (event) {
      console.log("Made it!");
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.id;
      console.log(text);
      Router.go(text);
      // Insert a task into the collection
    }
  });
  Template.play.events({
    "click .weapon": function (event) {
      console.log("You Chose!");
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.id;
      console.log(text);
      Router.go('home');
      // Insert a task into the collection
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
