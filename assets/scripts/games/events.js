'use strict'

const api = require('./api')
const ui = require('./ui')

const onCreate = event => {
  event.preventDefault()
  // const form = event.target
  // const formData = getFormFields(form)

  console.log('create examples pressed')
  api.onCreateGame()
    .then(ui.onCreateExampleSuccess)
    // .catch(ui.onCreateExampleFailure)
}

module.exports = {
  onCreate
}
