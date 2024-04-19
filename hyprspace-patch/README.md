# Hyprland-Patch

I have 2 out-of-tree patches that I apply to Hyprspace to make it into a Static Workspace Switcher, that
integrates into n7n-AGS-Shell. 

 - 0001-n7n-AGS-Shell-Integration_Hacks.diff

The above patch handles reworking Hyprspace to be a Static Workspace Switcher.

 - 0002-Add_Support_For_Rounded-Borders.diff

The 2nd patch add confiruable support for Rounded-Borders in the Static Workspace Switcher.

NOTE: I may try to make this all confiruable and submit PRs to Hyprspace, but for now these are just 
hcks that I use to make things work.

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
