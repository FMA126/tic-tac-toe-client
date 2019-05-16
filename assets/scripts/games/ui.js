'use strict'

const onCreateGameSuccess = (responseData) => {
  console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Created game successfully!')
  // $('#message').addClass('success')
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
module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onIndexGameSuccess,
  onIndexGameFailure
}
