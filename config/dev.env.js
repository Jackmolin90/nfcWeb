'use strict'
const url= require("../static/publicConfigInit")
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  BASE_API: '"[#TEMP#]"',
  USER_URL: url.USER_URL,
  BASE_URL: url.BASE_URL
})
