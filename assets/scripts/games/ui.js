'use strict'

const store = require('../store')
const gameEngine = require('./game-engine')
const GameConstructor = gameEngine.Gameboard

const onCreateGameSuccess = (responseData) => {
  console.log('success', responseData)
  $('#display').html('')

  store.game.FreshGame = new GameConstructor(
    responseData.game.id,
    responseData.game.cells,
    responseData.game.over,
    responseData.game.player_o,
    responseData.game.player_x
  )
  console.log(store.game.FreshGame)

  $('#display').append(`<p>Game id: ${store.game.FreshGame.getId()}
  cells: ${store.game.FreshGame.getCells()}
    over: ${store.game.FreshGame.getOver()}
    player_x: ${store.game.FreshGame.getPlayerX()}
    player_o: ${store.game.FreshGame.getPlayerO()}
    </p><hr>`)
}

const onCreateGameFailure = (responseData) => {
  console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Created game failure!')
  // $('#message').addClass('success')
}

const onIndexGameSuccess = responseData => {
  console.log('success', responseData)
  $('#display').html('')

  const games = responseData.games
  games.forEach(games => {
    $('#display').append(`<p>id: ${games.id} over: ${games.over}
      player_o: ${games.player_o} player_x: ${games.player_x.id}--${games.player_x.email}</p><hr>`)
  })
  // $('#message').removeClass()
  // $('#message').addClass('success')
}

const onIndexGameFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Failed to get all examples!')
  // $('#message').addClass('failure')
}

const onShowGameSuccess = responseData => {
  console.log('success', responseData)
  $('#display').html('')
  store.game.FreshGame.setCells(responseData.game.cells)
  // console.log(store.game.FreshGame.getCells())
  store.game.FreshGame.populate()
  store.game.FreshGame.isPlayerTurn()
  store.game.FreshGame.onWin()
  store.game.FreshGame.isTie()


  $('#display').append(`<p>Game id: ${store.game.FreshGame.getId()}
  cells: ${store.game.FreshGame.getCells()}
    over: ${store.game.FreshGame.getOver()}
    whos turn: ${store.game.FreshGame.isPlayerTurn()}
    player_x: ${store.game.FreshGame.getPlayerX()}
    player_o: ${store.game.FreshGame.getPlayerO()}
    </p><hr>`)
}

const onShowGameFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Failed to get a game!')
  $('#message').addClass('failure')
}
// ----------------------------
// update game
// ---------------------------

const onJoinGameSuccess = responseData => {
  $('#display').html('')

  store.game.FreshGame = new GameConstructor(
    responseData.game.id,
    responseData.game.cells,
    responseData.game.over,
    responseData.game.player_o,
    responseData.game.player_x
  )
  console.log(store.game.FreshGame)

  store.game.FreshGame.populate()

  $('#display').append(`<p>Game id: ${store.game.FreshGame.getId()}
  cells: ${store.game.FreshGame.getCells()}
    over: ${store.game.FreshGame.getOver()}
    player_x: ${store.game.FreshGame.getPlayerX()}
    player_o: ${store.game.FreshGame.getPlayerO()}
    </p><hr>`)
}

const onJoinGameFailure = responseData => {
  $('#display').html('')
}

const onUpdateGameSuccess = responseData => {
  $('#display').html('')
  console.log('success', responseData)
  console.log(store.game.FreshGame)
  const game = responseData.game

  store.game.FreshGame.setCells(game.cells)
  store.game.FreshGame.setId(game.id)
  // store.game.FreshGame.setOver(game.over)
  store.game.FreshGame.isTie()
  store.game.FreshGame.onWin()

  $(`#${store.game.FreshGame.getLastSquareId()}`).text(store.game.FreshGame.getLastCellValue())
  $('#display').append(`<p>Game id: ${store.game.FreshGame.getId()} cells: ${store.game.FreshGame.getCells()}
    over: ${store.game.FreshGame.getOver()} player_x: ${store.game.FreshGame.getPlayerX()} player_o: ${store.game.FreshGame.getPlayerO()}
    </p><hr>`)
}

const onUpdateGameFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Failed to update game!')
  // $('#message').addClass('failure')
}
module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onIndexGameSuccess,
  onIndexGameFailure,
  onShowGameSuccess,
  onShowGameFailure,
  onJoinGameSuccess,
  onJoinGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure
}
