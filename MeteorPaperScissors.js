//Core game logic

mpsDB = new Mongo.Collection("meteorPaperScissors");

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


console.log(mpsDB.find().fetch());

//console.log(game);




//Client Functionality.
if (Meteor.isClient) {

  //Defined a current player on the client to maintain which player you
  //Choose to throw as.
  var currentPlayer = "";

  //The helpers will display a winner if both players have played.
  Template.home.helpers({
    resultText : function (){
      var game = mpsDB.find().fetch()[0];
      console.log(game);
      if(game.player1 === 'unsubmitted' && game.player2 === 'unsubmitted'){
        return "The game has not begun!";
      } else if (game.player1 === 'unsubmitted'){
        return "Player 1 needs to play!";
      } else if (game.player2 === 'unsubmitted'){
        return "Player 2 needs to play!";
      } else {
        if(game.player1 === 'rock' && game.player2 === 'scissors' ||
           game.player1 === 'paper' && game.player2 === 'rock' ||
           game.player1 === 'scissors' && game.player2 === 'paper'){
          return "Player 1 beat Player 2 with " + game.player1 + "!!";
        } else {
          return "Player 2 beat Player 1 with " + game.player2 + "!!";
        }
      }
    }
  });

  //Define an event to store game data and re-route to the correct player URL.
  Template.home.events({
    "click .playerButton": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get the value of the clicked button
      var text = event.target.id;
      // Assign a player to the client state
      currentPlayer = text;
      // Re-route to the player template
      Router.go(text);
    }
  });

  Template.play.events({
    "click .weapon": function (event) {
      console.log("You Chose!");
      // Prevent default browser form submit
      event.preventDefault();
      // Set the weapon of choice, to be stored in the mini-db
      var weaponOfChoice = event.target.id;
      // Retrieve the game state.
      var game = mpsDB.find().fetch()[0];
      // Create a game object to dynamically update the game state
      // with the chosen player/ weapon of choice
      var gameObj = {};

      //This conditional will reset the game results text if a game has previously been played,
      //so it will show that one of the players needs to resubmit.
      if (game.player1 !== 'unsubmitted' && game.player2 !== 'unsubmitted'){
        gameObj.player1 = 'unsubmitted';
        gameObj.player2 = 'unsubmitted';
      }
      //Set the current player's picked option.
      gameObj[currentPlayer] = weaponOfChoice;
      //Update the mini-db with the new game state.
      mpsDB.update({
        _id: game._id},
        {$set: gameObj
      });
      //return to the home page.
      Router.go('home');
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log(mpsDB.find().fetch());
    var entries = mpsDB.find().fetch();
    console.log(entries);
    if(entries.length === 0){
      mpsDB.insert({
        title: 'game',
        player1: 'unsubmitted',
        player2: 'unsubmitted'
      });
    }
    // code to run on server at startup
  });
}
