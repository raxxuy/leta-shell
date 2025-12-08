CACHE_DIR="$HOME/.cache/leta-shell"
PICTURES_DIR="$CACHE_DIR/pictures"
STYLES_DIR="$CACHE_DIR/styles"
WAL_DIR="$CACHE_DIR/wal"
BUILD_DIR="./build"
CLEAN_PICTURES=false
CLEAN_STYLES=false

while getopts "aps" opt; do
    case $opt in
        a)
            CLEAN_PICTURES=true
            CLEAN_STYLES=true
            ;;
        p)
            CLEAN_PICTURES=true
            ;;
        s)
            CLEAN_STYLES=true
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            echo "Usage: $0 [-a] [-p] [-s]"
            echo "  -a    Clean all (pictures and styles)"
            echo "  -p    Clean pictures"
            echo "  -s    Clean styles"
            exit 1
            ;;
    esac
done

echo "Removing build directory: $BUILD_DIR"
rm -rf "$BUILD_DIR"

if [ "$CLEAN_PICTURES" = true ]; then
    echo "Removing pictures directory: $PICTURES_DIR"
    rm -rf "$PICTURES_DIR"
fi

if [ "$CLEAN_STYLES" = true ]; then
    echo "Removing styles directory: $STYLES_DIR"
    rm -rf "$STYLES_DIR"
    rm -rf "$WAL_DIR"
fi
