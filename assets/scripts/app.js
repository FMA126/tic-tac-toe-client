'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events')
const gameEvents = require('./games/events')

$(() => {
  // your JS code goes here
  // Sign in listeners
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  // create game on sign in
  // setTimeout(() => $('#sign-in').on('submit', gameEvents.onCreate), 1000)
  // create game on sign in
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#change-password').on('submit', authEvents.onChangePassword)
  // Game control listeners
  $('#games-create').on('submit', gameEvents.onCreate)
  $('#games-create-multi').on('submit', gameEvents.onCreateMulti)
  // $('#box-0').on('click', gameEvents.onUpdate)
  $('#games-index').on('submit', gameEvents.onIndex)
  $('#games-show').on('submit', gameEvents.onShow)
  $('#games-join').on('submit', gameEvents.onJoin)
  // Game play listeners
  $('#games-update').on('submit', gameEvents.onUpdate)
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
