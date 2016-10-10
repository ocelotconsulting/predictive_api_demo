const google = require('googleapis')
const storage = google.storage('v1')
const authorize = require('./authorize.js')

module.exports = (bucket, prefix) => authorize().then((jwt) =>
  new Promise((resolve, reject) => {
    storage.objects.list({'auth': jwt, 'bucket': bucket, 'prefix': prefix}, (err, data) =>
      err ? reject(err) : resolve(data)
    )
  })
)
