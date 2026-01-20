BUILD_DIR="./build"
CACHE_DIR="$HOME/.cache/leta-shell"
CONFIG_DIR="$HOME/.config/leta-shell"
WAL_DIR="$CACHE_DIR/wal"
STYLES_DIR="$CACHE_DIR/styles"
PICTURES_DIR="$CACHE_DIR/pictures"
CLEAN_STYLES=false
CLEAN_CONFIGS=false
CLEAN_PICTURES=false

while getopts "apsc" opt; do
    case $opt in
        a)
            CLEAN_PICTURES=true
            CLEAN_STYLES=true
            CLEAN_CONFIGS=true
            ;;
        p)
            CLEAN_PICTURES=true
            ;;
        s)
            CLEAN_STYLES=true
            ;;
        c)
            CLEAN_CONFIGS=true
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            echo "Usage: $0 [-a] [-p] [-s] [-c]"
            echo "  -a    Clean all (pictures, styles and configs)"
            echo "  -p    Clean pictures"
            echo "  -s    Clean styles"
            echo "  -c    Clean configs"
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

if [ "$CLEAN_CONFIGS" = true ]; then
    echo "Removing configs directory: $CONFIG_DIR"
    rm -rf "$CONFIG_DIR"
fi
