SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OS_NAME=$(awk -F'=' '/^NAME/{print $2}' /etc/os-release)

run_build_process() {
    if [[ "$OS_NAME" == *"NixOS"* ]]; then
        echo "Building for NixOS"
        nix build "$SCRIPT_DIR/../" -o "$SCRIPT_DIR/../build"
    fi
}

while getopts "c" opt; do
    case $opt in
        c)
            echo "Cleaning build artifacts..."
            $SCRIPT_DIR/clean.sh
            run_build_process
            exit 0
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            echo "Usage: $0 [-c]"
            echo "  -c    Clean build artifacts by running ./clean.sh"
            exit 1
            ;;
    esac
done

run_build_process
