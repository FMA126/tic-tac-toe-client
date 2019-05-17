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
  // Game listeners
  $('#games-create').on('submit', gameEvents.onCreate)
  $('#games-index').on('submit', gameEvents.onIndex)
  $('#games-show').on('submit', gameEvents.onShow)
  $('#games-update').on('submit', gameEvents.onUpdate)
})
