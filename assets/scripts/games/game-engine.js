'use strict'

// User stories:
// 1. Game board is empty after creating new game
// 2. Game board is populated when showing game unless
//  game is over
// 3. First player (player_x default) can click on a
// square and a 'x' appears.  Player cannot change pick
// after they click once.
// 4. Second player (player_o) can click on a square and
//  an 'o' appears.  Player cannot change pick after they
// click once.
// 5. If there are three x's or o's lined up in a row,
// column or diagonal, player_x/o wins the game and
// the game is over.
// 6. If there are not three lined up and there are no
// more empty squares, the game is a draw
// Extra add-ons
// 1. Multi-player:
// 2.

const Gameboard = function (id, cells, over, playerO, playerX) {
  this.id = id
  this.cells = cells
  this.over = over
  this.playerO = playerO
  this.playerX = playerX
}

Gameboard.prototype.onMove = function () {
  const boxsWithX = this.cells.filter(box => box === 'x')
  console.log('hi from moves')
  return boxsWithX
}

Gameboard.prototype.onPlayerTurn = function () {
  const turns = this.cells.length
  let whosTurn

  if (turns % 2 === 0) {
    whosTurn = 'player o'
  } else {
    whosTurn = 'player x'
  }
  return whosTurn
}

const Gamenumber = new Gameboard(1,
  ['x', 'o', 'x', 'o', 'x', 'o', '', '', ''],
  false,
  {id: 20, email: 'a1@1.com'},
  {id: 30, email: 'b1@1.com'}
)

module.exports = {
  Gameboard,
  Gamenumber
}
