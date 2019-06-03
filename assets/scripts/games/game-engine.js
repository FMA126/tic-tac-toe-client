'use strict'

const config = require('../config')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

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
  this.over = over
  this.playerO = playerO
  this.playerX = playerX
  this.isWinner = ''
  this.i = 0
  // last index of array is to fix bug where it times out before it can read
  // the diagonal
  this.wins = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
    [[0, 0], [0, 1], [1, 0]]
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

Gameboard.prototype.getI = function () {
  return this.i
}

Gameboard.prototype.setI = function (num) {
  this.i = num
}

Gameboard.prototype.getPreviousCells = function () {
  return this.previousCells
}

Gameboard.prototype.setPreviousCells = function (cellArray) {
  this.previousCells = cellArray
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

Gameboard.prototype.getPlayerOId = function () {
  return this.playerO.id
}

Gameboard.prototype.getPlayerO = function () {
  return this.playerO
}

Gameboard.prototype.setPlayerO = function (playerO) {
  this.playerO = playerO
}

Gameboard.prototype.getPlayerXId = function () {
  return this.playerX.id
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

Gameboard.prototype.getDiffValue = function () {
  return this.diffValue
}

Gameboard.prototype.setDiffValue = function (val) {
  this.diffValue = val
}

Gameboard.prototype.diffValueCells = function (current, previous) {

  previous.forEach((el, index) => {
    if (el !== current[index]) {
      this.setDiffValue(current[index])
    }
  })
}

Gameboard.prototype.populate = function () {
  const gameArray = this.getCells()
  $('.box').html('')
  for (let i = 0; i < gameArray.length; i++) {
    $(`#box-${i}-m`).text(`${gameArray[i]}`)
  }
}

Gameboard.prototype.isPlayerTurn = function () {
  const boxsSelected = this.getCells().filter(box => box === 'x' || box === 'o')
  let whosTurn

  if (boxsSelected.length % 2 === 0) {
    whosTurn = 'player x'
  } else {
    whosTurn = 'player o'
  }
  return whosTurn
}

Gameboard.prototype.watch = function () {
  // do whatever you like here
  let i = 0

  function yourFunction () {
    i++
    if (i > 75) {
      return
    } else if (store.game.FreshGame.isPlayerTurn() === 'player o' &&
     store.game.FreshGame.getPlayerOId() === store.user.id) {
      return
    } else if (store.game.FreshGame.isPlayerTurn() === 'player x' &&
     store.game.FreshGame.getPlayerXId() === store.user.id) {
      return
    } else if (!store.active) {
      return
    }
    api.onShowGame()
      .then((responseData) => {
        $('#display').html('')
        $('#message').text('Watching')

        store.game.FreshGame.setCells(responseData.game.cells)
        store.game.FreshGame.populate()
        store.game.FreshGame.isPlayerTurn()
        store.game.FreshGame.onWin()
        store.game.FreshGame.isTie()
      })
      .catch(ui.onShowMultiGameFailure)

    setTimeout(yourFunction, 800)
  }
  yourFunction()
}

Gameboard.prototype.isTie = function () {
  this.onWin()
  let tie = false
  const empty = this.cells.filter(el => el === '')
  if (empty.length === 0 && !this.getOver()) {
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
  // iterate through each win array in constructor
  wins.forEach(path => {
    path.forEach(cord => {
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
    })
  })
}

Gameboard.prototype.onWinMulti = function (cells) {
  // variables
  const route = []
  const nXn = 3
  const wins = this.getWins()

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
  // Actions

  // iterate through each win array in constructor
  wins.forEach(path => {
    path.forEach(cord => {
      if (route.length === 3) {
        if (allSame(route) === 'x' || allSame(route) === 'o') {
          const xs = cells.filter((el) => el === 'x')
          const os = cells.filter((el) => el === 'o')
          const xando = xs.concat(os)
          if (xando.length % 2 === 0) {
            this.setIsWinner(`Player o`)
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
          } else {
            this.setIsWinner(`Player x`)
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
        }
        route.splice(0, 3)
      }

      route.push(cells[cord[0] * nXn + cord[1]])
    })
  })
}

module.exports = {
  Gameboard
}
