#!/bin/bash

TS=`/bin/date "+%Y-%m-%d-%H.%M.%S"`

ROOT="/vagrant/tmp"
mkdir -p "$ROOT"
FILENAME="backup-$TS"
if [ "$1" != "" ]; then
  FILENAME="$FILENAME-$1"
fi
FILENAME="$FILENAME.sql.gz"

mysqldump -u root mydb | gzip -c > "$ROOT/$FILENAME"
