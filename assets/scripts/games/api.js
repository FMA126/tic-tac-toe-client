'use strict'

const config = require('../config')
const store = require('../store')

const onCreateGame = () => {
  console.log('from api createGame')

  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    data: {},
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const onIndexGame = () => {
  console.log('from api indexGame')

  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const onShowGame = (formData) => {
  console.log('from api showGame')
  const id = formData.games.id

  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const onUpdateGame = (requestData) => {
  console.log('from api createGame')
  console.log('form data', requestData)
  const id = store.currentGameID

  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'PATCH',
    data: requestData,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  onCreateGame,
  onIndexGame,
  onShowGame,
  onUpdateGame
}
