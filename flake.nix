{
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

      astalPackages = with ags.packages.${system}; [
        io
        astal4 # or astal3 for gtk3
        tray
        apps
        notifd
        hyprland
        wireplumber
        # notifd tray wireplumber
      ];

      extraPackages =
        astalPackages
        ++ (with pkgs; [
          libadwaita
          libsoup_3
        ]);

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
          name = pname;
          src = ./.;

          nativeBuildInputs = with pkgs; [
            wrapGAppsHook3
            gobject-introspection
            ags.packages.${system}.default
          ];

          buildInputs = extraPackages ++ [ pkgs.gjs ];

          installPhase = ''
            runHook preInstall

            mkdir -p $out/bin
            mkdir -p $out/share
            cp -r * $out/share
            ags bundle ${entry} $out/bin/${pname} -d "SRC='$out/share'"

            runHook postInstall
          '';
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
    };
}
