#!/bin/bash

function command_exists {
  command -v "$@" > /dev/null 2>&1
}

function command_sudo_or_reg {
  if command_exists sudo;
  then
    sudo -H $@
  else
    $@
  fi
}
