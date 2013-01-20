#!/bin/bash

# This is a script which creates/copies all of the files/folders you need for an optimized deployment of ember-wcms. The target folder is "build/".

# Get the absolute path of current directory.
DIR="$( cd "$( dirname "$0" )" && pwd )"

# Optimize both JS and CSS with Require.js's optimizer. Node.js needs to be installed for this to work.
node $DIR/r.js -o $DIR/build-js.js
node $DIR/r.js -o $DIR/build-css.js

# Copy all images to the build-folder.
rm -rf $DIR/build/img
cp -r $DIR/img $DIR/build/img

# Copy CKEditor into /build/lib/ckeditor.
rm -rf $DIR/build/lib
mkdir $DIR/build/lib
cp -r $DIR/lib/ckeditor $DIR/build/lib/ckeditor
