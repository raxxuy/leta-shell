SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OS_NAME=$(awk -F'=' '/^NAME/{print $2}' /etc/os-release)
CLEAN_CACHE=false

while getopts "c" opt; do
    case $opt in
        c)
            CLEAN_CACHE=true
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            echo "Usage: $0 [-c]"
            echo "  -c    Also clean cache on file changes"
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
        if [ "$CLEAN_CACHE" = true ]; then
            pnpm run clean -c
        else
            pnpm run clean
        fi
    done
}

if [[ "$OS_NAME" == *"NixOS"* ]]; then
    echo "[info] Setting up development environment for NixOS"
    nix develop "$SCRIPT_DIR/../" --command bash -c "CLEAN_CACHE=$CLEAN_CACHE; $(declare -f run_dev_loop); run_dev_loop"
else
    run_dev_loop
fi
