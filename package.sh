#!/usr/bin/env bash

set -e

PACKAGE_VERSION=$(jq -r '.version' package.json)
echo "Packaging theme... $PACKAGE_VERSION"

if [ -z "$PACKAGE_VERSION" ]; then
  echo "Please set the THEME_VERSION environment variable"
  exit 1
fi

# Create a temporary directory for JAR packaging
temp_dir=$(mktemp -d --tmpdir=build)

cleanup() {
  echo "Cleaning up..."
  rm -rf "$temp_dir"
}

trap cleanup EXIT

# Create META-INF directory
mkdir -p {"$temp_dir/META-INF","$temp_dir/theme",build}

# Copy the contents of the folder to the temporary directory
cp keycloak-themes.json "$temp_dir/META-INF"
cp -r web-store "$temp_dir/theme/web-store"

# Create the JAR file inside the providers directory
jar cf "build/vymalo-theme-keycloak-theme-$PACKAGE_VERSION.jar" -C "$temp_dir" .

echo "Theme created: build/theme.jar"
