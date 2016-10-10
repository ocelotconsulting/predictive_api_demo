const train = require('../model/train.js')
const trainStatus = require('../model/train-status.js')

// const id = 'recognition-demo'
// const project = '1075099751658'
// const storageDataLocation = 'ocelot/models/model.csv'

module.exports = (projectId, modelId, storageDataLocation) =>
  train(modelId, projectId, storageDataLocation).then((res) => {
    console.log('Submitted model for training')
    let recurse = () =>
      setTimeout(() => {
        trainStatus(modelId, projectId).then((status) => {
          if (status.trainingStatus === 'RUNNING') {
            console.log(`Running...`)
            recurse()
          } else {
            console.log(JSON.stringify(status, null, 2))
          }
        })
      }, 2000)
    recurse()
  })
