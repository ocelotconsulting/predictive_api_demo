const generator = require('../model/generator')

module.exports = (bucket, path) =>
  generator(bucket, path).then((data) => data.forEach((annotation) => console.log(annotation.join(', '))))
