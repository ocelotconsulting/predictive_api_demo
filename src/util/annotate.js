const google = require('googleapis')
const vision = google.vision('v1')
const authorize = require('./authorize.js')

module.exports = (resource) => authorize().then((jwt) =>
  new Promise((resolve, reject) => {
    vision.images.annotate({'auth': jwt, 'resource': resource}, (err, data) =>
      err ? reject(err) : resolve(data)
    )
  })
)
