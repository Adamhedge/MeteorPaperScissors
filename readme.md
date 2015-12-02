##Meteor | Paper | Scissors

Rock Paper Scissors, built in meteor, by Adam Hedgpeth

Available at [adamsmpc.meteor.com](http://adamsmpc.meteor.com)

##Requirements

Meteor, and Meteor's routing library iron router.

To get Iron Router, use the command
meteor add iron:router

##Usage

Clone down the application and run meteor.  Localhost:3000
should now show Meteor Paper Scissors!

##About

This app is developed using basic meteor tools, with simple
logic to manage a single running game of rock, paper, scissors.
Replayability has been added, and you can play solo
as there is no session storage logic.

When the main page loads the game checks to see if a game is finished,
And will display the results.  After a game is finished, the next time
a player submits a throw (rock, paper, scissors) the game will reset the 
other player to 'unsubmitted' to update the home page text.

Styling was done by hand.

Enjoy!
