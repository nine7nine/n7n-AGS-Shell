# n7n-AGS-Shell / Hyprland

My own AGS Shell based on Aylur's dotfiles. Aylur's AGS Desktop is great, but some of it is very specific to their
own needs and style. Thus, I decided to hack away to make something suitable for me. I am running this Shell on a
Microsoft Surface 7; multi-touch & Stylus support, so I need something a bit more tablet friendly...

That said; I have also stripped things down, and made the shell more 'generalized'. ie: while it has some handy
functionality for tablets, it's great wihtout one too. This desktop-shell is intended to be functional,
distraction-free, and modern -- while also having a bit of eye-candy.

### Screenshots:

![n7n-AGS-Shell_1](https://github.com/nine7nine/n7n-AGS-Shell/assets/20159346/efa71ff1-8868-47ce-958d-906cc0a62630)
![n7n-AGS-Shell_2](https://github.com/nine7nine/n7n-AGS-Shell/assets/20159346/c222d9f1-c983-4d7e-b9d0-7e89df332797)
![n7n-AGS-Shell_4](https://github.com/nine7nine/n7n-AGS-Shell/assets/20159346/45af3566-d4fb-489c-ade1-b10e0fc1b347)


### Features:

- ***AppDock:*** Auto-hide. left-side position. Supports Chrome Apps. Note: WIP still needs indicators.
- ***AppLauncher:*** Refactored into an AppMenu. Sorts apps. Searchable/launch.
- ***DateMenu:*** Simplified Notificatios/DateMenu widget.
- ***Hyprspace:*** Shell Inegration via hacks/patches.
- ***Hyprlock:*** Shell Integration & Stylized.
- ***QuickSettings:*** Refactored, Colorized and Stylized.
- ***QS/Network Widget:*** Use iwgtk for settings. Fix layout bugs/issues.
- ***Streamlined/simpified widgets:*** removing redundancy and complexity where appropriate.
- ***Separation of Concerns:*** Clearly defined seperation of roles between Hyprland and AGS/The Shell.
- ***SettingsDialog:*** Remove unused settings (Rmoved Widgets && Hyprland settings, etc.).
- ***Taskbar:*** Stylized indicators. Allow soft-kill with secondary/right mouse or stylus click.
- ***ToolBox:*** Dock Widget Utilizing Hyprland controls (window managment, rotation, etc.).
- ***Workspaces:*** Dynamic. The Bar/widget allows navigation/selection (each workspace is a button).
- ***WvKBD OSK Toggle:*** My WvCtl Utility is used to send signals to WvKBD.

### Dependencies:

- Aylurs-Gtk-Shell
- Bun
- Brightnessctl
- Dart-sass
- Fd
- Hyprland and Co.
- Hyprgrass (Plugin: Multi-touch support)
  - https://github.com/horriblename/hyprgrass
  - if it fails to build, check my branch: https://github.com/nine7nine/hyprgrass
  - Sometimes, I may carry a patch or two to fix things (in the interrim).
- Hyprlock
- Hyprpaper
- Hyprpicker
- Hyprspace (Plugin: Workspace Switcher)
  - Use my fork: https://github.com/nine7nine/Hyprspace-n7n
- Gnome-related Deps
- Iwgtk
- Matugen
- Pavucontrol
- WvKBD
  - https://github.com/jjsullivan5196/wvkbd
  - My fork/keyboard layout: https://github.com/nine7nine/wvkbd-n7n (preferred)
  - wvctl utlity found in ~/sources directory

Note: I maintain a fork of Hyprspace that has patchwork to integrate Hyprspace into my Shell. You 
should be able to use hyprpm to install/use it. Instructions of installation (via hyprpm or manual
compilation) are listed in it's README.md.

Additionally, it's important to note that Hyprland sometimes introduces bugs or breaks plugins
along the way. I try to mitigate this stuff (and submit PRs when applicable). Much of that is out 
of my control. In the case where upstream breaks something: I simply rollback to a working commmit
and rebuild Hyprland, then wait for the dust to settle before rebuilding again.

Likewise, I do pickup changes from Aylur's dotfiles (where applicable). But I also won't pick up
everything (feature-wise), as there is plenty of stuff I simply do not use in my Shell, including
all of the nix stuff + a number of widgets/features.

#### Font:

- Ubuntu Nerd Font

#### Themes: (Gtk/Qt/Etc)

- Nordic
- Nordzy Cursors

#### Icons:

- Papirus (dark)

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

### More General Tips

1. You will need to audit my ~/hypr configs, as some of the paths and images are specific for my own
machine. I also manually load hyprland plugins, due to hacking on them. Where as you may just use hyprpm
to load them in a properly suppored way. So some modifications to configs are required.

2. You don't have a touchdevice? Well, you may not want the Toolbox dock. To hide/not load Toolbox in 
n7n-AGS-Shell, open .config/ags/main.ts (on your machine) and comment out this line:
```
    windows: () => [
        ...forMonitors(Bar),
        ...forMonitors(NotificationPopups),
        ...forMonitors(ScreenCorners),
        ...forMonitors(OSD),
        ...forMonitors(FloatingDock),
        //...forMonitors(ToolBoxDock), <-- here
        Applauncher(),
        PowerMenu(),
        Verification(),
        SettingsDialog(),
    ],
```

Now Toolbox won't load up on start.

3. Editing the Dock apps and other settings in the Shell. Most of this stuff can be found inside of
.config/ags/options.ts - you will have to take a look yourself, but it's all pretty straight-forward
stuff.

### Final Notes:

While I have been putting this shell together for myself -- I may be willing to accept PRs, if I see
value in the changes. Just keep in mind: I like simplicity; I've removed a number of things from Aylur's
config (media stuff, screenrecord, redundancy from multiple widgets, etc) AND I've done away with 
the Shell managing Hyprland settings && relying explicitly on things like swww.

So if you have practical improvements, bugfixes or something interesting (functionally) -- it is
possible that I may be interested in your contributions. While this shell is tablet-centric, it is
also 'general purpose' and disabling tablet specific features is as simple is commenitng out a couple
of LOC, not using Hyprgrass and removing a few settings from Hyprland.conf.

Lastly, if you want any pointers - feel free to ask.
