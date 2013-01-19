#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"

node $DIR/r.js -o $DIR/build-js.js
node $DIR/r.js -o $DIR/build-css.js
cp -r $DIR/img $DIR/build/img