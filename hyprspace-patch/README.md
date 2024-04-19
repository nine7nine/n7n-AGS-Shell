# Hyprspace-Patch

I have 2 out-of-tree patches that I apply to Hyprspace to make it into a Static Workspace Switcher, that
integrates into n7n-AGS-Shell.

 - 0001-n7n-AGS-Shell-Integration_Hacks.diff

The above patch handles reworking Hyprspace to be a Static Workspace Switcher.

 - 0002-Add_Support_For_Rounded-Borders.diff

The 2nd patch add configurable support for Rounded-Borders in the Static Workspace Switcher.

NOTE: I will see if there is interest by the Hyprspace dev to have a static workspace switcher mode. If
they are interested, then I could probably implement proper support, rather than hacking it in.

### How to use?

1. Grab Hyprspace sources: https://github.com/KZDKM/Hyprspace.git
2. Cd into the source directory
3. Copy my .diff files into the folder
4. Apply the diffs
```
git am *.diff
```
5. build with:
```
make all
```
6. Make sure Hyprland.conf's setting for loading the plugin points to your .so plugin

NOTE:

If the patches don't apply, it likely means there has been a breaking change in Hyprspace. I usually
stay in-sync && keep my patches up-to-date. So you can either wait until I fix the issue, or manually 
fix the issue.
