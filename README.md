# leta-shell

Hyprland shell created using [AGS](https://aylur.github.io/ags/). This project is still in development.

As of now, the shell is designed to be used in a NixOS environment. Once it is fully developed, other distributions will later be supported.

## Prerequisites

The following packages are required:

- `upower`
- `pywal16`
- `dart-sass`
- `imagemagick`
- `wl-clipboard`
- `apple-fonts` (will be customizable in future releases)

## Installation

### NixOS Flake Setup

Add leta-shell to your flake inputs:

```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    leta-shell = {
      url = "github:raxxuy/leta-shell";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
}
```

### Option 1: NixOS Module

Include the module in your system configuration:

```nix
outputs = { nixpkgs, leta-shell, ... }: {
  nixosConfigurations.yourHost = nixpkgs.lib.nixosSystem {
    # ...
    modules = [
      ./configuration.nix
      leta-shell.nixosModules.default
    ];
  };
};
```

Enable in your `configuration.nix`:

```nix
programs.leta-shell.enable = true;
```

### Option 2: Home Manager (Standalone)

For standalone Home Manager setups:

```nix
outputs = { nixpkgs, home-manager, leta-shell, ... }: {
  homeConfigurations.yourUsername = home-manager.lib.homeManagerConfiguration {
    # ...
    modules = [
      ./home.nix
      leta-shell.homeManagerModules.default
    ];
  };
};
```

Enable in your `home.nix`:

```nix
programs.leta-shell.enable = true;
```

### Option 3: Home Manager (as NixOS Module)

If using Home Manager within NixOS:

```nix
# In your home.nix or equivalent
imports = [ inputs.leta-shell.homeManagerModules.default ];

programs.leta-shell.enable = true;
```

## Usage

### Hyprland Configuration

Add these keybindings to your `hyprland.conf`:

```conf
# Shell controls
bind = $mod, L, exec, leta-shell
bind = $mod SHIFT, L, exec, leta-shell quit

# Interface toggles
bind = $mod, R, exec, leta-shell toggle launcher
bind = $mod, W, exec, leta-shell toggle wallpapers
```

# Recommended

Add these layer rules so the shell looks as intended:

```
layerrule = no_anim on, match:namespace leta-shell
layerrule = blur on, match:namespace leta-shell
layerrule = blur_popups on, match:namespace leta-shell
layerrule = ignore_alpha 0.3, match:namespace leta-shell
```

# Todo

- [X] Improve the background/wallpapers system so it doesn't eat up a lot of memory
- [x] Notification daemon/menu
- [?] Power menu
- [ ] Settings menu
- [ ] Update notifier
- [ ] Theme manager
- [x] Media player
- [ ] Lock screen
