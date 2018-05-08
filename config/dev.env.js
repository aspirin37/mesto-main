'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  SITE_URL: '"https://mesto.a3technology.ru/"',
  NODE_ENV: '"development"',
  API_URL: '"https://api.a3technology.ru/"'
})
