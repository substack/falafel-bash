# falafel-bash

transform bash shell ast on a recursive walk

This module is like [falafel][1], but for bash instead of javascript.

[1]: https://npmjs.com/package/falafel

# example

given a shell script:

``` sh
#!/bin/bash
sudo rmmod r8169 && sudo modprobe r8169
sudo pkill wpa_supplicant
sudo service networking restart

echo you can mention sudo
echo you can even start with \
sudo on its own line yay
```

we can rewrite `sudo` command to `SUDO`:

``` js
var falafel = require('falafel-bash')
var fs = require('fs')
var src = fs.readFileSync('rewire.sh','utf8')

console.log(falafel(src, function (node) {
  if (node.type === 'simple_command' && node.name.text === 'sudo') {
    node.name.update('SUDO')
  }
}).toString())
```

output:

```
#!/bin/bash
SUDO rmmod r8169 && SUDO modprobe r8169
SUDO pkill wpa_supplicant
SUDO service networking restart

echo you can mention sudo
echo you can even start with \
sudo on its own line yay
```

# api

``` js
var falafel = require('falafel')
```

## var output = falafel(src, fn)

Walk the bash source code string `src` with a function `fn(node)`.

Nodes always have a `node.type` and may have other properties.

## var str = node.source()

Query the source string for the current node.

## node.update(str)

Update the current node's content by a string `str`.

## output.toString()

Get a string from the transformed input. You can call `.toString()` sometime in
the future if you have 

# install

```
npm install falafel-bash
```

# license

BSD
