mpsDB = new Mongo.Collection("meteorPaperScissors");
Router.configure({
    layoutTemplate: 'main'
});
Router.route('/', {
    template: 'home'
});
Router.route('/player1');
Router.route('/player2');

if (Meteor.isClient) {
  // This code only runs on the client
  // Template.body.helpers({
  // });
  Template.body.events({
      // "submit .new-task": function (event) {
      //   // Prevent default browser form submit
      //   event.preventDefault();
   
      //   // Get value from form element
      //   var text = event.target.text.value;
   
      //   // Insert a task into the collection
      //   Tasks.insert({
      //     text: text,
      //     createdAt: new Date() // current time
      //   });
   
      //   // Clear form
      //   event.target.text.value = "";
      // },
      // "change .hide-completed input": function (event) {
      // Session.set("hideCompleted", event.target.checked);
      // }
    });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
