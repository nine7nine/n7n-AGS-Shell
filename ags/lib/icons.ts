export const substitutes = {
    "transmission-gtk": "transmission",
    "blueberry.py": "blueberry",
    "Caprine": "facebook-messenger",
    "com.raggesilver.BlackBox": "terminal",
    "org.wezfurlong.wezterm": "terminal",
    "audio-headset-bluetooth": "audio-headphones",
    "audio-card-analog-usb": "audio-speakers",
    "audio-card-analog-pci": "audio-card",
    "preferences-system": "emblem-system",
    "com.github.Aylur.ags": "controls",
    "com.github.Aylur.ags": "controls",
}

export default {
    missing: "image-missing",
    fallback: {
        executable: "application-x-executable",
        notification: "dialog-information",
        video: "video-x-generic",
        audio: "audio-x-generic",
    },
    ui: {
        close: "window-close",
        colorpicker: "color-select",
        info: "info",
        link: "external-link",
        lock: "system-lock-screen",
        menu: "open-menu",
        refresh: "view-refresh",
        search: "system-search",
        settings: "emblem-system",
        themes: "preferences-desktop-theme",
        tick: "object-select",
        time: "hourglass",
        toolbars: "toolbars",
        warning: "dialog-warning",
        avatar: "avatar-default",
        arrow: {
            right: "pan-end",
            left: "pan-start",
            down: "pan-down",
            up: "pan-up",
        },
    },
    audio: {
        mic: {
            muted: "microphone-disabled",
            low: "microphone-sensitivity-low",
            medium: "microphone-sensitivity-medium",
            high: "microphone-sensitivity-high",
        },
        volume: {
            muted: "audio-volume-muted",
            low: "audio-volume-low",
            medium: "audio-volume-medium",
            high: "audio-volume-high",
            overamplified: "audio-volume-overamplified",
        },
        type: {
            headset: "audio-headphones",
            speaker: "audio-speakers",
            card: "audio-card",
        },
        mixer: "mixer",
    },
    powerprofile: {
        balanced: "power-profile-balanced",
        "power-saver": "power-profile-power-saver",
        performance: "power-profile-performance",
    },
    asusctl: {
        profile: {
            Balanced: "power-profile-balanced",
            Quiet: "power-profile-power-saver",
            Performance: "power-profile-performance",
        },
        mode: {
            Integrated: "processor",
            Hybrid: "controller",
        },
    },
    battery: {
        charging: "battery-flash",
        warning: "battery-empty",
    },
    bluetooth: {
        enabled: "bluetooth-active",
        disabled: "bluetooth-disabled",
    },
    brightness: {
        indicator: "display-brightness",
        keyboard: "keyboard-brightness",
        screen: "display-brightness",
    },
    powermenu: {
        sleep: "weather-clear-night",
        reboot: "system-reboot",
        logout: "system-log-out",
        shutdown: "system-shutdown",
    },
    recorder: {
        recording: "media-record",
    },
    notifications: {
        noisy: "org.gnome.Settings-notifications",
        silent: "notifications-disabled",
        message: "chat-bubbles",
    },
    trash: {
        full: "user-trash-full",
        empty: "user-trash",
    },
    mpris: {
        shuffle: {
            enabled: "media-playlist-shuffle",
            disabled: "media-playlist-consecutive",
        },
        loop: {
            none: "media-playlist-repeat",
            track: "media-playlist-repeat-song",
            playlist: "media-playlist-repeat",
        },
        playing: "media-playback-pause",
        paused: "media-playback-start",
        stopped: "media-playback-start",
        prev: "media-skip-backward",
        next: "media-skip-forward",
    },
    system: {
        cpu: "org.gnome.SystemMonitor",
        ram: "drive-harddisk-solidstate",
        temp: "temperature",
    },
    color: {
        dark: "dark-mode",
        light: "light-mode",
    },
}
