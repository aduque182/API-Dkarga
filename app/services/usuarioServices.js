
'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../../config/config')


function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(2, 'minutes').unix()

  }
  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {

  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN)
      resolve(payload.sub)
      
    } catch (err) {
      reject({
        status: 401,
        message: err.message
      })
    
    }

  })
  return decoded
}


module.exports = {
  createToken,
  decodeToken
}
