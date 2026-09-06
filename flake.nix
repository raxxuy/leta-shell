{
  description = "Leta Shell - AGS-based desktop shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    leta-toolkit.url = "github:raxxuy/leta-toolkit";

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
      leta-toolkit,
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
        cava
        apps
      ];

      extraPackages = astalPackages ++ [
        pkgs.libadwaita
        pkgs.libsoup_3
      ];
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
          ];

          buildInputs = extraPackages ++ [
            pkgs.gjs
            leta-toolkit.packages.${system}.default
          ];

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
          buildInputs = [
            (ags.packages.${system}.default.override {
              inherit extraPackages;
            })

            pkgs.bun
            leta-toolkit.packages.${system}.default
          ];
        };
      };
    };
}
