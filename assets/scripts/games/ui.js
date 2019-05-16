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

module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure
}
