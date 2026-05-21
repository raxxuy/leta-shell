{
  description = "Leta Shell - AGS-based desktop shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

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

      astalPackages = with ags.packages.${system}; [
        io
        astal4
        hyprland
        mpris
        apps
        cava
        tray
        notifd
        battery
        bluetooth
        wireplumber
        powerprofiles
      ];

      extraPackages = astalPackages ++ [
        pkgs.libadwaita
        pkgs.libsoup_3
      ];

      nodeModules = pkgs.stdenv.mkDerivation {
        pname = "${pname}-node-modules";
        version = "0.1.15";
        src = ./.;
        nativeBuildInputs = [ pkgs.bun ];

        outputHashMode = "recursive";
        outputHashAlgo = "sha256";
        outputHash = "sha256-BkHoVmxANrKbFjdeN6yEi3FNvIwa5DTi7pQdjZ266oI=";

        buildPhase = ''
          export HOME=$TMPDIR
          export BUN_INSTALL_CACHE_DIR=$TMPDIR/.bun-cache
          bun install --frozen-lockfile
        '';

        installPhase = ''
          mkdir -p $out/node_modules
          cp -r node_modules/* $out/node_modules
        '';
      };
    in
    {
      packages.${system} = {
        default = pkgs.stdenv.mkDerivation {
          name = pname;
          src = ./.;

          nativeBuildInputs = with pkgs; [
            bun
            wrapGAppsHook4
            gobject-introspection
            ags.packages.${system}.default
            makeWrapper
          ];

          buildInputs = extraPackages ++ [ pkgs.gjs ];

          installPhase = ''
            runHook preInstall
            mkdir -p $out/bin $out/share/${pname}
            cp -r * $out/share/${pname}

            ln -s ${nodeModules}/node_modules $out/share/${pname}/node_modules

            cd $out/share/${pname}
            ags bundle ${entry} $out/bin/.${pname}-wrapped -d "SRC='$out/share/${pname}'" -d "ENV='prod'"

            substitute ${./bin/leta-shell} $out/bin/${pname} --replace "@out@" "$out"
            chmod +x $out/bin/${pname}

            runHook postInstall
          '';
        };
      };

      devShells.${system} = {
        default = pkgs.mkShell {
          buildInputs = [
            (ags.packages.${system}.default.override {
              inherit extraPackages;
            })
            pkgs.nodejs
            pkgs.bun
          ];
        };
      };

      nixosModules.default =
        {
          config,
          lib,
          pkgs,
          ...
        }:
        {
          options.programs.leta-shell.enable = lib.mkEnableOption "Leta Shell";
          config = lib.mkIf config.programs.leta-shell.enable {
            environment.systemPackages = [
              self.packages.${pkgs.stdenv.hostPlatform.system}.default
              pkgs.dart-sass
            ];
          };
        };

      homeManagerModules.default =
        {
          config,
          lib,
          pkgs,
          ...
        }:
        {
          options.programs.leta-shell.enable = lib.mkEnableOption "Leta Shell";
          config = lib.mkIf config.programs.leta-shell.enable {
            home.packages = [
              self.packages.${pkgs.stdenv.hostPlatform.system}.default
              pkgs.dart-sass
            ];
          };
        };
    };
}
