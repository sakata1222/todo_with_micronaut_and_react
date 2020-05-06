#!/bin/bash -eu

uasge() {
  echo "Usage: $0 -p <port>"
}

port=""

parseArg() {
  for OPT in "$@"
  do
    case $OPT in
      "-p")
        port=$2
        shift
        ;;
    esac
  done
}

validateArg() {
  if [ -z "${port}" ]; then
    uasge
    exit 1
  fi
}

run() {
  echo "The application will now start..."
  docker run --name todo-app -v todo-db:/opt/todo/database --rm -p "${port}":8080 todo-app
}

parseArg $@
validateArg
run
