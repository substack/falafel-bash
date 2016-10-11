var test = require('tape')
var falafel = require('../')

var src = `
  #!/bin/bash
  sudo echo sudo sudo sudo
  sudo rmmod r8169 && sudo modprobe r8169
  sudo pkill wpa_supplicant
  sudo service networking restart

  echo you can mention sudo
  echo you can even start with \\
  sudo on its own line yay
`.trim().replace(/^\s+/mg,'')

var expected = `
  #!/bin/bash
  SUDO echo sudo sudo sudo
  SUDO rmmod r8169 && SUDO modprobe r8169
  SUDO pkill wpa_supplicant
  SUDO service networking restart

  echo you can mention sudo
  echo you can even start with \\
  sudo on its own line yay
`.trim().replace(/^\s+/mg,'')

test('sudo', function (t) {
  var output = falafel(src, function (node) {
    if (node.type === 'simple_command' && node.name.text === 'sudo') {
      node.name.update('SUDO')
    }
  }).toString()
  t.equal(output, expected)
  t.end()
})
