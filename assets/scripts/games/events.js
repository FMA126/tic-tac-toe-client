'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')

const onCreate = event => {
  event.preventDefault()
  // const form = event.target
  // const formData = getFormFields(form)

  console.log('create examples pressed')
  api.onCreateGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onIndex = event => {
  event.preventDefault()
  // const form = event.target
  // const formData = getFormFields(form)

  console.log('create examples pressed')
  api.onIndexGame()
    .then(ui.onIndexGameSuccess)
    .catch(ui.onIndexGameFailure)
}

const onShow = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  console.log('show games pressed')
  api.onShowGame(formData)
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}

const onUpdate = event => {
  event.preventDefault()
  const requestData = {
    'game': {
      'cell': {
        'index': 0,
        'value': 'x'
      },
      'over': false
    }
  }
  console.log('update examples pressed')
  api.onUpdateGame(requestData)
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}
module.exports = {
  onCreate,
  onIndex,
  onShow,
  onUpdate
}
