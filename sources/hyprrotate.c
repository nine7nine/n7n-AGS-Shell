#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <0 for landscape, 1 for portrait>\n", argv[0]);
        return 1;
    }

    int mode = atoi(argv[1]);
    if (mode != 0 && mode != 1) {
        printf("Invalid mode. Use 0 for landscape or 1 for portrait.\n");
        return 1;
    }

    if (mode == 0) {
        system("hyprctl keyword monitor eDP-1,2736x1824,0x0,0,transform,0");
        system("hyprctl keyword device:ipts-touch:transform 0");
        system("hyprctl keyword device:ipts-stylus:transform 0");
        system("hyprctl keyword device:input-remapper-mouse:transform 0");
        system("hyprctl keyword device:microsoft-surface-type-cover-touchpad:transform 0");
        system("hyprctl keyword device:input-remapper-ipts-stylus-forwarded:transform 0");
        system("/usr/bin/input-remapper-control --command restart --device 'IPTS Touch' --command autoload");

    } else {
        system("hyprctl keyword monitor eDP-1,2736x1824,0x0,0,transform,1");
        system("hyprctl keyword device:ipts-touch:transform 1");
        system("hyprctl keyword device:ipts-stylus:transform 1");
        system("hyprctl keyword device:input-remapper-mouse:transform 1");
        system("hyprctl keyword device:microsoft-surface-type-cover-touchpad:transform 1");
        system("hyprctl keyword device:input-remapper-ipts-stylus-forwarded:transform 1");
        system("/usr/bin/input-remapper-control --command restart --device 'IPTS Touch' --command autoload");
    }

    return 0;
}
