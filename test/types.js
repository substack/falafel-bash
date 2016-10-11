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
    'word',
    'simple_command',
    'word',
    'parameter_expansion',
    'word',
    'word',
    'word',
    'parameter_expansion',
    'word',
    'simple_command',
    'complete_command'
  ])
  t.end()
})
