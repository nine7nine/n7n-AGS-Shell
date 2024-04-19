# n7n-AGS-Shell / Hyprland

My own AGS Shell based on Aylur's dotfiles. Aylur's AGS Desktop is great, but some of it is very specific to their
own needs. Thus I decided to hack away to make something suitable for me. I am running this Shell on a
Microsoft Surface 7; multi-touch & Stylus support, so I need something a bit more tablet friendly. 

A few random videos:

### Screenshots:

![n7n-AGS-Shell_1](https://github.com/nine7nine/n7n-AGS-Shell/assets/20159346/efa71ff1-8868-47ce-958d-906cc0a62630)
![n7n-AGS-Shell_2](https://github.com/nine7nine/n7n-AGS-Shell/assets/20159346/c222d9f1-c983-4d7e-b9d0-7e89df332797)
![n7n-AGS-Shell_4](https://github.com/nine7nine/n7n-AGS-Shell/assets/20159346/45af3566-d4fb-489c-ade1-b10e0fc1b347)


### Features:

- ***AppLauncher:*** Refactored into an AppMenu. Sorts apps. Searchable/launch.
- ***AppDock:*** Auto-hide. left-side position. Supports Chrome Apps. Note: WIP still needs indicators.
- ***DateMenu:*** Simplified Notificatios/DateMenu widget.
- ***Hyprspace:*** A couple of additional hacks/patches (in my repo: ~/hyprspace-patch)
- ***QuickSettings:*** Refactored, Colorized and Stylized.
- ***QS/Netowrk Widget:*** Use iwgtk for settings. Fix layout bugs/issues.
- ***Streamlined/simpified widgets:*** removing redundancy where appropriate.
- ***Separation of Concerns:*** More clearly defined roles between Hyprland and AGS/The Shell.
- ***SettingsDialog:*** Remove unused settings (Rmoved Widgets && Hyprland settings, etc).
- ***Taskbar:*** Stylized indicators. Allow soft-kill with secondary/right mouse or stylus click.
- ***ToolBox:*** Dock Widget Utilizing Hyprland controls (window managment, etc)
- ***Workspaces:*** Dynamic. The Bar/widget allows navigation/selection (each workspace is a button).
- ***WvKBD OSK Toggle:*** My WvCtl Utility is used to send signals to WvKBD.

### Dependencies:

***NOTE: I don't support or use Nix/NixOS. I also tend to use -git packages on ArchLinux***

- Hyprland and Co.
- aylurs-gtk-shell
- bun
- dart-sass
- fd
- brightnessctl
- iwgtk
- matugen
- hyprpicker
- hyprpaper
- Hyprgrass (Hyprland plugin: multi-touch support)
- Hyprspace (Hyprland plugin: Overview/Workspace Switcher)
- WvKBD (and wvctl utlity found in ~/sources directory)

Themes: (Gtk/Qt/Etc)

- Nordic
- Nordzy Cursors

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

### Final Notes:

While I have been putting this shell together for myself -- I may be willing to accept PRs, if I see
value the changes. Just keep in mind: I like simplicity; I've removed a number of things from Aylur's
config (media stuff, screenrecord, redundancy from multiple widgets, etc) AND I've done away with 
the Shell managing Hyprland settings && relying explicitly on things like swww.

So if you have practical improvements, bugfixes or something interesting (functionally) -- it's
possible that I may be interested in your contributions. While This Shell is Tablet Centric, it's 
also 'general purpose' and disabling tablet specific features is as simple is commenitng out a couple
of LOC, not using Hyprgrass and removing a few settings from Hyprland.conf.

Lastly, if you want any pointers - feel free to ask.

