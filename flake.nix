{
  description = "Leta Shell - A custom AGS-based desktop shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    apple-fonts = {
      url = "github:raxxuy/apple-fonts.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      ags,
      apple-fonts,
    }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];

      forAllSystems = nixpkgs.lib.genAttrs systems;

      astalPackagesFor =
        system: with ags.packages.${system}; [
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
        ];

      extraPackagesFor =
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        (astalPackagesFor system)
        ++ (with pkgs; [
          libadwaita
          libsoup_3
          gjs
        ])
        ++ [ apple-fonts.packages.${system}.apple-fonts ];
    in
    {
      packages = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          pname = "leta-shell";
          version = "0.1.0";
          src = ./.;
          extraPackages = extraPackagesFor system;
        in
        {
          default = pkgs.stdenv.mkDerivation {
            inherit pname version src;

            pnpmDeps = pkgs.fetchPnpmDeps {
              inherit pname version src;
              fetcherVersion = 3;
              hash = "sha256-Z4tgm/zarvJmoVx2URquwQLSX0GO8KZVm12nv+vmH6U=";
            };

            nativeBuildInputs = [
              pkgs.wrapGAppsHook4
              pkgs.gobject-introspection
              pkgs.pnpm.configHook
              ags.packages.${system}.default
            ];

            buildInputs = extraPackages;

            installPhase = ''
              runHook preInstall

              mkdir -p $out/bin
              mkdir -p $out/share/leta-shell

              cp -r . $out/share/leta-shell
              cd $out/share/leta-shell

              ags bundle app.ts $out/bin/leta-shell

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
        }
      );

      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          extraPackages = extraPackagesFor system;
        in
        {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [
              pnpm
              nodejs
              bun
              pywal16
              dart-sass
              imagemagick
              inotify-tools
              (ags.packages.${system}.default.override {
                inherit extraPackages;
              })
            ];
          };
        }
      );

      nixosModules.default =
        {
          config,
          pkgs,
          lib,
          ...
        }:
        {
          options.programs.leta-shell = {
            enable = lib.mkEnableOption "Leta Shell";
          };

          config = lib.mkIf config.programs.leta-shell.enable {
            environment.systemPackages = [ self.packages.${pkgs.system}.default ];
            fonts.packages = [ apple-fonts.packages.${pkgs.system}.apple-fonts ];
          };
        };

      homeManagerModules.default =
        {
          config,
          pkgs,
          lib,
          ...
        }:
        {
          options.programs.leta-shell = {
            enable = lib.mkEnableOption "Leta Shell";
          };

          config = lib.mkIf config.programs.leta-shell.enable {
            home.packages = [
              self.packages.${pkgs.system}.default
              apple-fonts.packages.${pkgs.system}.apple-fonts
            ];
          };
        };
    };
}
