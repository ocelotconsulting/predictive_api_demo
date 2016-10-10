#!/usr/bin/env node

if (!process.env.GCLOUD_KEY_PATH) {
  console.log('GCLOUD_KEY_PATH should be set to your key file location')
  process.exit()
}

const args = process.argv
const exporter = require('./exporter')
const trainer = require('./trainer')
const predicter = require('./predicter')

if (args.length < 3) {
  console.log('Available commands are export, train and predict')
  process.exit()
}

let command = args[2]
switch (command) {
  case 'export':
    // bucket, folder
    if (args.length < 5) {
      console.log('Use export <bucket> <folder>')
      process.exit()
    }
    exporter(args[3], args[4])
    break
  case 'train':
    // projectid, modelid, csv bucket path
    if (args.length < 6) {
      console.log('Use export <projectId> <modelId> <trainingFileBucketPath>')
      process.exit()
    }
    trainer(args[3], args[4], args[5])
    break
  case 'predict':
    if (args.length < 6) {
      console.log('Use export <projectId> <modelId> <localImagePath>')
      process.exit()
    }
    // projectid, modelid, local file path
    predicter(args[3], args[4], args[5])
    break
  default:
    console.log('Available commands are export, train and predict')
}
