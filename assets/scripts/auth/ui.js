const store = require('../store')

const onSignUpSuccess = responseData => {
  console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Signed up successfully!')
  // $('#message').addClass('success')
  $('form').trigger('reset')
}

const onSignUpFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Signed up failed!')
  // $('#message').addClass('failure')
  $('form').trigger('reset')
}

const onSignInSuccess = responseData => {
  console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Signed in successfully!')
  // $('#message').addClass('success')
  $('form').trigger('reset')

  store.user = responseData.user
}

const onSignInFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Signed in failed!')
  // $('#message').addClass('failure')
  $('form').trigger('reset')
}

const onSignOutSuccess = responseData => {
  console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Signed out successfully!')
  // $('#message').addClass('success')
  $('form').trigger('reset')
}

const onSignOutFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Signed out failed!')
  // $('#message').addClass('failure')
  $('form').trigger('reset')
}

const onChangePasswordSuccess = () => {
  console.log('success')
  // $('#message').removeClass()
  $('#message').text('Changed password successfully!')
  // $('#message').addClass('success')
  $('form').trigger('reset')
}

const onChangePasswordFailure = responseData => {
  console.log('failure')
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
