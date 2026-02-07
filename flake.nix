{
  description = "Leta Shell - A custom AGS-based desktop shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      ags,
    }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      pname = "leta-shell";
      entry = "app.ts";
      src = ./.;

      astalPackages = with ags.packages.${system}; [
        io
        astal4
        tray
        apps
        mpris
        notifd
        battery
        network
        hyprland
        bluetooth
        wireplumber
        powerprofiles
        pkgs.libgtop
      ];

      extraPackages = astalPackages ++ [
        pkgs.libadwaita
        pkgs.libsoup_3
      ];
    in
    {
      packages.${system} = {
        default = pkgs.stdenv.mkDerivation {
          inherit src;
          name = pname;

          pnpmDeps = pkgs.fetchPnpmDeps {
            inherit pname src;
            fetcherVersion = 3;
            hash = "sha256-yiBrjCLSjv6rwaYq7zqf+LuAaYyMDD65YmxZiR12eyY=";
          };

          nativeBuildInputs = [
            pkgs.wrapGAppsHook3
            pkgs.gobject-introspection
            pkgs.pnpm.configHook
            ags.packages.${system}.default
          ];

          buildInputs = extraPackages ++ [ pkgs.gjs ];

          installPhase = ''
            runHook preInstall

            mkdir -p $out/bin
            mkdir -p $out/share
            cp -r * $out/share
            ags bundle ${entry} $out/bin/${pname} -d "SRC='$out/share'"

            # Install the leta CLI tool
            cat > $out/bin/leta-cli << 'EOF'
            #!/bin/sh
            SOCKET_PATH="/run/user/$(id -u)/leta-shell.sock"

            if [ ! -S "$SOCKET_PATH" ]; then
              echo "ERROR: leta-shell not running"
              exit 1
            fi

            if [ $# -eq 0 ]; then
              echo "Usage: leta <command> [args...]"
              exit 1
            fi

            echo "$*" | ${pkgs.socat}/bin/socat - UNIX-CONNECT:"$SOCKET_PATH" 2>/dev/null
            EOF
            chmod +x $out/bin/leta-cli

            runHook postInstall
          '';

          meta = with pkgs.lib; {
            description = "Leta Shell - AGS desktop shell";
            homepage = "https://github.com/raxxuy/leta-shell";
            license = licenses.mit;
            platforms = platforms.linux;
            mainProgram = "leta-shell";
          };
        };
      };

      devShells.${system} = {
        default = pkgs.mkShell {
          buildInputs = [
            pkgs.pnpm
            pkgs.inotify-tools
            pkgs.socat
            (ags.packages.${system}.default.override {
              inherit extraPackages;
            })
          ];
        };
      };

      nixosModules.default =
        { config
        , pkgs
        , lib
        , ...
        }:
        {
          options.programs.leta-shell = {
            enable = lib.mkEnableOption "Leta Shell";
          };

          config = lib.mkIf config.programs.leta-shell.enable {
            environment.systemPackages = [
              self.packages.${pkgs.system}.default
              pkgs.dart-sass
              pkgs.imagemagick
              pkgs.wl-clipboard
            ];
          };
        };

      homeManagerModules.default =
        { config
        , pkgs
        , lib
        , ...
        }:
        {
          options.programs.leta-shell = {
            enable = lib.mkEnableOption "Leta Shell";
          };

          config = lib.mkIf config.programs.leta-shell.enable {
            home.packages = [
              self.packages.${pkgs.system}.default
              pkgs.dart-sass
              pkgs.imagemagick
              pkgs.wl-clipboard
            ];
          };
        };
    };
}
