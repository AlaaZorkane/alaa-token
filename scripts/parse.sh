#!/usr/bin/env bash

rm -fr artifacts/idl/
mkdir -p artifacts/idl/

if [ ! $(which fd) ]; then
    FILES=$(find programs/ -maxdepth 3 -name lib.rs)
else
    FILES=$(fd lib programs/ -e rs -c never)
fi

for PROGRAM in $FILES; do
    PROGRAM_NAME=$(dirname $PROGRAM | xargs dirname | xargs basename | tr '-' '_')
    echo "Parsing IDL for $PROGRAM_NAME"
    anchor idl parse --file $PROGRAM >artifacts/idl/$PROGRAM_NAME.json || {
        echo "Could not parse IDL"
        exit 1
    }
done
