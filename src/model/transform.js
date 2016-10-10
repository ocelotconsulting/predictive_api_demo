const landmarks = ['LEFT_EYE', 'RIGHT_EYE', 'NOSE_TIP']
const meta = []

module.exports = (group) =>
  (data) => {
    let responses = data.responses.map((res, i) =>
      res.faceAnnotations.map((annotation) => {
        let landmarkData = [].concat.apply([], landmarks.map((landmark) => {
          let {x, y, z} = annotation.landmarks.find((l) => l.type === landmark).position
          return [x, y, z]
        }))
        let metaData = meta.map((m) => annotation[m])
        if (group) {
          return [group[i].name].concat(landmarkData).concat(metaData)
        } else {
          return landmarkData.concat(metaData)
        }
      })
    )

    let output = []
    responses.forEach((response) => response.forEach((annotation) => output.push(annotation)))
    return output
  }
