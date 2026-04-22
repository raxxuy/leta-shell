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
      ];

      extraPackages = astalPackages ++ [
        pkgs.libadwaita
        pkgs.libsoup_3
      ];

      nodeModules = pkgs.stdenv.mkDerivation {
        pname = "${pname}-node-modules";
        version = "0.1.0";
        src = ./.;
        nativeBuildInputs = [ pkgs.bun ];

        outputHashMode = "recursive";
        outputHashAlgo = "sha256";
        outputHash = "sha256-y5VFhWuRgkPHveWx7ZoFGBY31SklSD/yPRxbciNAr2k=";

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

      module =
        {
          config,
          lib,
          pkgs,
          ...
        }:
        {
          options.programs.leta-shell.enable = lib.mkEnableOption "Leta Shell";

          config = lib.mkIf config.programs.leta-shell.enable {
            environment.systemPackages = lib.mkIf (config ? environment) [
              self.packages.${pkgs.system}.default
              pkgs.dart-sass
            ];

            home.packages = lib.mkIf (config ? home) [
              self.packages.${pkgs.system}.default
              pkgs.dart-sass
            ];
          };
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
            ags bundle ${entry} $out/bin/.${pname}-wrapped -d "SRC='$out/share/${pname}'"

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
            pkgs.bun
          ];
        };
      };

      nixosModules.default = module;
      homeManagerModules.default = module;
    };
}
