const generator = require('../model/generator')

module.exports = (bucket, path) =>
  generator('ocelot', 'myphotos').then((data) => data.forEach((annotation) => console.log(annotation.join(', '))))
