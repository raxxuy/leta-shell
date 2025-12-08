SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OS_NAME=$(awk -F'=' '/^NAME/{print $2}' /etc/os-release)
CLEAN_FLAGS=""

while getopts "aps" opt; do
    case $opt in
        a)
            CLEAN_FLAGS="-a"
            ;;
        p)
            CLEAN_FLAGS="${CLEAN_FLAGS} -p"
            ;;
        s)
            CLEAN_FLAGS="${CLEAN_FLAGS} -s"
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            echo "Usage: $0 [-a] [-p] [-s]"
            echo "  -a    Clean all cache on file changes"
            echo "  -p    Clean pictures cache on file changes"
            echo "  -s    Clean styles cache on file changes"
            exit 1
            ;;
    esac
done

run_dev_loop() {
    while true; do
        echo "Starting the shell..."
        ags run . &
        echo "Shell started, waiting for file changes..."
        inotifywait -q -r -e modify,move,create,delete .
        echo "File change detected. Killing bar"
        pkill ags
        pkill gjs
        if [ -n "$CLEAN_FLAGS" ]; then
            pnpm run clean $CLEAN_FLAGS
        else
            pnpm run clean
        fi
    done
}

if [[ "$OS_NAME" == *"NixOS"* ]]; then
    echo "[info] Setting up development environment for NixOS"
    nix develop "$SCRIPT_DIR/../" --command bash -c "export CLEAN_FLAGS='$CLEAN_FLAGS'; $(declare -f run_dev_loop); run_dev_loop"
else
    run_dev_loop
fi
