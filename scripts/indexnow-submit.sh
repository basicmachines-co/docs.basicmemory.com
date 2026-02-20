#!/usr/bin/env bash
# Submit all docs.basicmemory.com pages to IndexNow for search engine indexing.
# Usage: ./scripts/indexnow-submit.sh

set -euo pipefail

HOST="docs.basicmemory.com"
KEY="0813239a6c6945e1bd8c01751fbc1ec8"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
CONTENT_DIR="$(dirname "$0")/../content"

# Build URL list from content directory
urls=()

# Add the root page
urls+=("https://${HOST}")

for file in $(find "$CONTENT_DIR" -name '*.md' -not -name 'index.md' | sort); do
  # Strip content dir prefix
  rel="${file#$CONTENT_DIR/}"
  # Remove .md extension
  rel="${rel%.md}"
  # Remove leading numeric prefix from each path segment (e.g., 1.start-here -> start-here)
  # Only strips N. at segment boundaries, preserving version numbers like v0.19.0
  rel=$(echo "$rel" | sed -E 's|^[0-9]+\.||; s|/[0-9]+\.|/|g')
  urls+=("https://${HOST}/${rel}")
done

# Build JSON url list
url_json=""
for url in "${urls[@]}"; do
  if [ -n "$url_json" ]; then
    url_json="${url_json},"
  fi
  url_json="${url_json}
        \"${url}\""
done

payload="{
    \"host\": \"${HOST}\",
    \"key\": \"${KEY}\",
    \"keyLocation\": \"${KEY_LOCATION}\",
    \"urlList\": [${url_json}
    ]
}"

echo "Submitting ${#urls[@]} URLs to IndexNow..."
echo ""
echo "$payload" | python3 -m json.tool
echo ""

curl -s -w "\nHTTP Status: %{http_code}\n" \
  -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$payload"