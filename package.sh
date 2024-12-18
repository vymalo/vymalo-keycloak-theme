#!/usr/bin/env bash

set -ex

# Get the package version from the package.json file
PACKAGE_VERSION=$(jq -r '.version' package.json)
echo "Packaging theme... $PACKAGE_VERSION"

# Check if the THEME_VERSION environment variable is set
if [ -z "$PACKAGE_VERSION" ]; then
  echo "Please set the THEME_VERSION environment variable"
  exit 1
fi

# Create the build directory
mkdir -p build

# Create a temporary directory for JAR packaging
temp_dir=$(mktemp -d --tmpdir=build)

# Cleanup function to remove the temporary directory
cleanup() {
  echo "Cleaning up..."
  rm -rf "$temp_dir"
}

# Cleanup the temporary directory on exit
trap cleanup EXIT

# Create META-INF directory
mkdir -p {"$temp_dir/META-INF","$temp_dir/theme"}

# Copy the contents of the folder to the temporary directory
cp keycloak-themes.json "$temp_dir/META-INF"

# Copy the theme data to the temporary directory
for theme in $(jq -r '.themes | .[].name' keycloak-themes.json); do
  cp -r "themes/$theme/data" "$temp_dir/theme/$theme"
done

# Create the JAR file inside the providers directory
jar cf "build/theme-$PACKAGE_VERSION.jar" -C "$temp_dir" .

# Remove the temporary directory
echo "Theme created: build/theme-$PACKAGE_VERSION.jar"
