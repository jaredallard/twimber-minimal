#!/usr/bin/env bash

if [ -f ../nwjs-v**/nw ]; then
  . ../nwjs-v**/nw .
else
  if which nw > /dev/null; then
    nw .
  else
    echo "nw.js was not found"
  fi
fi
