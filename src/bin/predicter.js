const fs = require('fs')
const annotate = require('../util/annotate.js')
const transform = require('../model/transform.js')
const predict = require('../model/predict.js')

// const fileName = '/Users/chris/Pictures/chris4.jpg'
// const project = '1075099751658'
// const id = 'recognition-demo'

module.exports = (projectId, modelId, localPath) =>
  fs.readFile(localPath, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let image = new Buffer(data).toString('base64')
      let request = {
        'features': [
          { 'type': 'FACE_DETECTION' }
        ],
        'image': {
          'content': image
        }
      }
      annotate({'requests': [request]})
      .then((res) => transform()(res))
      .then((res) => predict(projectId, modelId, res[0]))
      .then((res) => console.log(JSON.stringify(res, null, 2)))
    }
  })
