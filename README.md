# n7n-AGS-Shell / Hyprland

My own AGS Shell based on Aylur's dotfiles. Aylur's AGS desktop is great, but some of it is very specific to their
own needs, thus I decided to hack away to make something suitable for me. I am running this Shell on a
Microsoft Surface 7; multi-touch & Stylus support, so I need something a bit more tablet friendly. 

A few random videos:

### Demos / Random Videos

https://github.com/nine7nine/n7n-AGS-Shell/assets/20159346/a0c14b64-4156-4956-9b2d-8dc2e8cb3679

https://github.com/nine7nine/n7n-AGS-Shell/assets/20159346/a6c5759c-36df-40de-951e-59623b1c8975

https://github.com/nine7nine/n7n-AGS-Shell/assets/20159346/16bb5f3f-689a-474e-9353-598088677040

### Features:

- ***AppLauncher:*** Refactored into an AppMenu. Sorts apps. Searchable/launch.
- ***AppDock:*** Auto-hide. left-side position. Supports Chrome Apps. Note: WIP still needs indicators.
- ***Hyprspace:*** A couple of additional hacks/patches (in my repo: ~/hyprspace-patch)
- ***Workspaces:*** Dynamic. The Bar/widget allows navigation/selection (each workspace is a button).
- ***Taskbar:*** Stylized indicators. Allow soft-kill with secondary/right mouse or stylus click.
- ***QuickSettings:*** Refactored, Colorized and Stylized.
- ***QS/Netowrk Widget:*** Use iwgtk for settings. Fix layout bugs/issues.
- ***DateMenu:*** Simplified Notificatios/DateMenu widget.
- ***WvKBD OSK Toggle:*** My WvCtl Utility is used to send signals to WvKBD.
- ***ToolBox:*** Dock Widget Utilizing Hyprland controls (window managment, etc)
- ***Streamlined/simpified widgets:*** removing redundancy where appropriate.

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
- Hyprgrass (Hyprland plugin: multi-touch support)
- Hyprspace (Hyprland plugin: Overview/Workspace Switcher)

Themes: (Gtk/Qt/Etc)

- Nordic
- Nordzy Cursors
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

After compilation; make it exectuable, and then move it somewhere in your PATH (eg: /usr/bin)
