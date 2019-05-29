'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events')
const gameEvents = require('./games/events')

$(() => {
  $('#sign-up-link').on('click', authEvents.onSwitchSignInUp)
  $('#back-sign-in').on('click', authEvents.onSwitchSignInUp)
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#game-stats-li').on('click', gameEvents.onIndex)
  $('#settings-li').on('click', authEvents.onShowSettings)
  $('#about-li').on('click', authEvents.onShowAbout)
  $('#settings-return-game').on('click', authEvents.onGameReturn)
  $('#about-return-game').on('click', authEvents.onGameReturn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#change-password').on('submit', authEvents.onChangePassword)
  // Game control listeners
  $('#games-create').on('submit', gameEvents.onCreate)
  $('#games-create-multi').on('submit', gameEvents.onCreateMulti)
  // $('#box-0').on('click', gameEvents.onUpdate)
  // $('#games-index').on('submit', gameEvents.onIndex)
  // $('#clear-games-index').on('submit', gameEvents.onClearGames)
  // $('#games-show').on('submit', gameEvents.onShow)
  $('#games-join').on('submit', gameEvents.onJoin)
  // Game play listeners
  // $('#games-update').on('submit', gameEvents.onUpdate)
  $('#box-0').on('click', gameEvents.onUpdateSingle)
  $('#box-1').on('click', gameEvents.onUpdateSingle)
  $('#box-2').on('click', gameEvents.onUpdateSingle)
  $('#box-3').on('click', gameEvents.onUpdateSingle)
  $('#box-4').on('click', gameEvents.onUpdateSingle)
  $('#box-5').on('click', gameEvents.onUpdateSingle)
  $('#box-6').on('click', gameEvents.onUpdateSingle)
  $('#box-7').on('click', gameEvents.onUpdateSingle)
  $('#box-8').on('click', gameEvents.onUpdateSingle)
  $('#box-0-m').on('click', gameEvents.onUpdateMulti)
  $('#box-1-m').on('click', gameEvents.onUpdateMulti)
  $('#box-2-m').on('click', gameEvents.onUpdateMulti)
  $('#box-3-m').on('click', gameEvents.onUpdateMulti)
  $('#box-4-m').on('click', gameEvents.onUpdateMulti)
  $('#box-5-m').on('click', gameEvents.onUpdateMulti)
  $('#box-6-m').on('click', gameEvents.onUpdateMulti)
  $('#box-7-m').on('click', gameEvents.onUpdateMulti)
  $('#box-8-m').on('click', gameEvents.onUpdateMulti)
  // if the modal is displayed send API that game
  // is over
})
