# n7n-AGS-Shell / Hyprland

My own AGS Shell, based on Aylur's dotfiles. Aylur's AGS desktop is great, but some of it is very specific to their
own needs, thus I decided to hack away and come up with something more generalized and suitable for my own needs.

### Screenshots 

![My Image](/images/n7n-AGS-Shell_1.png)

![My Image](/images/n7n-AGS-Shell_2.png)

![My Image](/images/n7n-AGS-Shell_3.png)

### Features/Improvments:

- AppLauncher: Refactored into an AppMenu. Sorts apps. Searchable/launch.
- Dock: Auto-hide. left-side position. Supports Chrome Apps. Note: WIP still needs indicators.
- Overview Widget: Differs from Aylur's version. Small, left-top position.
- Workspaces: Dynamic. The Bar/widget allows navigation/selection (each workspace is a button).
- AppKill Button: Like forcekill on x11 (uses hyprctl kill).
- Taskbar: Stylized indicators. Allow soft-kill with secondary/right mouse or stylus click.
- QuickSettings: Refactored and Stylized.
- DateMenu: Simplified widget.

That aside, there are a lot of small tweaks and removal of things I don't need or want. Some redundant elements in
widgets, or other functionality that I found inconsistent or buggy that I've killed off.

### Dependencies:

install these dependencies:

***NOTE: I don't support or use Nix/NixOS***

- Hyprland and Co.
- aylurs-gtk-shell, and its optional dependencies
- bun
- dart-sass
- fd
- brightnessctl
- swww
- matugen

optionally these too

- hyprpicker
- slurp
- wf-recorder
- wl-clipboard
- wayshot
- swappy

### Installation
```
git clone https://github.com/nine7nine/n7n-AGS-Shell.git
cp -r n7n-AGS-Shell/ags $HOME/.config/ags
```

Then run ags however you are doing that. I use GDM, not CLI.
