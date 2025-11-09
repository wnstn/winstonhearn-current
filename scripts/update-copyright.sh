#!/bin/bash
# Update copyright year in config.toml to current year

CURRENT_YEAR=$(date +%Y)
CONFIG_FILE="config.toml"

# Update copyright line with current year
# Matches: copyright = '© YYYY Harrie Bickle'
sed -i "s/copyright = '© [0-9]\{4\} Harrie Bickle'/copyright = '© ${CURRENT_YEAR} Harrie Bickle'/" "$CONFIG_FILE"

echo "Copyright year updated to ${CURRENT_YEAR}"

