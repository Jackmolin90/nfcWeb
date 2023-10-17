'use strict'
const url= require("../static/publicConfigInit")
module.exports = {
  NODE_ENV: '"production"',
  BASE_API: '"[#TEMP#]"',
  BASE_URL:url.BASE_URL,
  USER_URL:url.USER_URL,
}
