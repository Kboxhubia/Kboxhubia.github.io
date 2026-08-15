#!/usr/bin/env bash
set -euo pipefail

TOPIC="${NTFY_TOPIC:-kboxhubia-backup}"
TITLE="${NTFY_TITLE:-Kboxhubia backup}"
MESSAGE="${1:-Backup completed.}"

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required to send notifications."
  exit 1
fi

curl -fsS \
  -H "Title: $TITLE" \
  -d "$MESSAGE" \
  "https://ntfy.sh/$TOPIC" >/dev/null

echo "Desktop notification sent to ntfy topic: $TOPIC"
