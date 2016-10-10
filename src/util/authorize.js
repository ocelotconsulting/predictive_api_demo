const google = require('googleapis')
const key = require(process.env.GCLOUD_KEY_PATH)
const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/cloud-platform'], null)

module.exports = () =>
  new Promise((resolve, reject) =>
    jwtClient.authorize((err, tokens) =>
      err ? reject(err) : resolve(jwtClient)
    )
  )
