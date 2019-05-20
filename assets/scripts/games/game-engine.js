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
  // this.lastCellIndex = lastCellIndex
  // this.lastCellValue = lastCellValue
  this.over = over
  // this.lastSquareId = lastSquareId
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
  // console.log('Previous from diff', this.getPreviousCells())
  // console.log('Current from diff', this.getCells())
  // const prevCells = this.getPreviousCells()
  // const cells = this.getCells()

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

// Gameboard.prototype.watch = function () {
//   let gameWatcher = resourceWatcher('<server>/games/:id/watch', {
//       Authorization: 'Token token=<token>'
// });
// }

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
    console.log(i)
    console.log(store.game.FreshGame.getCells())
    i++
    if (i > 6) {
      return
    } else if (store.game.FreshGame.isPlayerTurn() === 'player o' &&
     store.game.FreshGame.getPlayerOId() === store.user.id) {
      return
    } else if (store.game.FreshGame.isPlayerTurn() === 'player x' &&
     store.game.FreshGame.getPlayerXId() === store.user.id) {
      return
    }
    api.onShowGame()
      // .then(ui.onShowMultiGameSuccess)
      .then((responseData) => {
        // console.log('success', responseData)
        $('#display').html('')
        $('#message').text('Watching')

        store.game.FreshGame.setCells(responseData.game.cells)
        console.log(store.game.FreshGame.getCells())
        // store.game.FreshGame.getPreviousCells()
        // console.log('Current cells show', store.game.FreshGame.getCells())
        // console.log('Previous cells show', store.game.FreshGame.getPreviousCells())
        store.game.FreshGame.populate()
        store.game.FreshGame.isPlayerTurn()
        // store.game.FreshGame.diffValueCells(store.game.FreshGame.getCells(), store.game.FreshGame.getPreviousCells())
        // console.log(store.game.FreshGame.getDiffValue())
        store.game.FreshGame.onWin()
        store.game.FreshGame.isTie()

        // console.log('Previous Show', store.game.FreshGame.getPreviousCells())
        // console.log('Current Show', store.game.FreshGame.getCells())

        $('#message').append(`<p>Game id: ${store.game.FreshGame.getId()}
        cells: ${store.game.FreshGame.getCells()}
          over: ${store.game.FreshGame.getOver()}
          whos turn: ${store.game.FreshGame.isPlayerTurn()}
          player_x: ${store.game.FreshGame.getPlayerXId()}
          </p><hr>`)
      })
      .catch(ui.onShowMultiGameFailure)

    setTimeout(yourFunction, 5000)
  }
  yourFunction()
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

Gameboard.prototype.onWinMulti = function (cells) {
  // variables
  const route = []
  const nXn = 3
  // const cells = this.getCells()
  const wins = this.getWins()
  // const lastValue = this.getLastCellValue()

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
