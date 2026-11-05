{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    leta-toolkit = {
      url = "github:raxxuy/leta-toolkit";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      astal,
      leta-toolkit,
    }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs systems;

      dependencies = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          # run-time dependencies
          buildInputs = [
            pkgs.glib
            pkgs.gjs
            pkgs.gtk4
            pkgs.libadwaita
            pkgs.gtk4-layer-shell # only used by the layer-shell template
            pkgs.dart-sass
            pkgs.rsync
            leta-toolkit.packages.${system}.default
            (astal.packages.${system}.hyprland.overrideAttrs (old: {
              postPatch = (old.postPatch or "") + ''
                substituteInPlace src/monitor.vala \
                  --replace-fail \
                    'special_workspace = hyprland.get_workspace((int)obj.get_object_member("specialWorkspace").get_int_member("id"));' \
                    'special_workspace = obj.get_object_member("specialWorkspace").has_member("id") ? hyprland.get_workspace((int)obj.get_object_member("specialWorkspace").get_int_member("id")) : null;'
              '';
            }))
          ];
          # build-time dependencies
          nativeBuildInputs = [
            pkgs.pnpm # JavaScript package manager
            pkgs.meson # build tool, frontend for ninja
            pkgs.ninja # build tool, backend used by meson
            pkgs.pkg-config # tool to find dependencies and system files during build steps
            pkgs.wrapGAppsHook4 # tool required to run gtk programs built by nix
            pkgs.glib # required by gnim to build schemas
            pkgs.gobject-introspection # used to run scripts
            pkgs.nodejs # used to run scripts
            pkgs.gettext # used to scan source code and generate translation files
            pkgs.desktop-file-utils # used to install .desktop files
            pkgs.vala # used by templates created with the Vala option
            pkgs.zip # used by the gnome-shell template's pack command
            pkgs.dbus # used by the gnome-shell template's dev command
            pkgs.bun
            pkgs.makeWrapper
          ];
        }
      );
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          deps = dependencies.${system};
        in
        {
          default = pkgs.mkShell {
            packages = deps.nativeBuildInputs ++ deps.buildInputs;
          };
        }
      );

      # derivation to build the main program in the adwaita and layer-shell templates
      packages = forAllSystems (
        system:
        let
          package = builtins.fromJSON (builtins.readFile ./package.json);
          pkgs = nixpkgs.legacyPackages.${system};
          deps = dependencies.${system};
        in
        {
          default = pkgs.stdenv.mkDerivation {
            inherit (package) name version;
            inherit (deps) buildInputs nativeBuildInputs;

            postFixup = ''
              wrapProgram "$out/bin/${package.name}" \
                --prefix PATH : ${
                  pkgs.lib.makeBinPath [
                    pkgs.dart-sass
                    pkgs.rsync
                    pkgs.coreutils
                    leta-toolkit.packages.${system}.default
                  ]
                }
            '';

            src = pkgs.stdenv.mkDerivation {
              name = "${package.name}-src-with-deps";
              src = ./.;

              pnpmDeps = pkgs.fetchPnpmDeps {
                pname = "${package.name}-pnpm-deps";
                src = ./.;
                fetcherVersion = 4;
                hash = pkgs.lib.fakeHash;
              };

              nativeBuildInputs = [
                pkgs.nodejs
                pkgs.pnpm
                pkgs.pnpmConfigHook
              ];

              installPhase = ''
                mkdir $out
                cp -r * $out
              '';
            };
          };
        }
      );
    };
}
