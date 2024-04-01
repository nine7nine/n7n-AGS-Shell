# n7n-AGS-Shell / Hyprland

My own AGS Shell, based on Aylur's dotfiles. Aylur's AGS desktop is great, but some of it is very specific to their
own needs, thus I decided to hack away to make something suitable for my own needs. I am running this Shell on a
Microsoft Surface 7, which is a 2-in-1 laptop/tablet; multi-touch & Stylus, so my requirements are vastly
different than what other people may need on a typical laptop.

### Screenshots 

![My Image](/images/n7n-AGS-Shell_2.png)

![My Image](/images/n7n-AGS-Shell_1.png)

![My Image](/images/n7n-AGS-Shell_3.png)

![My Image](/images/n7n-AGS-Shell_4.png)

### Features:

- AppLauncher: Refactored into an AppMenu. Sorts apps. Searchable/launch.
- Dock: Auto-hide. left-side position. Supports Chrome Apps. Note: WIP still needs indicators.
- Overview Widget: Differs from Aylur's version. Small, left-top position.
- Workspaces: Dynamic. The Bar/widget allows navigation/selection (each workspace is a button).
- AppKill Button: Like forcekill on x11 (uses hyprctl kill).
- Taskbar: Stylized indicators. Allow soft-kill with secondary/right mouse or stylus click.
- QuickSettings: Refactored and Stylized.
- QS/Netowrk Widget: Use iwgtk for settings. Fix layout bugs/issues.
- DateMenu: Simplified Notificatios/DateMenu widget.
- Rotation Toggle: Switch between Landscape and Portrait views
- WvKBD OSK Toggle: My WvCtl Utility is used to send signals to WvKBD.
- Streamlined/simpified widgets, removing redundancy where appropriate.

### Dependencies:

***NOTE: I don't support or use Nix/NixOS. I also tend to use -git packages on ArchLinux***

- Hyprland and Co.
- aylurs-gtk-shell, and its optional dependencies
- bun
- dart-sass
- fd
- brightnessctl
- swww
- matugen

Optionally:

- hyprpicker
- slurp
- wf-recorder
- wl-clipboard
- wayshot
- swappy
- iwgtk
- WvKBD (and wvctl utlity found in ~/sources directory)

Themes: (Gtk/Qt/Etc)

- Nordic
- Gradience App (possibly needed to tune gtk3/gtk4 stuff)

Icons:

- Papyrus (dark)

### Installation
```
git clone https://github.com/nine7nine/n7n-AGS-Shell.git
cp -r ~/n7n-AGS-Shell/ags $HOME/.config/ags
```

Restart AGS, or log into a Hyprland/AGS desktop session. 

### WvCtl Compilation

From within the ~/sources folder

```
gcc wvctl.c -o wvctl
```

After compilation, make it exectuable, and move it somewhere in your PATH (eg: /usr/bin)
