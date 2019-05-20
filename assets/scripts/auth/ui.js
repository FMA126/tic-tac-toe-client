'use strict'

const store = require('../store')

const onSignUpSuccess = responseData => {
  // console.log('success', responseData)
  // $('#message').removeClass()
  // $('#message').text('Signed up successfully!')
  $('#message').text('Signed up successfully! Please sign in')
  $('form').trigger('reset')
}

const onSignUpFailure = responseData => {
  // console.log('failure', responseData)
  $('#message').text('Signed up failed! Please sign up again')
  // $('#message').addClass('failure')
  $('form').trigger('reset')
}

const onSignInSuccess = responseData => {
  // console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('')
  $('#message').text('Signed in successfully!')
  // $('#message').addClass('success')
  $('form').trigger('reset')
  $('#landing').attr('class', '')
  $('#landing').addClass('hide')
  // $('footer').removeClass('hide')
  $('#game-controls').removeClass('hide')
  $('main').addClass('main-height-eighty')
  store.user = responseData.user
  // wait to clear and load the game board
  //  setTimeout(loadGameBoard, 2000)
  // $('main').html('')
  // $('main').html(gameBoard.gameLayout)
}

const onSignInFailure = responseData => {
  // console.log('failure', responseData)
  $('#message').text('Signed in failed!')
  // $('#message').addClass('failure')
  $('form').trigger('reset')
}

const onSignOutSuccess = responseData => {
  // console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Signed out successfully!')
  // $('#message').addClass('success')
  $('#landing').removeClass('hide')
  $('#game-controls').addClass('hide')
  $('#game-board-single').addClass('visabil')
  $('#game-board-multi').addClass('visabil')

  $('form').trigger('reset')
}

const onSignOutFailure = responseData => {
  // console.log('failure', responseData)
  $('#message').text('Signed out failed!')
  // $('#message').addClass('failure')
  $('form').trigger('reset')
}

const onChangePasswordSuccess = () => {
  // console.log('success')
  // $('#message').removeClass()
  $('#message').text('Changed password successfully!')
  // $('#message').addClass('success')
  $('form').trigger('reset')
}

const onChangePasswordFailure = responseData => {
  // console.log('failure')
  $('#message').text('Change password failed!')
  // $('#message').addClass('failure')
  $('form').trigger('reset')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
