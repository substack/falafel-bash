var test = require('tape')
var falafel = require('../')

var src = `
  #!/bin/bash
  cal
  budo $* -- -r $dir/regl.js:regl
`.trim().replace(/^\s+/mg,'')

test('types', function (t) {
  var types = []
  falafel(src, function (node) {
    types.push(node.type)
  })
  t.deepEqual(types, [
    'Word',
    'Command',
    'Word',
    'ParameterExpansion',
    'Word',
    'Word',
    'Word',
    'ParameterExpansion',
    'Word',
    'Command',
    'Script'
  ])
  t.end()
})
