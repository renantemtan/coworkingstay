#!/usr/bin/env sh
# Daily PostgreSQL backup script for CoWorkingStay VPS
# Example crontab (runs daily at 2:30 AM PHT / 18:30 UTC):
# 30 18 * * * /opt/coworkingstay/scripts/backup-db.sh >> /var/log/cws-backup.log 2>&1

set -eu

BACKUP_DIR="${BACKUP_DIR:-/opt/coworkingstay/backups}"
CONTAINER_NAME="${CONTAINER_NAME:-coworkingstay-db}"
DB_USER="${POSTGRES_USER:-coworkingstay}"
DB_NAME="${POSTGRES_DB:-coworkingstay}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
STAMP="$(date -u +%Y%m%d-%H%M%S)"
OUT_FILE="${BACKUP_DIR}/coworkingstay-${STAMP}.sql.gz"

mkdir -p "${BACKUP_DIR}"
docker exec "${CONTAINER_NAME}" pg_dump -U "${DB_USER}" "${DB_NAME}" | gzip > "${OUT_FILE}"
find "${BACKUP_DIR}" -type f -name "coworkingstay-*.sql.gz" -mtime +"${RETENTION_DAYS}" -delete

echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Backup written to ${OUT_FILE}"

# Optional off-site sync (uncomment once rclone remote is configured for Google Drive or Cloudflare R2):
# rclone copy "${BACKUP_DIR}" gdrive:coworkingstay-backups --max-age 31d
