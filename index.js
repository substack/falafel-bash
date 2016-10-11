var parse = require('bash-parser')
var traverse = require('bash-ast-traverser')


module.exports = function (src, opts, fn) {
  if (typeof opts === 'function') {
    fn = opts
    opts = {}
  }
  if (src && typeof src === 'object' && src.constructor.name === 'Buffer') {
    src = src.toString()
  }
  if (typeof src !== 'string') src = String(src)

  var ast = parse(src, { insertLOC: true })
  var result = {
    chunks : src.split(''),
    toString : function () { return result.chunks.join('') },
    inspect : function () { return result.toString() }
  }

  traverse(ast, {
    defaultMethod(node, parent, ast, visitor) {
      insertHelpers(node, parent, result.chunks)
      fn(node)
    }
  });

  return result
}

function insertHelpers (node, parent, chunks) {
  node.parent = parent
  if (node.loc) {
    node.start = node.loc.start.char
    node.end = node.loc.end.char + 1
    delete node.loc
  }
  node.source = function () {
    return chunks.slice(node.start, node.end).join('')
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
