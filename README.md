# n7n-AGS-Shell / Hyprland

My own spin on Aylur's Gtk Shell + dotfiles. Aylur's AGS desktop is great, but some of it is very specific to their
own needs, thus I decided to hack away and come up with something more generalized and suitable for me...

Features:

- Menu Launcher (with Panel Button)
- Smart Launcher Dock (Tracks window class and titles)
- FocusClient Button Rework (Tracks active client & works as Close button)
- Hyprctl Kill Button (xkill-style Panel Button)
- Workspace Swticher Rework (with Panel Button)
- Simplied QS settings (Stripped Down + Fixes)
- Simplified PowerMenu Button (using Wlogout)
- Simplified DateMenu (no system-info stuff)
- Rotation Button (specific to my device, but easily adapted: look at ~/sources/hyprrotate.c)
- OSK Support via WvKBD (with Desktop Widget Integration)
- CPUPower-Gui Integration (QS Settings / cpupower-gui)
- Reworked 'Leaves Dark' default theme
- Misc other tweaks

NOTE: I've moved back to tracking Aylur's Dotfiles via git (and AGS 1.5.x). But I'm not 100% finished implementing
all of the bits that I add on top for my Shell. (eg: QS stuff is incomplete ATM; CpuPower-Gui, iwgtk + all of the
style and formatting to QS widget). WIP!

Screenshots / Current State-Of-The-Art:

![My Image](/images/ags-live.png)
![My Image](/images/ags-wvkbd.png)
![My Image](/images/ags-plain.png)
![My Image](/images/ags-busy.png)

# Dependencies
- hyprland
- [aylurs-gtk-shell](https://github.com/Aylur/ags/wiki/installation)
- sassc
- swww
- nerdfonts
- brightnessctl
- inotify-tools
- cpupower-gui (Used in QS 'CPU' Profiles)
- wlogout (used in Panel, instead of Aylur's PowerMenu)

  
## optional
- wvkbd (wlroots-based OSK) + wvctl (in /usr/bin of this repo). You probably want my fork:
  https://github.com/nine7nine/wvkbd-n7n (for a fully-featured keyboard layout)
- iwgtk (used in QS Network Settings App / Authentication)
- hyprpicker
- slurp
- wf-recorder
- wayshot
- imagemagick
- wl-gammactl
- pavucontrol
- swappy
- python
- python-pam

Note: I use almost all of the optional dependencies and I build from hyprland and co with -git packages on Archlinux.

```bash
git clone https://github.com/nine7nine/n7n-AGS-Shell.git
cp -r n7n-AGS-Shell/ags $HOME/.config/ags
cp -r n7n-AGS-Shell/hypr $HOME/.config/hypr

# then run
ags
```
NOTE: I can't really provide too much support; Hyprland, Wayland and AGS are new to me. I'm Just learning the 
ropes myself, and getting used to it all.
