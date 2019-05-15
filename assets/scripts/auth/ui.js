const store = require('../store')

const onSignUpSuccess = responseData => {
  console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Signed up successfully!')
  // $('#message').addClass('success')
}

const onSignUpFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Signed up failed!')
  // $('#message').addClass('failure')
}

const onSignInSuccess = responseData => {
  console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Signed in successfully!')
  // $('#message').addClass('success')

  store.user = responseData.user
}

const onSignInFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Signed in failed!')
  // $('#message').addClass('failure')
}

const onSignOutSuccess = responseData => {
  console.log('success', responseData)
  // $('#message').removeClass()
  $('#message').text('Signed out successfully!')
  // $('#message').addClass('success')
}

const onSignOutFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Signed out failed!')
  // $('#message').addClass('failure')
}

const onChangePasswordSuccess = () => {
  console.log('success')
  // $('#message').removeClass()
  $('#message').text('Changed password successfully!')
  // $('#message').addClass('success')
}

const onChangePasswordFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Change password failed!')
  // $('#message').addClass('failure')
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
