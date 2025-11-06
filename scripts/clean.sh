CACHE_DIR="$HOME/.cache/leta-shell"
BUILD_DIR="${1:-./build}"

$BUILD_DIR/bin/leta-shell quit
rm -rf "$CACHE_DIR"
rm -rf "$BUILD_DIR"
