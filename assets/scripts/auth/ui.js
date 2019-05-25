'use strict'

const store = require('../store')

const switchSignInUp = () => {
  if ($('#sign-up').attr('class') === 'hide') {
    $('#sign-in').addClass('hide')
    $('#sign-up').removeClass('hide')
    $('#sign-up-link').addClass('hide')
    $('#back-sign-in').removeClass('hide')
  } else {
    $('#sign-in').removeClass('hide')
    $('#sign-up').addClass('hide')
    $('#sign-up-link').removeClass('hide')
    $('#back-sign-in').addClass('hide')
  }
}

const onSignUpSuccess = responseData => {
  // console.log('success', responseData)
  store.signUpPassed = true
  $('form').trigger('reset')
  $('#emailHelp1').removeClass('attention')
  $('#emailHelp1').text("We'll never share your email with anyone else.")
  $('#message').text('Signed up successfully! Please sign in')
}

const onSignUpFailure = responseData => {
  // console.log('failure', responseData)
  store.signUpPassed = false
  $('form').trigger('reset')
  $('#emailHelp1').text('Email already exists or passwords do not match')
  $('#emailHelp1').addClass('attention')
  $('#game-board-section').removeClass('hide')
}

const onSignInSuccess = responseData => {
  // console.log('success', responseData)
  store.user = responseData.user
  $('#emailHelp2').removeClass('attention')
  $('#emailHelp2').text("We'll never share your email with anyone else.")
  $('form').trigger('reset')
  $('#landing-auth').addClass('hide')
  $('#game-controls').removeClass('hide')
}

const onSignInFailure = responseData => {
  // console.log('failure', responseData)
  $('form').trigger('reset')
  $('#emailHelp2').text('Email already exists or passwords do not match')
  $('#emailHelp2').addClass('attention')
}

const onSignOutSuccess = responseData => {
  // console.log('success', responseData)
  $('#message').text('Signed out successfully!')
  $('#landing-auth').removeClass('hide')
  $('#game-controls').addClass('hide')
  $('#game-board-single').addClass('hide')
  $('#game-board-multi').addClass('hide')
  $('form').trigger('reset')
}

const onSignOutFailure = responseData => {
  $('#message').text('Signed out failed!')
  $('form').trigger('reset')
}

const onChangePasswordSuccess = () => {
  $('#message').text('Changed password successfully!')
  $('form').trigger('reset')
}

const onChangePasswordFailure = responseData => {
  $('#message').text('Change password failed!')
  $('form').trigger('reset')
}

module.exports = {
  switchSignInUp,
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
