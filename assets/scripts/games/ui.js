'use strict'

const store = require('../store')

const onCreateGameSuccess = (responseData) => {
  console.log('success', responseData)
  // $('#message').removeClass()
  // $('#message').text('Created game successfully!')
  // $('#message').addClass('success')
  $('#landing').hide()
  store.currentGameID = responseData.game.id
  console.log(`current game id : ${store.currentGameID}`)
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

  const game = responseData.game
  store.currentGameID = responseData.game.id
  $('#display').append(`<p>Game id: ${game.id} cells: ${game.cells}
    over: ${game.over} player_x: ${game.player_x} player_o: ${game.player_o}
    </p><hr>`)
  // $('#message').removeClass()
  // $('#message').addClass('success')
}

const onShowGameFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Failed to get all examples!')
  // $('#message').addClass('failure')
}

const onUpdateGameSuccess = responseData => {
  $('#display').html('')
  console.log('success', responseData)
  const game = responseData.game

  $('#display').append(`<p>Game id: ${game.id} cells: ${game.cells}
    over: ${game.over} player_x: ${game.player_x} player_o: ${game.player_o}
    </p><hr>`)
}

const onUpdateGameFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Failed to get all examples!')
  // $('#message').addClass('failure')
}
module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onIndexGameSuccess,
  onIndexGameFailure,
  onShowGameSuccess,
  onShowGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure
}
