const google = require('googleapis')
const prediction = google.prediction('v1.6')
const authorize = require('../util/authorize.js')

module.exports = (id, project) => authorize().then((jwt) =>
  new Promise((resolve, reject) =>
    prediction.trainedmodels.get({ 'auth': jwt, 'project': project, 'id': id }, (err, data) =>
      err ? reject(err) : resolve(data)
    )
  )
)
