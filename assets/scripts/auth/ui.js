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

const onShowSettingsSuccess = () => {
  $('#game-master').addClass('hide')
  $('#all-settings').removeClass('hide')
}

const onGameReturnSuccess = () => {
  $('#passwordHelp').addClass('hide')
  $('#game-master').removeClass('hide')
  $('#all-settings').addClass('hide')
}

const onShowAboutSuccess = () => {
  $('#about')
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
  $('#message').text('')
  $('.dots').attr('data-toggle', 'modal')
  $('.dots').addClass('pointer')
  $('#landing-auth').addClass('hide')
  $('#game-master').removeClass('hide')
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
  $('.dots').attr('data-toggle', '')
  $('.dots').removeClass('pointer')
  $('#game-master').addClass('hide')
  $('form').trigger('reset')
}

const onSignOutFailure = responseData => {
  $('#message').text('Signed out failed!')
  $('form').trigger('reset')
}

const onChangePasswordSuccess = () => {
  $('#passwordHelp').removeClass('hide')
  $('#passwordHelp').text('Password changed successfully.')
  $('#passwordHelp').removeClass('attention')
  $('form').trigger('reset')
}

const onChangePasswordFailure = responseData => {
  $('#passwordHelp').removeClass('hide')
  $('#passwordHelp').text('Please re-enter current password.')
  $('#passwordHelp').addClass('attention')
  $('form').trigger('reset')
}

module.exports = {
  switchSignInUp,
  onShowSettingsSuccess,
  onGameReturnSuccess,
  onShowAboutSuccess,
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
