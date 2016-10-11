var parse = require('bash-parser')

module.exports = function (src, opts, fn) {
  if (typeof opts === 'function') {
    fn = opts
    opts = {}
  }
  if (src && typeof src === 'object' && src.constructor.name === 'Buffer') {
    src = src.toString()
  }
  if (typeof src !== 'string') src = String(src)
  var lines = src.split('\n')
  var offset = 0, offsets = []
  lines.forEach(function (line) {
    offsets.push(offset)
    offset += line.length + 1
  })
  var ast = parse(src, { insertLOC: true })
  var result = {
    chunks : src.split(''),
    toString : function () { return result.chunks.join('') },
    inspect : function () { return result.toString() }
  }
  ;(function walk (node, parent) {
    insertHelpers(offsets, node, parent, result.chunks)
    Object.keys(node).forEach(function (key) {
      if (key === 'parent') return
      var child = node[key]
      if (Array.isArray(child)) {
        child.forEach(function (c) {
          if (c && typeof c.type === 'string') {
            walk(c, node)
          }
        })
      } else if (child && (typeof child.type === 'string' || child.loc)) {
        if (!child.type) child.type = key
        walk(child, node)
      }
    })
    fn(node)
  })(ast, undefined)
  return result
}
 
function insertHelpers (offsets, node, parent, chunks) {
  node.parent = parent
  node.source = function () {
    return chunks.slice(node.start, node.end).join('')
  }
  if (node.loc) {
    node.start = offsets[node.loc.startLine] + node.loc.startColumn
    node.end = offsets[node.loc.endLine] + node.loc.endColumn + 1
    delete node.loc
  }
  if (node.update && typeof node.update === 'object') {
    var prev = node.update
    Object.keys(prev).forEach(function (key) {
      update[key] = prev[key]
    })
    node.update = update
  } else {
    node.update = update
  }
  function update (s) {
    chunks[node.start] = s
    for (var i = node.start + 1; i < node.end; i++) {
      chunks[i] = ''
    }
  }
}
