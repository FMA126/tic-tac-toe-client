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
// ------------------------------------------
//
// Notes
//
// -------------------------------------------
// 1. Use store to create new Gameboard objects

const Gameboard = function (
  id,
  cells,
  over,
  playerO,
  playerX
) {
  this.id = id
  this.cells = cells
  // this.lastCellIndex = lastCellIndex
  // this.lastCellValue = lastCellValue
  this.over = over
  // this.lastSquareId = lastSquareId
  this.playerO = playerO
  this.playerX = playerX
}

Gameboard.prototype.getId = function () {
  return this.id
}

Gameboard.prototype.setId = function (id) {
  this.id = id
}

Gameboard.prototype.getCells = function () {
  return this.cells
}

Gameboard.prototype.setCells = function (cellArray) {
  this.cells = cellArray
}

Gameboard.prototype.getlastCellIndex = function () {
  return this.lastCellIndex
}

Gameboard.prototype.setLastCellIndex = function (index) {
  this.lastCellIndex = index
}

Gameboard.prototype.getLastCellValue = function () {
  return this.lastCellValue
}

Gameboard.prototype.setLastCellValue = function (value) {
  this.lastCellValue = value
}

Gameboard.prototype.getOver = function () {
  return this.over
}

Gameboard.prototype.setOver = function (over) {
  this.over = over
}

Gameboard.prototype.getLastSquareId = function () {
  return this.lastSquare
}

Gameboard.prototype.setLastSquareId = function (squareId) {
  this.lastSquare = squareId
}

Gameboard.prototype.getPlayerO = function () {
  return this.playerO
}

Gameboard.prototype.setPlayerO = function (playerX) {
  this.playerX = playerX
}

Gameboard.prototype.getPlayerX = function () {
  return this.playerX
}

Gameboard.prototype.setPlayerX = function (playerX) {
  this.playerX = playerX
}

// Gameboard.prototype.onMove = function () {
//   const boxsSelected = this.cells.filter(box => box === 'x' || box === 'o')
//   console.log('hi from moves')
//   return boxsSelected.length
// }

Gameboard.prototype.isPlayerTurn = function () {
  const boxsSelected = this.cells.filter(box => box === 'x' || box === 'o')
  let whosTurn

  if (boxsSelected.length % 2 === 0) {
    whosTurn = 'player x'
  } else {
    whosTurn = 'player o'
  }
  return whosTurn
}

// GameBoard.prototype.isOver = function () {
// const
// }

// const Gamenumber = new Gameboard(1,
//   ['x', 'o', 'x', 'o', 'x', 'o', '', '', ''],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )

module.exports = {
  Gameboard
}
