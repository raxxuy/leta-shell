SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OS_NAME=$(awk -F'=' '/^NAME/{print $2}' /etc/os-release)

run_dev_loop() {
    while true; do
        echo "Starting the shell..."
        ags run . &
        echo "Shell started, waiting for file changes..."
        inotifywait -q -r -e modify,move,create,delete .
        echo "File change detected. Killing bar"
        pkill ags
        pkill gjs
        npm run clean
    done
}

if [[ "$OS_NAME" == *"NixOS"* ]]; then
    echo "[info] Setting up development environment for NixOS"
    nix develop "$SCRIPT_DIR/../" --command bash -c "$(declare -f run_dev_loop); run_dev_loop"
else
    run_dev_loop
fi
