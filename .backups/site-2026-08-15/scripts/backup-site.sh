#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_ROOT="${BACKUP_ROOT:-$REPO_ROOT/.backups}"
LOCAL_BACKUP_PATH="${LOCAL_BACKUP_PATH:-}"
DATE_STAMP="$(date +%Y-%m-%d)"
LATEST_DIR="$BACKUP_ROOT/site-latest"
DATE_DIR="$BACKUP_ROOT/site-$DATE_STAMP"
ARCHIVE_PATH="$BACKUP_ROOT/site-$DATE_STAMP.tar.gz"

mkdir -p "$BACKUP_ROOT"

rm -rf "$LATEST_DIR"
mkdir -p "$LATEST_DIR"

rsync -a --delete \
  --exclude='.git' \
  --exclude='.backups' \
  --exclude='node_modules' \
  --exclude='.github/workflows' \
  "$REPO_ROOT"/ "$LATEST_DIR"/

rm -rf "$DATE_DIR"
mkdir -p "$DATE_DIR"
rsync -a --delete "$LATEST_DIR"/ "$DATE_DIR"/

tar -czf "$ARCHIVE_PATH" -C "$REPO_ROOT" \
  --exclude='.git' \
  --exclude='.backups' \
  --exclude='node_modules' \
  --exclude='.github/workflows' \
  .

if [[ -n "$LOCAL_BACKUP_PATH" ]]; then
  mkdir -p "$LOCAL_BACKUP_PATH"
  rsync -a --delete "$LATEST_DIR"/ "$LOCAL_BACKUP_PATH"/
  echo "Local backup mirrored to: $LOCAL_BACKUP_PATH"
fi

echo "Latest backup copied to: $LATEST_DIR"
echo "Daily snapshot copied to: $DATE_DIR"
echo "Archive created: $ARCHIVE_PATH"
