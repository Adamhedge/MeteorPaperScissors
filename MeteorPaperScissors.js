mpsDB = new Mongo.Collection("meteorPaperScissors");
var game = mpsDB.findOne({
  title: 'game'
});
if(!game){
  mpsDB.insert({
    title: 'game',
    player1: 'unsubmitted',
    player2: 'unsubmitted'
  });
}
//Configuring routers, with a defined main template for a header.
Router.configure({
    layoutTemplate: 'main'
});
//Home Route
Router.route('/', {
    name: 'home',
    template: 'home'
});

//Route for players, per spec.
Router.route('/player1', {
  name: 'player1',
  template: 'play',
  data: 'player1'
});
Router.route('/player2', {
  name: 'player2',
  template: 'play',
  data: 'player2'
});

//Client Functionality.
if (Meteor.isClient) {
  // This code only runs on the client
  // Template.body.helpers({
  // });
  var currentPlayer = "";
  Template.home.events({
    "click .playerButton": function (event) {
      console.log("Made it!");
      // Prevent default browser form submit
      event.preventDefault();
      console.log(mpsDB.findOne({
        title: 'game'
      }));
      // Get value from form element
      var text = event.target.id;
      console.log(text);
      currentPlayer = text;
      Router.go(text);
      // Insert a task into the collection
    }
  });

  Template.play.events({
    "click .weapon": function (event) {
      console.log("You Chose!");
      // Prevent default browser form submit
      event.preventDefault();
      // console.log(currentPlayer);
      var text = event.target.id;
      //console.log(event.target);
      var game = mpsDB.findOne(mpsDB.findOne({
        title: 'game'
      }));
      var gameObj = {};
      gameObj[currentPlayer] = text;
      mpsDB.update({
        _id: game._id},
        {$set: gameObj
      });
      //mpsDB.upsert()
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
