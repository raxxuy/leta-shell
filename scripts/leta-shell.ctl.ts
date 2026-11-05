#!/usr/bin/env gjs
//@ts-nocheck

const Gio = imports.gi.Gio;

const app = new Gio.Application({
  application_id: "dev.raxxuy.leta-shell",
  flags:
    Gio.ApplicationFlags.HANDLES_COMMAND_LINE |
    Gio.ApplicationFlags.IS_LAUNCHER,
});

app.run(["leta-shell-ctl", ...ARGV]);
