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

module.exports = {
  onCreateGame
}
