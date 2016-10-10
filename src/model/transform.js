const landmarks = ['LEFT_EYE', 'RIGHT_EYE', 'LEFT_OF_LEFT_EYEBROW', 'RIGHT_OF_LEFT_EYEBROW', 'LEFT_OF_RIGHT_EYEBROW', 'RIGHT_OF_RIGHT_EYEBROW', 'MIDPOINT_BETWEEN_EYES', 'NOSE_TIP', 'UPPER_LIP', 'LOWER_LIP', 'MOUTH_LEFT', 'MOUTH_RIGHT', 'MOUTH_CENTER', 'NOSE_BOTTOM_RIGHT', 'NOSE_BOTTOM_LEFT', 'NOSE_BOTTOM_CENTER', 'LEFT_EYE_TOP_BOUNDARY', 'LEFT_EYE_RIGHT_CORNER', 'LEFT_EYE_BOTTOM_BOUNDARY',
  'LEFT_EYE_LEFT_CORNER', 'LEFT_EYE_PUPIL', 'RIGHT_EYE_TOP_BOUNDARY', 'RIGHT_EYE_RIGHT_CORNER', 'RIGHT_EYE_BOTTOM_BOUNDARY', 'RIGHT_EYE_LEFT_CORNER', 'RIGHT_EYE_PUPIL', 'LEFT_EYEBROW_UPPER_MIDPOINT', 'RIGHT_EYEBROW_UPPER_MIDPOINT', 'LEFT_EAR_TRAGION', 'RIGHT_EAR_TRAGION', 'FOREHEAD_GLABELLA', 'CHIN_GNATHION', 'CHIN_LEFT_GONION', 'CHIN_RIGHT_GONION']
const meta = ['rollAngle', 'panAngle', 'tiltAngle', 'detectionConfidence', 'landmarkingConfidence']

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
