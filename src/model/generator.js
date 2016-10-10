const bucketList = require('../util/bucket-list.js')
const annotate = require('../util/annotate.js')
const transform = require('./transform.js')
const nameRegex = /.*[$/](.*)-(\d*).jpg/

function group (array, size) {
  let groups = []
  for (let i = 0; i < array.length; i += size) {
    groups.push(array.slice(i, size + i))
  }
  return groups
}

function generatePhotoGroups (photos) {
  let items = photos.items.map((photo) => {
    let match = photo.name.match(nameRegex)
    if (match.length === 3) {
      return {'name': match[1], 'index': match[2], 'path': match.input}
    } else {
      return null
    }
  }).filter((obj) => obj !== null)
  return group(items, 10)
}

function createRequests (bucket, prefix, group) {
  return group.map((item) =>
    ({
      'features': [
        { 'type': 'FACE_DETECTION' }
      ],
      'image': {
        'source': {
          'gcsImageUri': `gs://${bucket}/${item.path}`
        }
      }
    }))
}

module.exports = (bucket, prefix) =>
  bucketList(bucket, prefix).then((photos) =>
    Promise.all(generatePhotoGroups(photos).map((group, i) => {
      let requests = createRequests(bucket, prefix, group)
      return annotate({'requests': requests}).then(transform(group))
    })).then((groups) => [].concat.apply([], groups))
  )
