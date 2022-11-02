const fs = require('fs')
const pkg = require('./package.json')
const config = require('./atlassian-connect.template.json')

config.version = pkg.version
config.baseUrl = process.env.APP_BASE_URL

const writeStream = fs.createWriteStream('atlassian-connect.json')
writeStream.write(JSON.stringify(config))
writeStream.end()
