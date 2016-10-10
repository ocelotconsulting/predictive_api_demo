const google = require('googleapis')
const prediction = google.prediction('v1.6')
const authorize = require('../util/authorize.js')

module.exports = (id, project, storageDataLocation) =>
  authorize().then((jwt) =>
    new Promise((resolve, reject) => {
      let resource = {'id': id, 'storageDataLocation': storageDataLocation}
      prediction.trainedmodels.insert({ 'auth': jwt, 'project': project, 'resource': resource }, (err, data) => {
        err ? reject(err) : resolve(data)
      })
    })
  )
