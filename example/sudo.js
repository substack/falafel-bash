var falafel = require('../')
var fs = require('fs')
var src = fs.readFileSync('rewire.sh','utf8')

console.log(falafel(src, function (node) {
  if (node.type === 'Command' && node.name.text === 'sudo') {
    node.name.update('SUDO')
  }
}).toString())
