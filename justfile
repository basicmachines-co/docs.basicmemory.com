# docs.basicmemory.com justfile

# Default recipe
default:
    @just --list

# Load the Node version pinned in .nvmrc (via nvm), then run a command
_with-node +cmd:
    #!/usr/bin/env bash
    set -euo pipefail
    export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        \. "$NVM_DIR/nvm.sh"
        nvm use >/dev/null
    fi
    echo "Using node $(node --version)"
    {{cmd}}

# Install dependencies (pinned Node from .nvmrc)
install:
    @just _with-node npm install

# Development
dev:
    @just _with-node npm run dev

# Build
build:
    @just _with-node npm run build

# Preview production build
preview:
    @just _with-node npm run preview

# Generate fly.toml from template
generate-fly-toml env:
    #!/bin/bash
    set -euo pipefail
    if [ ! -f ".env.{{env}}" ]; then
        echo "❌ Environment file .env.{{env}} not found"
        exit 1
    fi
    echo "🔧 Generating fly.toml from fly.toml.template using .env.{{env}}"
    set -a
    source .env.{{env}}
    set +a
    envsubst < fly.toml.template > fly.toml
    echo "✅ Generated fly.toml"

# Deploy to Fly.io
deploy env:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "🚀 Deploying docs to {{env}}..."
    just generate-fly-toml {{env}}
    GIT_SHA="$(git rev-parse HEAD)"
    echo "Using git SHA for cache bust: $GIT_SHA"
    flyctl deploy --remote-only --build-arg CACHE_BUST="$GIT_SHA"

# Initialize Fly app
fly-init env:
    flyctl apps create {{env}}-docs-basicmemory --org basic-memory

# Build Docker image locally
docker-build:
    docker build -t docs-basicmemory .

# Run Docker image locally
docker-run:
    docker run -p 3000:3000 docs-basicmemory
