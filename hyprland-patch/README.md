# Hyprland-Patch

I revert 2 commits in Hyprland. (that's right: revert NOT apply!)

 - 0001-core-assert-attempted-UAFs-in-windowExists.patch

I hit a crash or two in Hyprland with this applied, so for now I revert it

 - 0001-tablet-minor-focus-fixes.patch

My Microsoft Surface 7 isn't supported by the Tablet Utility Hyprland recommends. Unfortunately, with
this commit applied; my Stylus becomes unusable. So for now, I simply revert it.

Not ideal, but hey - sometimes you need to work around issues. 
