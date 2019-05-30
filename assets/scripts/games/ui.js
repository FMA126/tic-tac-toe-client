'use strict'

const store = require('../store')
const gameEngine = require('./game-engine')
const GameConstructor = gameEngine.Gameboard

const onCreateGameSuccess = (responseData) => {
  // console.log('success', responseData)
  $('.box').html('')
  // $('#game-board-multi').addClass('hide')
  $(window).scrollTop(0)
  $('#game-board-single').tooltip('disable')
  $('#message').text('Single-Player Game')
  $('#message').text('')
  $('.box').removeClass('highlight-x')
  $('.box').removeClass('highlight-o')
  // $('footer').addClass('hide')
  $('#message').text('In Play')
  $('#game-board-section').removeClass('hide')
  $('#game-board-single').removeClass('hide')
  $('#game-board-multi').addClass('hide')

  store.game.FreshGame = new GameConstructor(
    responseData.game.id,
    responseData.game.cells,
    responseData.game.over,
    responseData.game.player_o,
    responseData.game.player_x
  )
  // console.log(store.game.FreshGame)

  // $('#display').append(`<p>Game id: ${store.game.FreshGame.getId()}
  // cells: ${store.game.FreshGame.getCells()}
  //   over: ${store.game.FreshGame.getOver()}
  //   player_x: ${store.game.FreshGame.getPlayerXId()}
  //   </p><hr>`)
}

const onCreateGameFailure = (responseData) => {
  // console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Created game failure!')
  // $('#message').addClass('success')
}

const onCreateMultiGameSuccess = (responseData) => {
  // console.log('success', responseData)
  $('#message').html('')
  $(window).scrollTop(0)
  $('#game-board-single').addClass('hide')
  $('#game-board-multi').removeClass('hide')
  $('.box').removeClass('highlight-x')
  $('.box').removeClass('highlight-o')

  store.game.FreshGame = new GameConstructor(
    responseData.game.id,
    responseData.game.cells,
    responseData.game.over,
    {id: 1, email: 'knowonehasthisemail@email'},
    responseData.game.player_x
  )
  // console.log(store.game.FreshGame)
  // store.game.FreshGame.setPreviousCells(responseData.game.cells)
  // console.log('Previous from Create', store.game.FreshGame.getPreviousCells())
  $('#message').text(`Game Number: ${store.game.FreshGame.getId()}. Have your
  friend enter this number to join the game.`)
  // $('#display').append(`<p>Game id: ${store.game.FreshGame.getId()}
  // cells: ${store.game.FreshGame.getCells()}
  //   over: ${store.game.FreshGame.getOver()}
  //   </p><hr>`)
}

const onCreateMultiGameFailure = (responseData) => {
  // console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Created game failure!')
  // $('#message').addClass('success')
}

const onIndexGameSuccess = responseData => {
  // console.log('success', responseData)
  $('#message').text('')
  $('#game-master').addClass('hide')
  $('#all-settings').addClass('hide')
  $('#about').addClass('hide')
  $('#stats-table').removeClass('hide')

  const games = responseData.games
  let gameCount = 0
  games.forEach(games => {
    gameCount++
    $('#table-body').append(`
      <tr>
        <th scope="row">${games.id}</th>
        <td>${games.cells}</td>
        <td>${games.over === true ? 'unfinished' : 'game over'}</td>
        <td>${games.player_x.email}</td>
      </tr>
      `)
  })
  $('#table-body').append(`
      <tr>
        <th scope="row"></th>
        <td>Total Games</td>
        <td>${gameCount}</td>
      </tr>
  `)
}

const onIndexGameFailure = responseData => {
  // console.log('failure', responseData)
  $('#message').text('Failed to get all examples!')
  // $('#message').addClass('failure')
}

const onShowGameSuccess = responseData => {
  // console.log('success', responseData)
  $('#display').html('')
  // $('#message').text('Watching')

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

  // $('#message').append(`<p>Game id: ${store.game.FreshGame.getId()}
  // cells: ${store.game.FreshGame.getCells()}
  //   over: ${store.game.FreshGame.getOver()}
  //   whos turn: ${store.game.FreshGame.isPlayerTurn()}
  //   player_x: ${store.game.FreshGame.getPlayerXId()}
  //   </p><hr>`)
}

const onShowMultiGameSuccess = responseData => {
  // console.log(responseData)
  $('#display').html('')
  // $('#message').text('Watching')

  store.game.FreshGame.setCells(responseData.game.cells)
  store.game.FreshGame.getPreviousCells()
  // console.log('Current cells show', store.game.FreshGame.getCells())
  // console.log('Previous cells show', store.game.FreshGame.getPreviousCells())
  store.game.FreshGame.populate()
  store.game.FreshGame.isPlayerTurn()
  // store.game.FreshGame.diffValueCells(store.game.FreshGame.getCells(), store.game.FreshGame.getPreviousCells())
  // console.log(store.game.FreshGame.getDiffValue())
  store.game.FreshGame.onWinMulti(responseData.game.cells)
  store.game.FreshGame.isTie()

  // console.log('Previous Show', store.game.FreshGame.getPreviousCells())
  // console.log('Current Show', store.game.FreshGame.getCells())
  if (store.game.FreshGame.getIsWinner()) {
    $('#message').text(`Winner is ${store.game.FreshGame.getIsWinner()}`)
  }
  if (store.game.FreshGame.isTie()) {
    $('#message').text(`Tie Game!`)
  }
  // $('#display').append(`<p>Game id: ${store.game.FreshGame.getId()}
  // cells: ${store.game.FreshGame.getCells()}
  //   over: ${store.game.FreshGame.getOver()}
  //   whos turn: ${store.game.FreshGame.isPlayerTurn()}
  //   player_x: ${store.game.FreshGame.getPlayerXId()}
  //   </p><hr>`)
}

const onShowGameFailure = responseData => {
  // console.log('failure', responseData)
  $('#message').text('Failed to get a game!')
  $('#message').addClass('failure')
}
// ----------------------------
// update game
// ---------------------------

const onJoinGameSuccess = responseData => {
  $('#display').html('')
  $(window).scrollTop(0)
  $('#message').text('You are O')
  $('form').trigger('reset')

  store.game.FreshGame = new GameConstructor(
    responseData.game.id,
    responseData.game.cells,
    responseData.game.over,
    responseData.game.player_o,
    responseData.game.player_x
  )
  // console.log(store.game.FreshGame)
  // store.game.FreshGame.setPreviousCells(store.game.FreshGame.getCells())
  // console.log('Current cells', store.game.FreshGame.getCells())
  // console.log('Previous cells', store.game.FreshGame.getPreviousCells())

  // store.game.FreshGame.populate()
  if (!store.game.FreshGame.getOver()) {
    // console.log('watching')
    store.game.FreshGame.watch()
  }

  // $('#display').append(`<p>Game id: ${store.game.FreshGame.getId()}
  // cells: ${store.game.FreshGame.getCells()}
  //   over: ${store.game.FreshGame.getOver()}
  //   player_x: ${store.game.FreshGame.getPlayerXId()}
  //   </p><hr>`)
}

const onJoinGameFailure = responseData => {
  $('#message').html('')
  $('#message').text('Failed to Join Game!')
  $('form').trigger('reset')
}

const onUpdateGameSuccess = responseData => {
  $('#display').html('')
  // console.log('success', responseData)
  // console.log(store.game.FreshGame)
  const game = responseData.game

  store.game.FreshGame.setCells(game.cells)
  store.game.FreshGame.setPreviousCells(game.cells)
  store.game.FreshGame.setId(game.id)
  // store.game.FreshGame.setOver(game.over)
  store.game.FreshGame.isTie()
  store.game.FreshGame.onWin()
  // store.game.FreshGame.setPreviousCells(game.cells)
  if (store.game.FreshGame.getIsWinner()) {
    $('#message').text(`Winner is ${store.game.FreshGame.getIsWinner()}`)
  }
  if (store.game.FreshGame.isTie()) {
    $('#message').text(`Tie Game!`)
  }
  $(`#${store.game.FreshGame.getLastSquareId()}`).text(store.game.FreshGame.getLastCellValue())
  if (store.game.FreshGame.getLastCellValue() === 'x') {
    $(`#${store.game.FreshGame.getLastSquareId()}`).addClass('highlight-x')
  } else {
    $(`#${store.game.FreshGame.getLastSquareId()}`).addClass('highlight-o')
  }
  // $('#display').append(`<p>Game id: ${store.game.FreshGame.getId()} cells: ${store.game.FreshGame.getCells()}
  //   over: ${store.game.FreshGame.getOver()} player_x: ${store.game.FreshGame.getPlayerX()}
  //   </p><hr>`)
  // if (!store.game.FreshGame.getOver() && store.game.FreshGame.isPlayerTurn() === 'player x' &&
  //  store.game.FreshGame.getPlayerXId() !== store.user.id) {
  //   console.log('Player o Watching')
  //   store.game.FreshGame.watch()
  // } else if (!store.game.FreshGame.getOver() && store.game.FreshGame.isPlayerTurn() === 'player 0' &&
  //  store.game.FreshGame.getPlayerOId() !== store.user.id) {
  //   console.log('Player x Watching')
  //   store.game.FreshGame.watch()
  // }
}

const onUpdateMultiGameSuccess = responseData => {
  $('#display').html('')
  // console.log('success', responseData)
  // console.log(store.game.FreshGame)
  const game = responseData.game

  store.game.FreshGame.setCells(game.cells)
  store.game.FreshGame.setPreviousCells(game.cells)
  store.game.FreshGame.setId(game.id)
  // store.game.FreshGame.setOver(game.over)
  store.game.FreshGame.isTie()
  store.game.FreshGame.onWinMulti(game.cells)
  if (!store.game.FreshGame.getOver()) {
    // console.log('watching')
    store.game.FreshGame.watch()
  }
  // store.game.FreshGame.watch()
  // store.game.FreshGame.setPreviousCells(game.cells)
  if (store.game.FreshGame.getIsWinner()) {
    $('#message').text(`Winner is ${store.game.FreshGame.getIsWinner()}`)
  }
  if (store.game.FreshGame.isTie()) {
    $('#message').text(`Tie Game!`)
  }
  $(`#${store.game.FreshGame.getLastSquareId()}`).text(store.game.FreshGame.getLastCellValue())
  if (store.game.FreshGame.getLastCellValue() === 'x') {
    $(`#${store.game.FreshGame.getLastSquareId()}`).addClass('highlight-x')
  } else {
    $(`#${store.game.FreshGame.getLastSquareId()}`).addClass('highlight-o')
  }
  // $('#display').append(`<p>Game id: ${store.game.FreshGame.getId()} cells: ${store.game.FreshGame.getCells()}
  //   over: ${store.game.FreshGame.getOver()} player_x: ${store.game.FreshGame.getPlayerX()}
  //   </p><hr>`)
}

const onUpdateGameFailure = responseData => {
  // console.log('failure', responseData)
  $('#message').text('Failed to update game!')
  // $('#message').addClass('failure')
}
module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onCreateMultiGameSuccess,
  onCreateMultiGameFailure,
  onIndexGameSuccess,
  onIndexGameFailure,
  onShowGameSuccess,
  onShowMultiGameSuccess,
  onShowGameFailure,
  onJoinGameSuccess,
  onJoinGameFailure,
  onUpdateGameSuccess,
  onUpdateMultiGameSuccess,
  onUpdateGameFailure
}
