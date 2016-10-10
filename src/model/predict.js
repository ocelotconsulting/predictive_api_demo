const google = require('googleapis')
const prediction = google.prediction('v1.6')
const authorize = require('../util/authorize.js')

module.exports = (project, id, data) => authorize().then((jwt) => {
  return new Promise((resolve, reject) =>
    prediction.trainedmodels.predict({
      'auth': jwt,
      'project': project,
      'id': id,
      'resource':
      {
        'input': {
          'csvInstance': data
        }
      }
    }, (err, data) =>
      err ? reject(err) : resolve(data)
    )
  )
})
