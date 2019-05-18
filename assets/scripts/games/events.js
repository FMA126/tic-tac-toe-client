'use strict'

const store = require('../store')

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
// -------------------------
// update game
// -------------------------

const onUpdate = event => {
  const dataIndex = $(`#${event.target.id}`).data('box-num')
  const requestData = {
    'game': {
      'cell': {
        'index': dataIndex,
        'value': 'something wrong'
      },
      'over': false
    }
  }
  // console.log(store.game.FreshGame.isPlayerTurn() === 'player x')
  if (store.game.FreshGame.isPlayerTurn() === 'player x') {
    store.game.FreshGame.setLastCellValue('x')
  } else {
    store.game.FreshGame.setLastCellValue('o')
  }
  event.preventDefault()
  store.game.FreshGame.setLastSquareId(event.target.id)
  store.game.FreshGame.setLastCellIndex(dataIndex)
  requestData.game.cell.value = store.game.FreshGame.getLastCellValue()

  console.log('update game pressed')
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
