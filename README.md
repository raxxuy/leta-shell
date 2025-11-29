# leta-shell

Hyprland shell created using AGS.

As of now, this shell is only intended to be used in NixOS.

Needed packages:

- pywal16
- dart-sass
- imagemagick
- apple-fonts (can be substituted with other fonts in the future)

# Recommended

This shell uses blur and it's also not recommended to have animations turned on via Hyprland. Put these layer rules in your config.

```
layerrule = noanim, leta-shell
layerrule = blur, leta-shell
layerrule = blurpopups, leta-shell
layerrule = ignorezero, leta-shell
layerrule = xray 1, leta-shell
```
