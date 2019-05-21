# Tic Tac Toe

## Technologies Used

javascript, jquery, html, css, sass, curl, bash,

## Unsolved Problems

There is an extra array in the check wins array.  I had to put it there so
that javascript could pick the winner.  The layout of the page is not attractive
and I need to put the change password and sign out in the header or footer.
Also, on a mobile device the gameboard is below all of the controls and you have
to scroll down to play.  It would be better if you didn't have to scroll up or
down to do anything.  

## WireFrames and User Stories
[Wire frames and user stories](https://git.generalassemb.ly/FMA126/game-project-scope-study/blob/response/study.md)


## Development Process and Problem Solving Stategy

I began working on the APIs to make sure that everything was set up for
the game events to successfully be sent to the server everytime.  Then I
started to think about the events of the game and what should happen with the
response data from the server. I wrote a constructor in the game-engine.js file
that would create a game in memory.  Then I wrote prototypes that could add
logic to the gameboard object.  Once I had the methods I began to piece together
what should happen when certain events happened and the conditions of the events
happening.  I knew I wanted the strech goal of multiplayer so I set up the
game logic so it would be reusable in single and multi-player mode.  At the final
step I gave the page styling and tested everything to make sure it works.

For problem solving, I chose the strategy of visualizing the game working and
then breaking it into smaller and smaller peices.  That way I knew that I needed
to solve little problems and piece them all together so that the end product would
work.
