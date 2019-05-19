'use strict'

const config = require('../config')
const store = require('../store')

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
  this.isWinner = ''
  this.wins = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ]
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

Gameboard.prototype.getLastCellIndex = function () {
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

Gameboard.prototype.getIsWinner = function () {
  return this.isWinner
}

Gameboard.prototype.setIsWinner = function (winner) {
  this.isWinner = winner
}

Gameboard.prototype.getWins = function () {
  return this.wins
}

Gameboard.prototype.populate = function () {
  const gameArray = this.getCells()
  $('.box').html('')
  for (let i = 0; i < gameArray.length; i++) {
    $(`#box-${i}`).text(`${gameArray[i]}`)
  }
}

// Gameboard.prototype.watch = function () {
//   let gameWatcher = resourceWatcher('<server>/games/:id/watch', {
//       Authorization: 'Token token=<token>'
// });
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

Gameboard.prototype.isTie = function () {
  let tie = false
  const empty = this.cells.filter(el => el === '')
  if (empty.length === 0) {
    this.setOver(true)
    tie = true
    $.ajax({
      url: config.apiUrl + '/games/' + this.getId(),
      method: 'PATCH',
      data: {
        'game': {
          'cell': {
            'index': this.getLastCellIndex(),
            'value': this.getLastCellValue()
          },
          'over': this.getOver()
        }
      },
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
  return tie
}

Gameboard.prototype.onWin = function () {
  // variables
  let route = []
  const nXn = 3
  const cells = this.getCells()
  const wins = this.getWins()
  const lastValue = this.getLastCellValue()

  // check if win path is populated with x's or o's
  const allSame = function (connect) {
    let symbol
    const allX = connect.every(el => el === 'x')
    const allO = connect.every(el => el === 'o')

    if (allX) {
      symbol = 'x'
    } else if (allO) {
      symbol = 'o'
    }
    return symbol
  }
  console.log('cells', cells)
  console.log(wins)
  // Actions

  // iterate through each win array in constructor
  wins.forEach(path => {
    // iterate through each path cordinate
    console.log('Looking in win path' + ' ' + path)
    path.forEach(cord => {
      console.log('Coordinate pair' + ' ' + cord)

      if (route.length === 3) {
        if (allSame(route) === 'x' || allSame(route) === 'o') {
          this.setIsWinner(`Player ${lastValue}`)
          this.setOver(true)
          $.ajax({
            url: config.apiUrl + '/games/' + this.getId(),
            method: 'PATCH',
            data: {
              'game': {
                'cell': {
                  'index': this.getLastCellIndex(),
                  'value': this.getLastCellValue()
                },
                'over': this.getOver()
              }
            },
            headers: {
              Authorization: 'Token token=' + store.user.token
            }
          })
        }
        route.splice(0, 3)
      }

      route.push(cells[cord[0] * nXn + cord[1]])
      if (route.length === 3) {
        console.log(route)
      }
      if (this.getIsWinner()) {
        console.log('Winning player is ' + this.getIsWinner())
      }
    })
  })
}

// const Gamenumber = new Gameboard(1,
//   ['x', 'x', 'x', 'o', '', 'o', 'o', '', ''],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )
// const Gameone = new Gameboard(1,
//   ['x', 'o', 'o', 'x', 'x', 'x', 'o', '', ''],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )
// const Gametwo = new Gameboard(1,
//   ['o', '', '', 'o', 'o', 'x', 'x', 'x', 'x'],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )
// const Gamethree = new Gameboard(1,
//   ['x', '', '', 'x', 'x', 'o', 'x', 'o', 'o'],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )
// const Gamefour = new Gameboard(1,
//   ['o', 'x', 'o', '', 'x', 'o', '', 'x', 'x'],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )
// const Gamefive = new Gameboard(1,
//   ['o', 'o', 'x', 'x', 'o', 'x', '', '', 'x'],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )
// const Gamesix = new Gameboard(1,
//   ['x', 'o', 'o', '', 'x', '', 'o', 'x', 'x'],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )
// const Gameseven = new Gameboard(1,
//   ['x', 'o', 'x', 'o', 'x', '', 'x', 'o', ''],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )
//
// const Gameeight = new Gameboard(1,
//   ['o', 'o', 'o', 'x', 'x', '', '', 'x', 'x'],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )
//
// const Gamenine = new Gameboard(1,
//   ['x', '', 'o', 'x', 'o', 'x', 'o', '', ''],
//   false,
//   {id: 20, email: 'a1@1.com'},
//   {id: 30, email: 'b1@1.com'}
// )
//
// Gamenumber.setLastCellValue('x')
// Gamenumber.setLastCellIndex(0)
// Gamenumber.onWin()
// Gamenumber.getIsWinner()
//
// Gameone.setLastCellValue('x')
// Gameone.setLastCellIndex(0)
// Gameone.onWin()
// Gameone.getIsWinner()
//
// Gametwo.setLastCellValue('x')
// Gametwo.setLastCellIndex(0)
// Gametwo.onWin()
// Gametwo.getIsWinner()
//
// Gamethree.setLastCellValue('x')
// Gamethree.setLastCellIndex(0)
// Gamethree.onWin()
// Gamethree.getIsWinner()
//
// Gamefour.setLastCellValue('x')
// Gamefour.setLastCellIndex(0)
// Gamefour.onWin()
// Gamefour.getIsWinner()
//
// Gamefive.setLastCellValue('x')
// Gamefive.setLastCellIndex(0)
// Gamefive.onWin()
// Gamefive.getIsWinner()
//
// Gamesix.setLastCellValue('x')
// Gamesix.setLastCellIndex(0)
// Gamesix.onWin()
// Gamesix.getIsWinner()
//
// Gameseven.setLastCellValue('x')
// Gameseven.setLastCellIndex(0)
// Gameseven.onWin()
// Gameseven.getIsWinner()
//
// Gameeight.setLastCellValue('o')
// Gameeight.setLastCellIndex(2)
// Gameeight.onWin()
// Gameeight.getIsWinner()
//
// Gamenine.setLastCellValue('o')
// Gamenine.setLastCellIndex(2)
// Gamenine.onWin()
// Gamenine.getIsWinner()

module.exports = {
  Gameboard
}
