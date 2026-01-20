SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OS_NAME=$(awk -F'=' '/^NAME/{print $2}' /etc/os-release)

run_build_process() {
    if [[ "$OS_NAME" == *"NixOS"* ]]; then
        echo "Building for NixOS"
        nix build "$SCRIPT_DIR/../" -o "$SCRIPT_DIR/../build"
    fi
}

CLEAN_CACHE=false

while getopts "c" opt; do
    case $opt in
        c)
            CLEAN_CACHE=true
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            echo "Usage: $0 [-c]"
            echo "  -c    Clean cache"
            exit 1
            ;;
    esac
done

echo "Cleaning build artifacts/cache..."
if [ "$CLEAN_CACHE" = true ]; then
    $SCRIPT_DIR/clean.sh -a
else
    $SCRIPT_DIR/clean.sh
fi

run_build_process
