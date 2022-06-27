const path = require('path')

const srcPath = path.join(__dirname, '..', 'src')
const publicPath = path.join(__dirname, '..', 'public')
const distPath = path.join(__dirname, '..', 'dist')

module.exports = {
  srcPath,
  publicPath,
  distPath
}