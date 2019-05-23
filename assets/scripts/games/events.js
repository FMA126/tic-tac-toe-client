'use strict'

const store = require('../store')

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')

const onCreate = event => {
  event.preventDefault()
  // console.log('create game pressed')
  api.onCreateGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onCreateMulti = event => {
  event.preventDefault()
  $('.box').html('')
  // $('#game-board-single').addClass('hide-')
  $('#game-board-single').addClass('hide')
  $('#game-board-multi').removeClass('hide')
  $('#message').text('Multi-Player Game')

  // console.log('create game pressed')
  api.onCreateMultiGame()
    .then(ui.onCreateMultiGameSuccess)
    .catch(ui.onCreateMultiGameFailure)
}

const onIndex = event => {
  event.preventDefault()
  // const form = event.target
  // const formData = getFormFields(form)

  // console.log('create examples pressed')
  api.onIndexGame()
    .then(ui.onIndexGameSuccess)
    .catch(ui.onIndexGameFailure)
}

const onClearGames = () => {
  event.preventDefault()
  $('#display').addClass('hide')
}

const onShow = event => {
  event.preventDefault()
  // const form = event.target
  // const formData = getFormFields(form)

  // console.log('show games pressed')
  api.onShowGame()
    .then(ui.onShowMultiGameSuccess)
    .catch(ui.onShowGameFailure)
}

const onJoin = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // console.log('show games pressed')
  $('.box').html('')
  $('#game-board-single').addClass('hide')
  $('#game-board-multi').removeClass('hide')
  $('#message').text('Joined A Game!')
  api.onJoinGame(formData)
    .then(ui.onJoinGameSuccess)
    .catch(ui.onJoinGameFailure)
}
// -------------------------
// update game
// -------------------------

const onUpdateSingle = event => {
  const inner = $(`#${event.target.id}`).text()
  const dataIndex = $(`#${event.target.id}`).data('box-num')
  const requestData = {
    'game': {
      'cell': {
        'index': dataIndex,
        'value': 'something wrong'
      },
      'over': store.game.FreshGame.getOver()
    }
  }
  // console.log(store.game.FreshGame.isPlayerTurn() === 'player x')

  if (!inner && !store.game.FreshGame.getOver()) {
    if (store.game.FreshGame.isPlayerTurn() === 'player x') {
      store.game.FreshGame.setLastCellValue('x')
    } else {
      store.game.FreshGame.setLastCellValue('o')
    }
    event.preventDefault()
    store.game.FreshGame.setLastSquareId(event.target.id)
    store.game.FreshGame.setLastCellIndex(dataIndex)
    requestData.game.cell.value = store.game.FreshGame.getLastCellValue()

    // console.log('update game pressed')
    api.onUpdateGame(requestData)
      .then(ui.onUpdateGameSuccess)
      .catch(ui.onUpdateGameFailure)
  }
}

const onUpdateMulti = event => {
  const inner = $(`#${event.target.id}`).text()
  const dataIndex = $(`#${event.target.id}`).data('box-num')
  const requestData = {
    'game': {
      'cell': {
        'index': dataIndex,
        'value': 'something wrong'
      },
      'over': store.game.FreshGame.getOver()
    }
  }
  // console.log(store.game.FreshGame.isPlayerTurn() === 'player x')
  if (store.game.FreshGame.isPlayerTurn() === 'player x' &&
   store.game.FreshGame.getPlayerXId() === store.user.id) {
    if (!inner && !store.game.FreshGame.getOver()) {
      if (store.game.FreshGame.isPlayerTurn() === 'player x') {
        store.game.FreshGame.setLastCellValue('x')
      } else {
        store.game.FreshGame.setLastCellValue('o')
      }
      event.preventDefault()
      store.game.FreshGame.setLastSquareId(event.target.id)
      store.game.FreshGame.setLastCellIndex(dataIndex)
      requestData.game.cell.value = store.game.FreshGame.getLastCellValue()

      // console.log('update game pressed')
      store.game.FreshGame.setPreviousCells(store.game.FreshGame.getCells())
      api.onUpdateGame(requestData)
        .then(ui.onUpdateMultiGameSuccess)
        .catch(ui.onUpdateMultiGameFailure)
    }
  } else if (store.game.FreshGame.isPlayerTurn() === 'player o' &&
   store.game.FreshGame.getPlayerOId() === store.user.id) {
    if (!inner && !store.game.FreshGame.getOver()) {
      if (store.game.FreshGame.isPlayerTurn() === 'player x') {
        store.game.FreshGame.setLastCellValue('x')
      } else {
        store.game.FreshGame.setLastCellValue('o')
      }
      event.preventDefault()
      store.game.FreshGame.setLastSquareId(event.target.id)
      store.game.FreshGame.setLastCellIndex(dataIndex)
      requestData.game.cell.value = store.game.FreshGame.getLastCellValue()

      // console.log('update game pressed')
      store.game.FreshGame.setPreviousCells(store.game.FreshGame.getCells())
      api.onUpdateGame(requestData)
        .then(ui.onUpdateMultiGameSuccess)
        .catch(ui.onUpdateMultiGameFailure)
    }
  }
}

const gameOver = event => {
  event.preventDefault()
  const requestData = {
    'game': {
      'cell': {
        'index': store.game.FreshGame.getLastCellIndex(),
        'value': store.game.FreshGame.getLastCellValue()
      },
      'over': store.game.FreshGame.getOver()
    }
  }
  api.onUpdateGame(requestData)
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}
module.exports = {
  onCreate,
  onCreateMulti,
  onIndex,
  onClearGames,
  onShow,
  onUpdateSingle,
  onUpdateMulti,
  gameOver,
  onJoin
}
