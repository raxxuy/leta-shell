CACHE_DIR="$HOME/.cache/leta-shell"
BUILD_DIR="./build"
CLEAN_CACHE=false

while getopts "c" opt; do
    case $opt in
        c)
            CLEAN_CACHE=true
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            echo "Usage: $0 [-c]"
            echo "  -c    Also clean cache (build is always cleaned)"
            exit 1
            ;;
    esac
done

echo "Removing build directory: $BUILD_DIR"
rm -rf "$BUILD_DIR"

if [ "$CLEAN_CACHE" = true ]; then
    echo "Removing cache directory: $CACHE_DIR"
    rm -rf "$CACHE_DIR"
fi
