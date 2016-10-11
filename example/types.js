var falafel = require('../')
var fs = require('fs')
var src = fs.readFileSync('rewire.sh','utf8')

falafel(src, function (node) {
  console.log(node.type)
})
