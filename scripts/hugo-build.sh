#!/bin/bash
# Wrapper script that updates copyright year before running Hugo build

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

# Update copyright year first
./scripts/update-copyright.sh

# Set up Dart Sass in PATH
export PATH="$PROJECT_ROOT/dart-sass:$PATH"

# Run Hugo build with all passed arguments
hugo "$@"

