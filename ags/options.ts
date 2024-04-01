import { type BarWidget } from "widget/bar/Bar"
import { opt, mkOptions } from "lib/option"
import { distro } from "lib/variables"
import { icon } from "lib/utils"
import icons from "lib/icons"

const options = mkOptions(OPTIONS, {
    autotheme: opt(false),

    wallpaper: opt(`/home/${USER}/.config/background`, { persistent: true }),

    theme: {
        dark: {
            primary: {
                bg: opt("#51a4e7"),
                fg: opt("#444444"),
            },
            error: {
                bg: opt("#e55f86"),
                fg: opt("#141414"),
            },
            bg: opt("#171717"),
            fg: opt("#eeeeee"),
            widget: opt("#eeeeee"),
            border: opt("#eeeeee"),
        },
        light: {
            primary: {
                bg: opt("#426ede"),
                fg: opt("#eeeeee"),
            },
            error: {
                bg: opt("#b13558"),
                fg: opt("#eeeeee"),
            },
            bg: opt("#fffffa"),
            fg: opt("#080808"),
            widget: opt("#080808"),
            border: opt("#080808"),
        },

        blur: opt(7),
        scheme: opt<"dark" | "light">("dark"),
        widget: { opacity: opt(94) },
        border: {
            width: opt(3),
            opacity: opt(94),
        },

        shadows: opt(false),
        padding: opt(5),
        spacing: opt(3),
        radius: opt(5),
    },

    transition: opt(100),

    font: {
        size: opt(13),
        name: opt("Ubuntu Nerd Font"),
    },

    bar: {
        flatButtons: opt(true),
        position: opt<"top" | "bottom">("top"),
        corners: opt(false),
        layout: {
            start: opt<BarWidget[]>([
                "launcher",
                "rotate",
                "wvctl",
                "appkill",
                "overview",
                "workspaces",
                "taskbar",
                "expander",
                "messages",
            ]),
            center: opt<BarWidget[]>([
                "date",
            ]),
            end: opt<BarWidget[]>([
                "expander",
                "systray",
                "colorpicker",
                "screenrecord",
                "battery",
                "system",
            ]),
        },
        launcher: {
            icon: {
                colored: opt(true),
                icon: opt(icon(icons.ui.arch)),
            },
            label: {
                colored: opt(false),
                label: opt(" Applications"),
            },
            action: opt(() => App.toggleWindow("applauncher")),
        },
        appkill: {
            icon: {
                colored: opt(true),
                icon: opt(icon(icons.ui.appkill)),
            },
        },
        date: {
            format: opt("%l:%M%P - %d/%m/%y"),
            action: opt(() => App.toggleWindow("datemenu")),
        },
        battery: {
            bar: opt<"hidden" | "regular" | "whole">("hidden"),
            charging: opt("#00D787"),
            percentage: opt(true),
            blocks: opt(7),
            width: opt(50),
            low: opt(30),
        },
        overview: {
            icon: {
                colored: opt(true),
                icon: opt(icon(icons.ui.overview)),
            },
            action: opt(() => App.toggleWindow("overview")),
        },
        workspaces: {
            workspaces: opt(0),
        },
        taskbar: {
            iconSize: opt(24),
            monochrome: opt(false),
            exclusive: opt(false),
        },
        messages: {
            action: opt(() => App.toggleWindow("datemenu")),
        },
        systray: {
            ignore: opt([
                "KDE Connect Indicator",
                "spotify-client",
            ]),
        },
        media: {
            monochrome: opt(false),
            preferred: opt("spotify"),
            direction: opt<"left" | "right">("right"),
            format: opt("{artists} - {title}"),
            length: opt(40),
        },
        powermenu: {
            monochrome: opt(false),
            action: opt(() => App.toggleWindow("powermenu")),
        },
        wvctl: {
            icon: {
                colored: opt(true),
                icon: opt(icon(icons.ui.wvctl)),
            },
        },
        rotate: {
            monitor: opt("eDP-1,2736x1824,0x0,0,transform"),
            icon: {
                colored: opt(true),
                icon: opt(icon(icons.ui.rotate)),
            },
        },
    },

    applauncher: {
        iconSize: opt(36),
        width: opt(0),
        margin: opt(27),
        maxItem: opt(6),
        favorites: opt([
            [
                "org.gnome.Console",
                "org.gnome.Nautilus",
                "firefox",
                "gedit",
                "org.gnome.Calendar",
            ],
        ]),
    },

    dock: {
        iconSize: opt(42),
        pinnedApps: opt([
            "org.gnome.Console",
            "org.gnome.Nautilus",
            "Firefox",
            "Gmail",
            "GitHub",
            "Libreddit",
            "LKML",
            "WhatsApp Web",
            "gnome-system-monitor",
            "gedit",
            "Meld",
            "Code",
            "Noi",
            "tm",
            "Rnote",
            "gimp-2.99",
            "obs",
            "Ardour",
            "Element_Vst2",
            "Live 11 lite",
            "Native Access",
            "pavucontrol",
            "Raysession",
            "Vmware",
            "Hardinfo",
        ]),
    },

    overview: {
        scale: opt(6),
        workspaces: opt(0),
        monochromeIcon: opt(false),
    },

    powermenu: {
        sleep: opt("systemctl suspend"),
        reboot: opt("systemctl reboot"),
        logout: opt("pkill Hyprland"),
        shutdown: opt("shutdown now"),
        layout: opt<"line" | "box">("line"),
        labels: opt(false),
    },

    quicksettings: {
        avatar: {
            image: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),
            size: opt(90),
        },
        width: opt(450),
        position: opt<"left" | "center" | "right">("right"),
        networkSettings: opt("gtk-launch iwgtk"),
        media: {
            monochromeIcon: opt(false),
            coverSize: opt(100),
        },
    },

    datemenu: {
        position: opt<"left" | "center" | "right">("center"),
    },

    osd: {
        progress: {
            vertical: opt(true),
            pack: {
                h: opt<"start" | "center" | "end">("end"),
                v: opt<"start" | "center" | "end">("center"),
            },
        },
        microphone: {
            pack: {
                h: opt<"start" | "center" | "end">("center"),
                v: opt<"start" | "center" | "end">("end"),
            },
        },
    },

    notifications: {
        position: opt<Array<"top" | "bottom" | "left" | "right">>(["top", "right"]),
        blacklist: opt(["Spotify"]),
        width: opt(440),
    },

    hyprland: {
        gaps: opt(1.8),
        inactiveBorder: opt("333333ff"),
        gapsWhenOnly: opt(true),
    },
})

globalThis["options"] = options
export default options
