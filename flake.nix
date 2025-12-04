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
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      pname = "leta-shell";
      entry = "app.ts";
      astalPackages = with ags.packages.${system}; [
        io
        astal4
        tray
        apps
        mpris
        notifd
        battery
        hyprland
        bluetooth
        wireplumber
      ];
      extraPackages =
        astalPackages
        ++ (with pkgs; [
          libadwaita
          libsoup_3
        ])
        ++ [ apple-fonts.packages.${system}.apple-fonts ];
      shellPackages = with pkgs; [
        pnpm
        nodejs
        pywal16
        dart-sass
        imagemagick
        inotify-tools
      ];
    in
    {
      packages.${system} = {
        default = pkgs.stdenv.mkDerivation {
          inherit pname;
          version = "0.1.0";
          src = ./.;

          nativeBuildInputs = with pkgs; [
            wrapGAppsHook3
            gobject-introspection
            ags.packages.${system}.default
          ];

          buildInputs = extraPackages ++ [ pkgs.gjs ];

          dontStrip = true;

          installPhase = ''
            runHook preInstall

            mkdir -p $out/bin
            mkdir -p $out/share/${pname}
            mkdir -p $out/libexec

            cp -r $src/* $out/share/${pname}/

            cd $out/share/${pname}
            ags bundle ${entry} $out/libexec/${pname}

            cat > $out/bin/${pname} << 'EOF'
            #!/usr/bin/env bash
            export SRC="$out/share/${pname}"
            exec "$out/libexec/${pname}" "$@"
            EOF

            substituteInPlace $out/bin/${pname} \
              --replace '$out' "$out"

            chmod +x $out/bin/${pname}

            runHook postInstall
          '';

          meta = with pkgs.lib; {
            description = "Leta Shell - A custom AGS-based desktop shell";
            homepage = "https://github.com/raxxuy/leta-shell";
            license = licenses.mit;
            platforms = platforms.linux;
            mainProgram = pname;
          };
        };
      };

      devShells.${system} = {
        default = pkgs.mkShell {
          buildInputs = shellPackages ++ [
            (ags.packages.${system}.default.override {
              inherit extraPackages;
            })
          ];
        };
      };

      nixosModules.default =
        { config, lib, ... }:
        {
          options.programs.leta-shell = {
            enable = lib.mkEnableOption "Leta Shell";
          };

          config = lib.mkIf config.programs.leta-shell.enable {
            environment.systemPackages = [ self.packages.${system}.default ];
            fonts.packages = [ apple-fonts.packages.${system}.apple-fonts ];
          };
        };

      homeManagerModules.default =
        { config, lib, ... }:
        {
          options.programs.leta-shell = {
            enable = lib.mkEnableOption "Leta Shell";
          };

          config = lib.mkIf config.programs.leta-shell.enable {
            home.packages = [
              self.packages.${system}.default
              apple-fonts.packages.${system}.apple-fonts
            ];
          };
        };
    };
}
